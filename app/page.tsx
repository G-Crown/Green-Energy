import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { LinkButton } from "@/components/ui/Button";
import { listProducts } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, ClipboardCheck, PackageCheck, Wrench } from "lucide-react";

export default async function HomePage() {
  const products = await listProducts();
  const featured = products.filter((product) => product.featured).slice(0, 3);
  const inventoryValue = products.reduce((sum, product) => sum + product.price * product.inventory, 0);

  return (
    <>
      <Hero />
      <section className="container-page py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">Featured solar products</h2>
            <p className="mt-2 text-muted-foreground">Verified equipment ready for checkout and installation planning.</p>
          </div>
          <LinkButton href="/shop" variant="ghost">View all</LinkButton>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="bg-card py-14">
        <div className="container-page grid gap-4 md:grid-cols-4">
          {[
            { icon: PackageCheck, label: "Inventory value", value: formatCurrency(inventoryValue) },
            { icon: ClipboardCheck, label: "Tracked orders", value: "Live status" },
            { icon: Wrench, label: "Installation", value: "Booking flow" },
            { icon: BarChart3, label: "Admin analytics", value: "Built in" }
          ].map((item) => (
            <div key={item.label} className="rounded-md border border-border p-5">
              <item.icon className="text-primary" size={24} />
              <p className="mt-4 text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-xl font-black">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
