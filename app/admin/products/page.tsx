import Image from "next/image";
import { AdminShell } from "@/components/AdminShell";
import { listProducts } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await listProducts();

  return (
    <AdminShell title="Product management">
      <div className="mb-5 rounded-md border border-border bg-card p-5 shadow-soft">
        <h2 className="text-xl font-black">Create or edit product</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-4">
          <input className="h-10 rounded-md border border-border bg-background px-3" placeholder="Name" />
          <input className="h-10 rounded-md border border-border bg-background px-3" placeholder="Category" />
          <input className="h-10 rounded-md border border-border bg-background px-3" placeholder="Price" />
          <input className="h-10 rounded-md border border-border bg-background px-3" placeholder="Inventory" />
          <button className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground md:col-span-4">Save product</button>
        </form>
      </div>
      <div className="overflow-hidden rounded-md border border-border bg-card shadow-soft">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Image src={product.imageUrl} alt={product.name} width={48} height={48} className="h-12 w-12 rounded-md object-cover" />
                    <span className="font-semibold">{product.name}</span>
                  </div>
                </td>
                <td className="p-3 capitalize">{product.category.replace("-", " ")}</td>
                <td className="p-3">{formatCurrency(product.price)}</td>
                <td className="p-3">{product.inventory}</td>
                <td className="p-3">
                  <span className={`rounded-md px-2 py-1 text-xs font-bold ${product.inventory <= product.lowStockThreshold ? "bg-accent text-accent-foreground" : "bg-muted"}`}>
                    {product.inventory <= product.lowStockThreshold ? "Low stock" : "In stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
