const mongoose = require('mongoose');
const Review = require('../models/Review');
const Tool = require('../models/Tool');

// GET /api/tools/:id/reviews
async function getReviews(req, res, next) {
  try {
    const { id } = req.params;
    const tool = await resolveTool(id);
    if (!tool) {
      return res.status(404).json({ success: false, message: 'Tool not found' });
    }

    const reviews = await Review.find({ toolId: tool._id }).sort({ createdAt: -1 }).lean();

    res.status(200).json({ success: true, reviews, count: reviews.length });
  } catch (err) {
    next(err);
  }
}

// POST /api/tools/:id/reviews
async function createReview(req, res, next) {
  try {
    const { id } = req.params;
    const { userName, rating, comment } = req.body;

    const tool = await resolveTool(id);
    if (!tool) {
      return res.status(404).json({ success: false, message: 'Tool not found' });
    }

    if (!userName || !userName.trim()) {
      return res.status(400).json({ success: false, message: 'userName is required' });
    }
    if (!rating || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ success: false, message: 'rating must be between 1 and 5' });
    }
    if (!comment || comment.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'comment must be at least 10 characters' });
    }

    const review = await Review.create({
      toolId: tool._id,
      userName: userName.trim(),
      rating: Number(rating),
      comment: comment.trim(),
    });

    const stats = await Review.aggregate([
      { $match: { toolId: tool._id } },
      { $group: { _id: '$toolId', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);

    if (stats.length > 0) {
      await Tool.findByIdAndUpdate(tool._id, {
        rating: Math.round(stats[0].avgRating * 10) / 10,
        reviewCount: stats[0].count,
      });
    }

    res.status(201).json({ success: true, review });
  } catch (err) {
    next(err);
  }
}

async function resolveTool(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const byId = await Tool.findById(id);
    if (byId) return byId;
  }
  return Tool.findOne({ slug: id.toLowerCase() });
}

module.exports = { getReviews, createReview };
