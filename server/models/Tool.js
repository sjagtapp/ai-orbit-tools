const mongoose = require('mongoose');

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    period: { type: String, default: 'month', trim: true },
    features: { type: [String], default: [] },
  },
  { _id: false }
);

const toolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    logo: { type: String, default: '' },
    description: { type: String, required: true, trim: true, maxlength: 220 },
    longDescription: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },

    categories: {
      type: [String],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },

    tags: { type: [String], default: [] },

    pricing: {
      type: {
        type: String,
        enum: ['Free', 'Freemium', 'Paid'],
        required: true,
      },
      startingPrice: { type: Number, default: 0, min: 0 },
      currency: { type: String, default: 'USD' },
    },

    features: { type: [String], default: [] },

    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    popularity: { type: Number, default: 0, min: 0 },

    pricingPlans: { type: [pricingPlanSchema], default: [] },

    platform: { type: [String], default: [] },
  },
  { timestamps: true }
);

toolSchema.index({
  name: 'text',
  companyName: 'text',
  description: 'text',
  categories: 'text',
  tags: 'text',
});

module.exports = mongoose.model('Tool', toolSchema);
