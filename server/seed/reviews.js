// Generates original dummy reviews for each seeded tool.

const NAMES = [
  'Rahul S.', 'Emma T.', 'Wei L.', 'Sofia G.', 'James O.', 'Priya K.', 'Lucas M.',
  'Aiko N.', 'Daniel R.', 'Fatima A.', 'Noah P.', 'Isabella C.', 'Mateus F.', 'Chloe B.',
  'Omar H.', 'Grace W.', 'Liam D.', 'Nadia Y.', 'Ethan V.', 'Zara I.',
];

const COMMENTS = [
  'Excellent tool for research and coding, has become part of my daily workflow.',
  'Solid product overall. The learning curve is a bit steep but worth it.',
  'Great value for the price. Support team responded quickly when I had questions.',
  'Does exactly what it promises. Would recommend to my team.',
  'Impressive results, though I wish the free tier had a bit more headroom.',
  'Switched from a competitor and have not looked back since.',
  'Reliable and fast. The interface could use some polish, but functionality is strong.',
  'One of the better tools in this category. Onboarding was smooth.',
  'Really helped speed up my workflow, saved several hours a week.',
  'Good tool but the pricing tiers feel a little confusing at first.',
  'The output quality keeps improving with every update.',
  'Not perfect, but the core feature set covers most of what I need.',
];

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function buildReviews(tools) {
  const reviews = [];
  tools.forEach((tool, toolIdx) => {
    const rand = seededRandom(toolIdx + 7);
    const count = Math.max(2, Math.round(rand() * 5));
    for (let i = 0; i < count; i += 1) {
      const daysAgo = Math.floor(rand() * 90) + 1;
      reviews.push({
        toolSlug: tool.slug,
        userName: NAMES[Math.floor(rand() * NAMES.length)],
        rating: Math.max(3, Math.min(5, Math.round(tool.rating + (rand() - 0.5)))),
        comment: COMMENTS[Math.floor(rand() * COMMENTS.length)],
        createdAt: new Date(Date.now() - daysAgo * 1000 * 60 * 60 * 24),
      });
    }
  });
  return reviews;
}

module.exports = buildReviews;
