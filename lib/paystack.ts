import crypto from "crypto";
import type { CartItem } from "@/types/product";

type InitializePaymentInput = {
  email: string;
  amount: number;
  reference: string;
  callbackUrl: string;
  metadata: {
    customerName: string;
    phone?: string;
    address?: string;
    items: CartItem[];
    installationRequested?: boolean;
  };
};

export async function initializePaystackPayment(input: InitializePaymentInput) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return {
      authorizationUrl: `/checkout?reference=${input.reference}&demo=paystack`,
      accessCode: "demo-access-code",
      reference: input.reference
    };
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: input.email,
      amount: input.amount * 100,
      reference: input.reference,
      callback_url: input.callbackUrl,
      metadata: input.metadata
    })
  });

  if (!response.ok) {
    throw new Error("Unable to initialize Paystack payment");
  }

  const payload = await response.json();
  return {
    authorizationUrl: payload.data.authorization_url as string,
    accessCode: payload.data.access_code as string,
    reference: payload.data.reference as string
  };
}

export function verifyPaystackSignature(rawBody: string, signature: string | null) {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !signature) return false;
  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  return hash === signature;
}
