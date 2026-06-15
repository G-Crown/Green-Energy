"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/utils";

export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const installationRequested = items.some((item) => item.product.installationAvailable);
  const total = subtotal + (installationRequested ? 75000 : 0);

  async function submitCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: formData.get("customerName"),
        customerEmail: formData.get("customerEmail"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        installationRequested,
        items
      })
    });
    const payload = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(payload.error ?? "Checkout failed.");
      return;
    }
    if (payload.authorizationUrl?.startsWith("/checkout")) {
      clearCart();
      setMessage(`Demo checkout initialized. Reference: ${payload.reference}`);
      return;
    }
    window.location.href = payload.authorizationUrl;
  }

  if (items.length === 0) {
    return (
      <section className="container-page py-14">
        <div className="rounded-md border border-border bg-card p-8 text-center shadow-soft">
          <h1 className="text-3xl font-black">Checkout</h1>
          <p className="mt-2 text-muted-foreground">Your cart is empty.</p>
          <LinkButton className="mt-6" href="/shop">Shop products</LinkButton>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <form onSubmit={submitCheckout} className="rounded-md border border-border bg-card p-5 shadow-soft">
        <h1 className="text-3xl font-black">Checkout</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["customerName", "Full name"],
            ["customerEmail", "Email"],
            ["phone", "Phone"],
            ["address", "Delivery address"]
          ].map(([name, label]) => (
            <label key={name} className={name === "address" ? "grid gap-1 sm:col-span-2" : "grid gap-1"}>
              <span className="text-sm font-semibold">{label}</span>
              <input name={name} required className="h-11 rounded-md border border-border bg-background px-3 outline-none focus:border-primary" />
            </label>
          ))}
        </div>
        <label className="mt-5 flex items-center gap-3 rounded-md border border-border p-4">
          <input type="checkbox" checked={installationRequested} readOnly />
          <span className="text-sm">Installation estimate added for installable products.</span>
        </label>
        {message && <p className="mt-4 rounded-md bg-muted p-3 text-sm font-semibold">{message}</p>}
        <Button className="mt-6" disabled={loading} icon={loading ? <Loader2 className="animate-spin" size={18} /> : <CreditCard size={18} />}>
          Pay with Paystack
        </Button>
      </form>
      <aside className="h-max rounded-md border border-border bg-card p-5 shadow-soft">
        <h2 className="text-xl font-black">Summary</h2>
        <div className="mt-4 grid gap-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between gap-4 text-sm">
              <span>{item.quantity} x {item.product.name}</span>
              <span className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 flex justify-between text-sm">
            <span>Installation estimate</span>
            <span>{formatCurrency(installationRequested ? 75000 : 0)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between text-lg font-black">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
