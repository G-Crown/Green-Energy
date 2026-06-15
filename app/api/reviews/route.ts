import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const payload = await request.json();

  if (!payload.productId || !payload.author || !payload.rating || !payload.body) {
    return NextResponse.json({ error: "Missing review information." }, { status: 400 });
  }

  if (supabaseAdmin) {
    const { error } = await supabaseAdmin.from("reviews").insert({
      product_id: payload.productId,
      author: payload.author,
      rating: payload.rating,
      body: payload.body,
      status: "pending"
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
