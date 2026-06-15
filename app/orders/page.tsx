import { FileText, PackageCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { listOrders } from "@/lib/supabase";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function OrdersPage() {
  const orders = await listOrders();

  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">Order tracking</h1>
      <p className="mt-2 text-muted-foreground">Customers can follow payment, processing, installation, and handover states.</p>
      <div className="mt-8 grid gap-4">
        {orders.map((order) => (
          <article key={order.id} className="rounded-md border border-border bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                <h2 className="text-xl font-black">{order.reference}</h2>
                <p className="text-sm text-muted-foreground">{order.customerName} - {order.customerEmail}</p>
              </div>
              <span className="rounded-md bg-muted px-3 py-1 text-sm font-bold capitalize">{order.status}</span>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              {order.items.map((item) => (
                <div key={`${order.id}-${item.productId}`} className="flex justify-between gap-4">
                  <span>{item.quantity} x {item.name}</span>
                  <span>{formatCurrency(item.quantity * item.price)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <p className="font-black">{formatCurrency(order.total)}</p>
              <div className="flex gap-3">
                <LinkButton href={`/api/invoices/${order.id}`} variant="ghost" icon={<FileText size={18} />}>Invoice</LinkButton>
                <LinkButton href="/contact" icon={<PackageCheck size={18} />}>Get support</LinkButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
