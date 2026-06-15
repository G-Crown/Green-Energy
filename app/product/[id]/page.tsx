import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarCheck, Star, Truck, Wrench } from "lucide-react";
import { AddToCartPanel } from "@/components/AddToCartPanel";
import { LinkButton } from "@/components/ui/Button";
import { listProducts, listReviews } from "@/lib/supabase";
import { formatCurrency, formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((product) => ({ id: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await listProducts();
  const product = products.find((item) => item.slug === id || item.id === id);
  if (!product) notFound();
  const reviews = await listReviews(product.id);

  return (
    <section className="container-page py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted shadow-soft">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" priority />
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">{product.category.replace("-", " ")}</p>
          <h1 className="text-4xl font-black">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
            <Star size={18} className="fill-accent text-accent" /> {product.rating} ({product.reviewCount} reviews)
          </div>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">
            <p className="text-3xl font-black">{formatCurrency(product.price)}</p>
            {product.compareAtPrice && <p className="text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</p>}
          </div>
          <div className="my-6 grid gap-3 rounded-md border border-border bg-card p-4 text-sm sm:grid-cols-3">
            <span className="flex items-center gap-2"><Truck size={18} /> Dispatch ready</span>
            <span className="flex items-center gap-2"><Wrench size={18} /> {product.installationAvailable ? "Installable" : "DIY item"}</span>
            <span className="flex items-center gap-2"><CalendarCheck size={18} /> Stock: {product.inventory}</span>
          </div>
          <AddToCartPanel product={product} />
          {product.installationAvailable && (
            <LinkButton className="mt-3 w-full" href="/consultation" variant="secondary">
              Add installation service
            </LinkButton>
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1fr]">
        <div className="rounded-md border border-border bg-card p-5 shadow-soft">
          <h2 className="text-xl font-black">Specifications</h2>
          <dl className="mt-4 grid gap-3">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-4 border-b border-border pb-2 text-sm">
                <dt className="text-muted-foreground">{key}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-md border border-border bg-card p-5 shadow-soft">
          <h2 className="text-xl font-black">Reviews</h2>
          <div className="mt-4 grid gap-4">
            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.author}</p>
                    <span className="flex items-center gap-1 text-sm"><Star size={15} className="fill-accent text-accent" /> {review.rating}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.body}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
