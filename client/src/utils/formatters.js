export function formatCount(num) {
  if (num == null) return '0';
  if (num >= 1000) {
    return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}k`;
  }
  return String(num);
}

export function formatPrice(price, currency = 'USD') {
  if (!price || price === 0) return 'Free';
  const symbol = currency === 'USD' ? '$' : currency;
  return `${symbol}${price}`;
}

export function formatRelativeDate(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

export const CATEGORY_OPTIONS = [
  'All',
  'Writing',
  'Image Generation',
  'Video',
  'Coding',
  'Research',
  'Productivity',
  'Marketing',
  'Audio',
  'Design',
  'Business',
  'Education',
];

export const PRICING_OPTIONS = ['Free', 'Freemium', 'Paid'];

export const RATING_OPTIONS = [
  { label: '4+ stars', value: '4' },
  { label: '4.5+ stars', value: '4.5' },
];

export const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Newest', value: 'newest' },
  { label: 'A → Z', value: 'az' },
  { label: 'Z → A', value: 'za' },
];
