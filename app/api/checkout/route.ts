import { NextResponse } from "next/server";
import { initializePaystackPayment } from "@/lib/paystack";
import { supabaseAdmin } from "@/lib/supabase";
import type { CartItem, Order } from "@/types/product";
import { sendOrderEmail } from "@/lib/email";

export async function POST(request: Request) {
  const payload = await request.json();
  const items = (payload.items ?? []) as CartItem[];

  if (!payload.customerEmail || !payload.customerName || items.length === 0) {
    return NextResponse.json({ error: "Missing customer or cart information." }, { status: 400 });
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const installationFee = payload.installationRequested ? 75000 : 0;
  const total = subtotal + installationFee;
  const reference = `GE-${Date.now()}`;
  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/orders?reference=${reference}`;

  const order: Order = {
    id: reference,
    reference,
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
    items: items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }))
  };

  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert({
        reference,
        customer_name: payload.customerName,
        customer_email: payload.customerEmail,
        phone: payload.phone,
        delivery_address: payload.address,
        total,
        status: "pending",
        installation_requested: Boolean(payload.installationRequested)
      })
      .select("id")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await supabaseAdmin.from("order_items").insert(
      order.items.map((item) => ({
        order_id: data.id,
        product_id: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    );
  }

  const payment = await initializePaystackPayment({
    email: payload.customerEmail,
    amount: total,
    reference,
    callbackUrl,
    metadata: {
      customerName: payload.customerName,
      phone: payload.phone,
      address: payload.address,
      installationRequested: Boolean(payload.installationRequested),
      items
    }
  });

  await sendOrderEmail(order);

  return NextResponse.json(payment);
}
