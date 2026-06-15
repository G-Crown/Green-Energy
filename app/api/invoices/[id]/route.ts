import { NextResponse } from "next/server";
import { generateInvoiceHtml } from "@/lib/invoice";
import { listOrders } from "@/lib/supabase";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orders = await listOrders();
  const order = orders.find((item) => item.id === id || item.reference === id);

  if (!order) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  return new NextResponse(generateInvoiceHtml(order), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="${order.reference}.html"`
    }
  });
}
