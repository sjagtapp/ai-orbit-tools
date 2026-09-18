import { useState } from 'react';
import { Star } from 'lucide-react';
import { submitReview } from '../services/api';

export default function ReviewForm({ toolId, onSubmitted, onCancel }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('Demo User');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next = {};
    if (!rating) next.rating = 'Please select a rating';
    if (!comment.trim() || comment.trim().length < 10) {
      next.comment = 'Review must be at least 10 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const data = await submitReview(toolId, { userName: userName || 'Demo User', rating, comment: comment.trim() });
      onSubmitted(data.review);
    } catch (err) {
      setErrors({ form: err.response?.data?.message || 'Could not submit review. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-4">
        <label htmlFor="review-rating" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Rating
        </label>
        <div id="review-rating" className="flex items-center gap-1" role="radiogroup" aria-label="Select a rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating === star}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="p-0.5"
            >
              <Star
                size={24}
                className={
                  (hoverRating || rating) >= star ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                }
              />
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-1 text-xs text-red-400">{errors.rating}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="review-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Your name
        </label>
        <input
          id="review-name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          maxLength={60}
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-white/25"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="review-comment" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={4}
          maxLength={1000}
          className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-white/25"
        />
        {errors.comment && <p className="mt-1 text-xs text-red-400">{errors.comment}</p>}
      </div>

      {errors.form && <p className="mb-3 text-xs text-red-400">{errors.form}</p>}

      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-zinc-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-lg bg-white py-2.5 text-sm font-semibold text-black transition-opacity disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}
