"use client";

import { Search } from "lucide-react";
import type { Product, ProductCategory } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { useMemo, useState } from "react";

const categories: Array<{ label: string; value: "all" | ProductCategory }> = [
  { label: "All", value: "all" },
  { label: "Panels", value: "solar-panels" },
  { label: "Inverters", value: "inverters" },
  { label: "Batteries", value: "batteries" },
  { label: "Kits", value: "kits" },
  { label: "Accessories", value: "accessories" }
];

export function ProductFilters({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ProductCategory>("all");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery = `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, products, query]);

  return (
    <div>
      <div className="mb-6 grid gap-3 rounded-md border border-border bg-card p-4 shadow-soft lg:grid-cols-[1fr_auto]">
        <label className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-3 outline-none focus:border-primary"
            placeholder="Search panels, batteries, kits..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.value}
              className={`rounded-md border px-3 py-2 text-sm font-semibold ${category === item.value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"}`}
              onClick={() => setCategory(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
