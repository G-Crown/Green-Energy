import type { InstallationBooking, Order, Product, Review } from "@/types/product";

export const products: Product[] = [
  {
    id: "prd-sunmax-550",
    slug: "sunmax-mono-550w-panel",
    name: "SunMax Mono 550W Solar Panel",
    description: "High-output monocrystalline panel for residential rooftops and commercial arrays.",
    category: "solar-panels",
    price: 185000,
    compareAtPrice: 215000,
    rating: 4.8,
    reviewCount: 128,
    inventory: 64,
    lowStockThreshold: 12,
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    installationAvailable: true,
    featured: true,
    specs: {
      Output: "550W",
      Efficiency: "21.3%",
      Warranty: "25 years",
      Dimensions: "2278 x 1134 mm"
    }
  },
  {
    id: "prd-hybrid-5kva",
    slug: "voltbridge-5kva-hybrid-inverter",
    name: "VoltBridge 5kVA Hybrid Inverter",
    description: "Smart hybrid inverter with MPPT charging, grid backup, and mobile monitoring.",
    category: "inverters",
    price: 890000,
    rating: 4.7,
    reviewCount: 83,
    inventory: 18,
    lowStockThreshold: 6,
    imageUrl: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=1200&q=80",
    installationAvailable: true,
    featured: true,
    specs: {
      Capacity: "5kVA",
      Battery: "48V",
      MPPT: "120A",
      Monitoring: "Wi-Fi app"
    }
  },
  {
    id: "prd-lithium-10kwh",
    slug: "greenbank-10kwh-lithium-battery",
    name: "GreenBank 10kWh Lithium Battery",
    description: "Wall-mounted LiFePO4 battery with long cycle life and integrated BMS protection.",
    category: "batteries",
    price: 2450000,
    rating: 4.9,
    reviewCount: 57,
    inventory: 9,
    lowStockThreshold: 5,
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba13938c6?auto=format&fit=crop&w=1200&q=80",
    installationAvailable: true,
    featured: true,
    specs: {
      Capacity: "10kWh",
      Chemistry: "LiFePO4",
      Cycles: "6000+",
      Warranty: "10 years"
    }
  },
  {
    id: "prd-home-kit",
    slug: "essential-home-solar-kit",
    name: "Essential Home Solar Kit",
    description: "Complete package for lights, fans, TV, router, and small appliances.",
    category: "kits",
    price: 1750000,
    compareAtPrice: 1925000,
    rating: 4.6,
    reviewCount: 44,
    inventory: 14,
    lowStockThreshold: 4,
    imageUrl: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1200&q=80",
    installationAvailable: true,
    specs: {
      Panels: "4 x 550W",
      Inverter: "3.5kVA",
      Battery: "5kWh",
      Coverage: "Small household"
    }
  },
  {
    id: "prd-mounting-kit",
    slug: "aluminium-roof-mounting-kit",
    name: "Aluminium Roof Mounting Kit",
    description: "Corrosion-resistant rails, clamps, and fasteners for pitched roof installations.",
    category: "accessories",
    price: 135000,
    rating: 4.5,
    reviewCount: 31,
    inventory: 122,
    lowStockThreshold: 20,
    imageUrl: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80",
    installationAvailable: false,
    specs: {
      Material: "Aluminium",
      Coverage: "4 panels",
      Roof: "Pitched",
      Warranty: "5 years"
    }
  },
  {
    id: "prd-energy-meter",
    slug: "smart-energy-monitor",
    name: "Smart Energy Monitor",
    description: "Real-time household load tracking with alerts for abnormal power use.",
    category: "accessories",
    price: 98000,
    rating: 4.4,
    reviewCount: 19,
    inventory: 37,
    lowStockThreshold: 10,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    installationAvailable: true,
    specs: {
      Connectivity: "Wi-Fi",
      App: "iOS / Android",
      Voltage: "220-240V",
      Alerts: "Push + email"
    }
  }
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    productId: "prd-sunmax-550",
    author: "Adaeze N.",
    rating: 5,
    body: "Output has been steady even on cloudy afternoons, and the installation team was tidy.",
    createdAt: "2026-05-22T10:30:00Z"
  },
  {
    id: "rev-2",
    productId: "prd-hybrid-5kva",
    author: "Tunde A.",
    rating: 4,
    body: "The mobile monitoring is useful. I would like a clearer paper manual, but support helped quickly.",
    createdAt: "2026-05-28T13:00:00Z"
  }
];

export const orders: Order[] = [
  {
    id: "ord-1001",
    reference: "GE-202606-1001",
    customerName: "Mariam Okoro",
    customerEmail: "mariam@example.com",
    total: 3530000,
    status: "scheduled",
    createdAt: "2026-06-11T09:20:00Z",
    installationDate: "2026-06-20",
    items: [
      { productId: "prd-home-kit", name: "Essential Home Solar Kit", quantity: 2, price: 1750000 },
      { productId: "prd-energy-meter", name: "Smart Energy Monitor", quantity: 1, price: 98000 }
    ]
  },
  {
    id: "ord-1002",
    reference: "GE-202606-1002",
    customerName: "Ibrahim Bello",
    customerEmail: "ibrahim@example.com",
    total: 890000,
    status: "processing",
    createdAt: "2026-06-13T15:42:00Z",
    items: [{ productId: "prd-hybrid-5kva", name: "VoltBridge 5kVA Hybrid Inverter", quantity: 1, price: 890000 }]
  }
];

export const bookings: InstallationBooking[] = [
  {
    id: "book-1",
    customerName: "Chika Eze",
    customerEmail: "chika@example.com",
    address: "Lekki Phase 1, Lagos",
    preferredDate: "2026-06-24",
    systemSize: "5kVA apartment backup",
    notes: "Needs survey before final quote.",
    status: "requested"
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug || product.id === slug);
}
