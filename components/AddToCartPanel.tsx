"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/CartProvider";

export function AddToCartPanel({ product }: { product: Product }) {
  const { addItem, toggleWishlist, wishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const liked = wishlist.includes(product.id);

  return (
    <div className="grid gap-3">
      <label className="grid gap-1 text-sm font-semibold">
        Quantity
        <input
          className="h-11 w-28 rounded-md border border-border px-3"
          min={1}
          max={product.inventory}
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <Button icon={<ShoppingCart size={18} />} onClick={() => addItem(product, quantity)}>
          Add to cart
        </Button>
        <Button variant="ghost" icon={<Heart size={18} fill={liked ? "currentColor" : "none"} />} onClick={() => toggleWishlist(product.id)}>
          Wishlist
        </Button>
      </div>
    </div>
  );
}
