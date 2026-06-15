"use client";

import Link from "next/link";
import { BarChart3, Heart, Menu, ShoppingCart, SunMedium, UserRound } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/consultation", label: "Installation" },
  { href: "/orders", label: "Orders" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const { itemCount, wishlist } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <SunMedium size={20} />
          </span>
          <span>Greener Energy</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/wishlist" className="relative rounded-md border border-border bg-card p-2 hover:bg-muted" aria-label="Wishlist">
            <Heart size={18} />
            {wishlist.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-xs font-bold">{wishlist.length}</span>}
          </Link>
          <Link href="/account" className="hidden rounded-md border border-border bg-card p-2 hover:bg-muted sm:inline-flex" aria-label="Account">
            <UserRound size={18} />
          </Link>
          <Link href="/admin/dashboard" className="hidden rounded-md border border-border bg-card p-2 hover:bg-muted sm:inline-flex" aria-label="Admin dashboard">
            <BarChart3 size={18} />
          </Link>
          <Button variant="ghost" icon={<ShoppingCart size={18} />} onClick={() => setDrawerOpen(true)}>
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">{itemCount}</span>}
          </Button>
          <Button variant="ghost" className="px-3 lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Open menu">
            <Menu size={18} />
          </Button>
        </div>
      </div>

      <div className={cn("container-page grid gap-1 pb-3 lg:hidden", menuOpen ? "block" : "hidden")}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
            {link.label}
          </Link>
        ))}
        <Link href="/admin/dashboard" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
          Admin
        </Link>
      </div>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
