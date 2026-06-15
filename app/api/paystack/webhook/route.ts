import { NextResponse } from "next/server";
import { verifyPaystackSignature } from "@/lib/paystack";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!verifyPaystackSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const reference = event?.data?.reference;
  const status = event?.event === "charge.success" ? "paid" : "pending";

  if (supabaseAdmin && reference) {
    await supabaseAdmin.from("payment_events").insert({
      provider: "paystack",
      reference,
      event_type: event.event,
      payload: event
    });

    await supabaseAdmin.from("orders").update({ status, paid_at: new Date().toISOString() }).eq("reference", reference);
  }

  return NextResponse.json({ received: true });
}
