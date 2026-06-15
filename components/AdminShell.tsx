import Link from "next/link";
import { BarChart3, ClipboardList, Package, ShoppingBag, Wrench } from "lucide-react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/installations", label: "Installations", icon: Wrench },
  { href: "/admin/reviews", label: "Reviews", icon: ClipboardList }
];

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="container-page py-10">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-max rounded-md border border-border bg-card p-3 shadow-soft">
          <p className="px-3 py-2 text-sm font-black uppercase text-muted-foreground">Admin</p>
          <nav className="grid gap-1">
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">
                <link.icon size={17} /> {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>
          <h1 className="mb-6 text-4xl font-black">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
