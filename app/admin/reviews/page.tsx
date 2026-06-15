import { Star } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { listReviews } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

export default async function AdminReviewsPage() {
  const reviews = await listReviews();

  return (
    <AdminShell title="Product reviews">
      <div className="grid gap-4">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-md border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-black">{review.author}</h2>
              <span className="flex items-center gap-1 text-sm font-bold"><Star className="fill-accent text-accent" size={16} /> {review.rating}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{review.body}</p>
            <p className="mt-2 text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
