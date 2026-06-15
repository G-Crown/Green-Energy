"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { LinkButton, Button } from "@/components/ui/Button";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/utils";

export function CartPageClient() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const installationEstimate = items.some((item) => item.product.installationAvailable) ? 75000 : 0;
  const total = subtotal + installationEstimate;

  if (items.length === 0) {
    return (
      <section className="container-page py-14">
        <div className="rounded-md border border-border bg-card p-8 text-center shadow-soft">
          <h1 className="text-3xl font-black">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Add panels, batteries, kits, or accessories to continue.</p>
          <LinkButton className="mt-6" href="/shop">Shop products</LinkButton>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="mb-6 text-3xl font-black">Cart</h1>
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.product.id} className="grid gap-4 rounded-md border border-border bg-card p-4 shadow-soft sm:grid-cols-[120px_1fr_auto]">
              <Image src={item.product.imageUrl} alt={item.product.name} width={120} height={100} className="h-24 w-full rounded-md object-cover sm:w-30" />
              <div>
                <p className="font-bold">{item.product.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.product.description}</p>
                <p className="mt-2 font-semibold">{formatCurrency(item.product.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="px-3" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease quantity">
                  <Minus size={16} />
                </Button>
                <span className="grid h-10 w-10 place-items-center rounded-md border border-border font-bold">{item.quantity}</span>
                <Button variant="ghost" className="px-3" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase quantity">
                  <Plus size={16} />
                </Button>
                <Button variant="ghost" className="px-3 text-destructive" onClick={() => removeItem(item.product.id)} aria-label="Remove item">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="h-max rounded-md border border-border bg-card p-5 shadow-soft">
        <h2 className="text-xl font-black">Order summary</h2>
        <div className="mt-5 grid gap-3 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between"><span>Installation estimate</span><span>{formatCurrency(installationEstimate)}</span></div>
          <div className="border-t border-border pt-3 text-base font-black flex justify-between"><span>Total</span><span>{formatCurrency(total)}</span></div>
        </div>
        <LinkButton href="/checkout" className="mt-5 w-full">Continue to checkout</LinkButton>
      </aside>
    </section>
  );
}
