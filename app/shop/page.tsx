import { ProductFilters } from "@/components/ProductFilters";
import { listProducts } from "@/lib/supabase";

export default async function ShopPage() {
  const products = await listProducts();

  return (
    <section className="container-page py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Shop solar products</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Compare panels, inverters, batteries, accessories, and complete kits with inventory-aware purchasing.
        </p>
      </div>
      <ProductFilters products={products} />
    </section>
  );
}
