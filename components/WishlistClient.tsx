"use client";

import { ProductCard } from "@/components/ProductCard";
import { LinkButton } from "@/components/ui/Button";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/types/product";

export function WishlistClient({ products }: { products: Product[] }) {
  const { wishlist } = useCart();
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">Wishlist</h1>
      <p className="mt-2 text-muted-foreground">Saved products for quotes, comparison, or later checkout.</p>
      {saved.length === 0 ? (
        <div className="mt-8 rounded-md border border-border bg-card p-8 text-center shadow-soft">
          <p className="text-muted-foreground">No saved products yet.</p>
          <LinkButton href="/shop" className="mt-5">Browse products</LinkButton>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  );
}
