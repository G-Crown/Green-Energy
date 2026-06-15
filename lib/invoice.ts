import type { Order } from "@/types/product";
import { formatCurrency, formatDate } from "@/lib/utils";

export function generateInvoiceHtml(order: Order) {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(item.price)}</td>
          <td>${formatCurrency(item.price * item.quantity)}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Invoice ${order.reference}</title>
    <style>
      body { font-family: Arial, sans-serif; color: #102018; margin: 40px; }
      h1 { color: #14532d; }
      table { border-collapse: collapse; width: 100%; margin-top: 24px; }
      th, td { border-bottom: 1px solid #d7e6dc; padding: 12px; text-align: left; }
      .total { text-align: right; font-size: 20px; font-weight: 700; margin-top: 24px; }
    </style>
  </head>
  <body>
    <h1>Greener Energy Invoice</h1>
    <p><strong>Reference:</strong> ${order.reference}</p>
    <p><strong>Date:</strong> ${formatDate(order.createdAt)}</p>
    <p><strong>Billed to:</strong> ${order.customerName} (${order.customerEmail})</p>
    <table>
      <thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th>Line total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="total">Total: ${formatCurrency(order.total)}</p>
  </body>
</html>`;
}
