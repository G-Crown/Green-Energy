"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/35" onClick={onClose} aria-label="Close cart" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-lg font-bold">Cart</h2>
          <Button variant="ghost" className="px-3" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-5">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.product.id} className="grid grid-cols-[72px_1fr] gap-3 rounded-md border border-border p-3">
                  <Image src={item.product.imageUrl} alt={item.product.name} width={72} height={72} className="h-18 w-18 rounded-md object-cover" />
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.product.price)}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <input
                        aria-label={`Quantity for ${item.product.name}`}
                        className="h-9 w-16 rounded-md border border-border px-2"
                        min={1}
                        type="number"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.product.id, Number(event.target.value))}
                      />
                      <button className="text-sm font-semibold text-destructive" onClick={() => removeItem(item.product.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-border p-5">
          <div className="mb-4 flex items-center justify-between font-bold">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <LinkButton href="/cart" variant="ghost" onClick={onClose}>
              View cart
            </LinkButton>
            <LinkButton href="/checkout" onClick={onClose}>
              Checkout
            </LinkButton>
          </div>
        </div>
      </aside>
    </div>
  );
}
