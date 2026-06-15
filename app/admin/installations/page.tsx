import { AdminShell } from "@/components/AdminShell";
import { listBookings } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

export default async function AdminInstallationsPage() {
  const bookings = await listBookings();

  return (
    <AdminShell title="Installation bookings">
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <article key={booking.id} className="rounded-md border border-border bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">{booking.customerName}</h2>
                <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
              </div>
              <span className="rounded-md bg-muted px-3 py-1 text-sm font-bold capitalize">{booking.status}</span>
            </div>
            <div className="mt-4 grid gap-2 text-sm md:grid-cols-3">
              <p><strong>Address:</strong> {booking.address}</p>
              <p><strong>Preferred:</strong> {formatDate(booking.preferredDate)}</p>
              <p><strong>System:</strong> {booking.systemSize}</p>
            </div>
            {booking.notes && <p className="mt-3 text-sm text-muted-foreground">{booking.notes}</p>}
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
