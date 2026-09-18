const express = require('express');
const { getTools, getToolBySlug, getCategories, getRelatedTools } = require('../controllers/toolController');

const router = express.Router();

// Order matters: specific static/param routes before the generic /:slug catch-all
router.get('/tools', getTools);
router.get('/tools/related/:slug', getRelatedTools);
router.get('/categories', getCategories);
router.get('/tools/:slug', getToolBySlug);

module.exports = router;
