require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Tool = require('../models/Tool');
const Review = require('../models/Review');
const toolsData = require('./tools');
const buildReviews = require('./reviews');

async function seed() {
  await connectDB();

  console.log('[seed] Clearing existing tools and reviews...');
  await Tool.deleteMany({});
  await Review.deleteMany({});

  console.log(`[seed] Inserting ${toolsData.length} tools...`);
  const insertedTools = await Tool.insertMany(toolsData);

  const slugToId = new Map(insertedTools.map((t) => [t.slug, t._id]));
  const reviewsData = buildReviews(toolsData).map((r) => ({
    toolId: slugToId.get(r.toolSlug),
    userName: r.userName,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt,
  }));

  console.log(`[seed] Inserting ${reviewsData.length} reviews...`);
  await Review.insertMany(reviewsData);

  // Recompute rating/reviewCount from actual seeded reviews for consistency
  for (const tool of insertedTools) {
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
  }

  console.log('[seed] Done.');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
