const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    toolId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tool', required: true, index: true },
    userName: { type: String, required: true, trim: true, maxlength: 60 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, minlength: 10, maxlength: 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
