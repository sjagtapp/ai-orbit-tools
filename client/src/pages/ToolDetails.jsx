import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Heart } from 'lucide-react';
import ToolLogo from '../components/ToolLogo';
import Rating from '../components/Rating';
import PricingBadge from '../components/PricingBadge';
import CategoryBadge from '../components/CategoryBadge';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import RelatedTools from '../components/RelatedTools';
import ErrorState from '../components/ErrorState';
import NotFound from './NotFound';
import useFavorites from '../hooks/useFavorites';
import { useToast } from '../context/ToastContext.jsx';
import { fetchToolBySlug, fetchReviews } from '../services/api';
import { formatPrice, formatCount } from '../utils/formatters';

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-4 w-32 rounded bg-white/[0.06]" />
      <div className="mt-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-white/[0.06]" />
        <div className="space-y-2">
          <div className="h-5 w-40 rounded bg-white/[0.06]" />
          <div className="h-3 w-24 rounded bg-white/[0.05]" />
        </div>
      </div>
      <div className="mt-6 h-4 w-3/4 rounded bg-white/[0.05]" />
      <div className="mt-8 h-48 rounded-2xl bg-white/[0.03]" />
    </div>
  );
}

export default function ToolDetails() {
  const { slug } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const [tool, setTool] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | success | error | notfound
  const [reviews, setReviews] = useState([]);
  const [reviewsStatus, setReviewsStatus] = useState('loading');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setTool(null);

    fetchToolBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setTool(data.tool);
        setStatus('success');
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.response?.status === 404) {
          setStatus('notfound');
        } else {
          setStatus('error');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (status !== 'success' || !tool) return undefined;
    let cancelled = false;
    setReviewsStatus('loading');

    fetchReviews(tool._id)
      .then((data) => {
        if (cancelled) return;
        setReviews(data.reviews || []);
        setReviewsStatus('success');
      })
      .catch(() => {
        if (!cancelled) setReviewsStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [status, tool]);

  if (status === 'loading') return <DetailSkeleton />;
  if (status === 'notfound') return <NotFound />;
  if (status === 'error' || !tool) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <ErrorState message="We couldn't load this tool." onAction={() => window.location.reload()} />
      </div>
    );
  }

  const favorited = isFavorite(tool.slug);

  function handleFavorite() {
    toggleFavorite(tool);
    showToast(favorited ? 'Tool removed from saved tools' : 'Tool saved');
  }

  function handleReviewSubmitted(review) {
    setReviews((prev) => [review, ...prev]);
    setShowReviewForm(false);
    showToast('Review submitted');
  }

  const avgBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const maxCount = Math.max(1, ...avgBreakdown.map((b) => b.count));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft size={15} aria-hidden="true" />
        Back to AI Tools
      </Link>

      {/* Header */}
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <ToolLogo name={tool.name} logo={tool.logo} size={64} />
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">{tool.name}</h1>
            <p className="text-sm text-zinc-500">{tool.companyName}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <Rating value={tool.rating} />
              <span className="text-zinc-500">{formatCount(tool.reviewCount)} reviews</span>
              <PricingBadge type={tool.pricing?.type} />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-3">
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Visit Website
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={handleFavorite}
            aria-pressed={favorited}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white hover:border-white/25"
          >
            <Heart size={15} className={favorited ? 'fill-rose-500 text-rose-500' : ''} aria-hidden="true" />
            Save
          </button>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-zinc-400">{tool.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tool.categories.map((c) => (
          <CategoryBadge key={c} label={c} />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {/* Overview */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Overview</h2>
            <p className="text-sm leading-relaxed text-zinc-400">{tool.longDescription}</p>
          </section>

          {/* Features */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Features</h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {tool.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="text-emerald-400" aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Pricing</h2>
            <p className="mb-3 text-xs text-zinc-500">Demo pricing for illustration purposes only.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {tool.pricingPlans.map((plan) => (
                <div key={plan.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-sm font-semibold text-white">{plan.name}</p>
                  <p className="mt-1 text-xl font-bold text-white">
                    {formatPrice(plan.price)}
                    {plan.price > 0 && <span className="text-xs font-normal text-zinc-500">/{plan.period}</span>}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="text-xs text-zinc-400">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Reviews</h2>
              {!showReviewForm && (
                <button
                  type="button"
                  onClick={() => setShowReviewForm(true)}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white hover:border-white/25"
                >
                  Write a review
                </button>
              )}
            </div>

            <div className="mb-6 flex flex-col gap-6 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center">
              <div className="text-center sm:border-r sm:border-white/10 sm:pr-6">
                <p className="text-3xl font-bold text-white">{tool.rating.toFixed(1)}</p>
                <Rating value={tool.rating} showValue={false} />
                <p className="mt-1 text-xs text-zinc-500">{formatCount(tool.reviewCount)} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {avgBreakdown.map((b) => (
                  <div key={b.star} className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="w-3">{b.star}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${(b.count / maxCount) * 100}%` }}
                      />
                    </div>
                    <span className="w-6 text-right">{b.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {showReviewForm && (
              <div className="mb-6">
                <ReviewForm
                  toolId={tool._id}
                  onSubmitted={handleReviewSubmitted}
                  onCancel={() => setShowReviewForm(false)}
                />
              </div>
            )}

            {reviewsStatus === 'loading' && (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="h-20 animate-pulse rounded-xl border border-white/10 bg-white/[0.02]" />
                ))}
              </div>
            )}

            {reviewsStatus === 'success' && reviews.length === 0 && (
              <p className="text-sm text-zinc-500">No reviews yet. Be the first to share your experience.</p>
            )}

            {reviewsStatus === 'success' && reviews.length > 0 && (
              <div className="space-y-3">
                {reviews.map((r) => (
                  <ReviewCard key={r._id} review={r} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Info panel */}
        <aside>
          <div className="sticky top-24 rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Tool information</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Website</dt>
                <dd className="truncate text-right text-zinc-300">
                  <a href={tool.website} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {tool.website.replace(/^https?:\/\//, '')}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Company</dt>
                <dd className="text-zinc-300">{tool.companyName}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Pricing model</dt>
                <dd className="text-zinc-300">{tool.pricing?.type}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Rating</dt>
                <dd className="text-zinc-300">{tool.rating.toFixed(1)} / 5</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-zinc-500">Date added</dt>
                <dd className="text-zinc-300">
                  {new Date(tool.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </dd>
              </div>
              {tool.platform?.length > 0 && (
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-500">Platform</dt>
                  <dd className="text-right text-zinc-300">{tool.platform.join(', ')}</dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>

      {/* Related tools */}
      <section className="mt-14">
        <h2 className="mb-4 text-lg font-semibold text-white">You might also like</h2>
        <RelatedTools slug={tool.slug} />
      </section>
    </div>
  );
}
