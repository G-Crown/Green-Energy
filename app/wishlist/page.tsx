import { WishlistClient } from "@/components/WishlistClient";
import { listProducts } from "@/lib/supabase";

export default async function WishlistPage() {
  const products = await listProducts();
  return <WishlistClient products={products} />;
}
