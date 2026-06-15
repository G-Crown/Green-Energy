import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const payload = await request.json();

  if (!payload.customerName || !payload.customerEmail || !payload.address || !payload.preferredDate) {
    return NextResponse.json({ error: "Missing booking information." }, { status: 400 });
  }

  if (supabaseAdmin) {
    const { error } = await supabaseAdmin.from("installation_bookings").insert({
      customer_name: payload.customerName,
      customer_email: payload.customerEmail,
      address: payload.address,
      preferred_date: payload.preferredDate,
      system_size: payload.systemSize,
      notes: payload.notes,
      status: "requested"
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
