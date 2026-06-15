export type ProductCategory = "solar-panels" | "inverters" | "batteries" | "kits" | "accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  inventory: number;
  lowStockThreshold: number;
  imageUrl: string;
  specs: Record<string, string>;
  installationAvailable: boolean;
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = "pending" | "paid" | "processing" | "scheduled" | "installed" | "cancelled";

export type Order = {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  installationDate?: string;
  items: Array<{ productId: string; name: string; quantity: number; price: number }>;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
};

export type InstallationBooking = {
  id: string;
  customerName: string;
  customerEmail: string;
  address: string;
  preferredDate: string;
  systemSize: string;
  notes?: string;
  status: "requested" | "quoted" | "scheduled" | "completed";
};
