import { createClient } from "@supabase/supabase-js";
import { products, orders, reviews, bookings } from "@/lib/data";
import type { InstallationBooking, Order, Product, Review } from "@/types/product";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

export async function listProducts(): Promise<Product[]> {
  if (!supabase) return products;
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error || !data) return products;
  return data.map(mapProduct);
}

export async function listOrders(): Promise<Order[]> {
  if (!supabaseAdmin) return orders;
  const { data, error } = await supabaseAdmin.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
  if (error || !data) return orders;
  return data.map((order) => ({
    id: order.id,
    reference: order.reference,
    customerName: order.customer_name,
    customerEmail: order.customer_email,
    total: order.total,
    status: order.status,
    createdAt: order.created_at,
    installationDate: order.installation_date ?? undefined,
    items: (order.order_items ?? []).map((item: Record<string, string | number>) => ({
      productId: String(item.product_id),
      name: String(item.name),
      quantity: Number(item.quantity),
      price: Number(item.price)
    }))
  }));
}

export async function listReviews(productId?: string): Promise<Review[]> {
  if (!supabase) return productId ? reviews.filter((review) => review.productId === productId) : reviews;
  let query = supabase.from("reviews").select("*").order("created_at", { ascending: false });
  if (productId) query = query.eq("product_id", productId);
  const { data, error } = await query;
  if (error || !data) return reviews;
  return data.map((review) => ({
    id: review.id,
    productId: review.product_id,
    author: review.author,
    rating: review.rating,
    body: review.body,
    createdAt: review.created_at
  }));
}

export async function listBookings(): Promise<InstallationBooking[]> {
  if (!supabaseAdmin) return bookings;
  const { data, error } = await supabaseAdmin.from("installation_bookings").select("*").order("created_at", { ascending: false });
  if (error || !data) return bookings;
  return data.map((booking) => ({
    id: booking.id,
    customerName: booking.customer_name,
    customerEmail: booking.customer_email,
    address: booking.address,
    preferredDate: booking.preferred_date,
    systemSize: booking.system_size,
    notes: booking.notes ?? undefined,
    status: booking.status
  }));
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    description: String(row.description),
    category: row.category as Product["category"],
    price: Number(row.price),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : undefined,
    rating: Number(row.rating ?? 0),
    reviewCount: Number(row.review_count ?? 0),
    inventory: Number(row.inventory ?? 0),
    lowStockThreshold: Number(row.low_stock_threshold ?? 5),
    imageUrl: String(row.image_url),
    specs: (row.specs ?? {}) as Record<string, string>,
    installationAvailable: Boolean(row.installation_available),
    featured: Boolean(row.featured)
  };
}
