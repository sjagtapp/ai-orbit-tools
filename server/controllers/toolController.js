const Tool = require('../models/Tool');

const ALLOWED_SORTS = {
  popular: { popularity: -1 },
  rating: { rating: -1 },
  newest: { createdAt: -1 },
  'az': { name: 1 },
  'za': { name: -1 },
};

// GET /api/tools
async function getTools(req, res, next) {
  try {
    const {
      q = '',
      category = '',
      pricing = '',
      minRating = '',
      sort = 'popular',
      page = '1',
      limit = '12',
    } = req.query;

    const filter = {};

    if (q && q.trim()) {
      const regex = new RegExp(q.trim().split(/\s+/).map(escapeRegex).join('|'), 'i');
      filter.$or = [
        { name: regex },
        { companyName: regex },
        { description: regex },
        { categories: regex },
        { tags: regex },
      ];
    }

    if (category && category !== 'All') {
      filter.categories = category;
    }

    if (pricing) {
      filter['pricing.type'] = pricing;
    }

    if (minRating) {
      const parsed = parseFloat(minRating);
      if (!Number.isNaN(parsed)) {
        filter.rating = { $gte: parsed };
      }
    }

    const sortBy = ALLOWED_SORTS[sort] || ALLOWED_SORTS.popular;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);
    const skip = (pageNum - 1) * limitNum;

    const [tools, total] = await Promise.all([
      Tool.find(filter).sort(sortBy).skip(skip).limit(limitNum).lean(),
      Tool.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      tools,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.max(Math.ceil(total / limitNum), 1),
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/tools/:slug
async function getToolBySlug(req, res, next) {
  try {
    const tool = await Tool.findOne({ slug: req.params.slug.toLowerCase() }).lean();
    if (!tool) {
      return res.status(404).json({ success: false, message: 'Tool not found' });
    }
    res.status(200).json({ success: true, tool });
  } catch (err) {
    next(err);
  }
}

// GET /api/categories
async function getCategories(req, res, next) {
  try {
    const categories = await Tool.distinct('categories');
    res.status(200).json({ success: true, categories: categories.sort() });
  } catch (err) {
    next(err);
  }
}

// GET /api/tools/related/:slug
async function getRelatedTools(req, res, next) {
  try {
    const tool = await Tool.findOne({ slug: req.params.slug.toLowerCase() }).lean();
    if (!tool) {
      return res.status(404).json({ success: false, message: 'Tool not found' });
    }

    const related = await Tool.find({
      slug: { $ne: tool.slug },
      categories: { $in: tool.categories },
    })
      .sort({ rating: -1 })
      .limit(4)
      .lean();

    res.status(200).json({ success: true, tools: related });
  } catch (err) {
    next(err);
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { getTools, getToolBySlug, getCategories, getRelatedTools };
