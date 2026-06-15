import type { Order } from "@/types/product";

export async function sendOrderEmail(order: Order) {
  if (!process.env.SMTP_HOST) {
    console.info(`Email skipped for ${order.reference}; SMTP is not configured.`);
    return { queued: false };
  }

  // Wire this to Resend, SendGrid, or Nodemailer in production. The function boundary keeps routes stable.
  console.info(`Queue order confirmation for ${order.customerEmail}: ${order.reference}`);
  return { queued: true };
}
