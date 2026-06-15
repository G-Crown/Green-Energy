import { AlertTriangle, Banknote, Boxes, CalendarCheck, ShoppingCart } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { listBookings, listOrders, listProducts } from "@/lib/supabase";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [products, orders, bookings] = await Promise.all([listProducts(), listOrders(), listBookings()]);
  const revenue = orders.filter((order) => order.status !== "cancelled").reduce((sum, order) => sum + order.total, 0);
  const lowStock = products.filter((product) => product.inventory <= product.lowStockThreshold);
  const pendingInstallations = bookings.filter((booking) => booking.status !== "completed");

  return (
    <AdminShell title="Analytics dashboard">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { icon: Banknote, label: "Revenue", value: formatCurrency(revenue) },
          { icon: ShoppingCart, label: "Orders", value: orders.length },
          { icon: Boxes, label: "Products", value: products.length },
          { icon: CalendarCheck, label: "Installations", value: pendingInstallations.length }
        ].map((metric) => (
          <div key={metric.label} className="rounded-md border border-border bg-card p-5 shadow-soft">
            <metric.icon className="text-primary" size={22} />
            <p className="mt-3 text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-2xl font-black">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 text-xl font-black"><AlertTriangle size={20} /> Low stock</h2>
          <div className="mt-4 grid gap-3">
            {lowStock.map((product) => (
              <div key={product.id} className="flex justify-between rounded-md bg-muted p-3 text-sm">
                <span>{product.name}</span>
                <span className="font-bold">{product.inventory} left</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-border bg-card p-5 shadow-soft">
          <h2 className="text-xl font-black">Recent orders</h2>
          <div className="mt-4 grid gap-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex justify-between gap-4 rounded-md bg-muted p-3 text-sm">
                <span>{order.reference}<br /><span className="text-muted-foreground">{formatDate(order.createdAt)}</span></span>
                <span className="text-right font-bold">{formatCurrency(order.total)}<br /><span className="capitalize text-muted-foreground">{order.status}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
