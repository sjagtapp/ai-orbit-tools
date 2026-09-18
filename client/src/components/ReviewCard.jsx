import Rating from './Rating';
import { formatRelativeDate } from '../utils/formatters';

export default function ReviewCard({ review }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{review.userName}</span>
        <span className="text-xs text-zinc-500">{formatRelativeDate(review.createdAt)}</span>
      </div>
      <div className="mt-1.5">
        <Rating value={review.rating} />
      </div>
      <p className="mt-2 text-sm text-zinc-400">{review.comment}</p>
    </div>
  );
}
