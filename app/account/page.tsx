import Link from "next/link";
import { Heart, Package, Settings, UserRound } from "lucide-react";

export default function AccountPage() {
  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">User account</h1>
      <p className="mt-2 text-muted-foreground">Supabase Auth can power profile, saved addresses, wishlist, reviews, and order history.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/orders", icon: Package, title: "Orders", body: "Track payment and installation." },
          { href: "/wishlist", icon: Heart, title: "Wishlist", body: "Saved products and quote planning." },
          { href: "/shop", icon: UserRound, title: "Reviews", body: "Review purchased equipment." },
          { href: "/contact", icon: Settings, title: "Support", body: "Get warranty and service help." }
        ].map((item) => (
          <Link key={item.title} href={item.href} className="rounded-md border border-border bg-card p-5 shadow-soft hover:border-primary">
            <item.icon className="text-primary" />
            <h2 className="mt-4 text-xl font-black">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
