import { AdminShell } from "@/components/AdminShell";
import { listOrders } from "@/lib/supabase";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <AdminShell title="Order management">
      <div className="overflow-hidden rounded-md border border-border bg-card shadow-soft">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-3">Reference</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-border">
                <td className="p-3 font-semibold">{order.reference}</td>
                <td className="p-3">{order.customerName}<br /><span className="text-muted-foreground">{order.customerEmail}</span></td>
                <td className="p-3">{formatDate(order.createdAt)}</td>
                <td className="p-3">{formatCurrency(order.total)}</td>
                <td className="p-3"><span className="rounded-md bg-muted px-2 py-1 text-xs font-bold capitalize">{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
