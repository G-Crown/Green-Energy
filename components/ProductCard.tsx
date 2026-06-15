"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/CartProvider";
import { cn, formatCurrency } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, toggleWishlist, wishlist } = useCart();
  const liked = wishlist.includes(product.id);

  return (
    <article className="grid overflow-hidden rounded-md border border-border bg-card shadow-soft">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition-transform hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
        {product.inventory <= product.lowStockThreshold && (
          <span className="absolute left-3 top-3 rounded-md bg-accent px-2 py-1 text-xs font-bold">Low stock</span>
        )}
      </Link>
      <div className="grid gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${product.slug}`} className="font-bold hover:text-primary">
              {product.name}
            </Link>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          </div>
          <button
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className={cn("rounded-md border border-border p-2 hover:bg-muted", liked && "bg-muted text-destructive")}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-black">{formatCurrency(product.price)}</p>
            {product.compareAtPrice && <p className="text-sm text-muted-foreground line-through">{formatCurrency(product.compareAtPrice)}</p>}
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold">
            <Star size={16} className="fill-accent text-accent" /> {product.rating}
          </span>
        </div>
        <Button icon={<ShoppingCart size={18} />} onClick={() => addItem(product)}>
          Add to cart
        </Button>
      </div>
    </article>
  );
}
