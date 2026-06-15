"use client";

import { useState } from "react";
import { CalendarPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ConsultationForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/installation-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    setLoading(false);
    setMessage(response.ok ? "Installation request received. The operations team can now quote and schedule it." : "Unable to submit request.");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="rounded-md border border-border bg-card p-5 shadow-soft">
      <h1 className="text-3xl font-black">Book installation service</h1>
      <p className="mt-2 text-muted-foreground">Request a site survey, quote, installation, or battery expansion.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          ["customerName", "Full name"],
          ["customerEmail", "Email"],
          ["address", "Installation address"],
          ["preferredDate", "Preferred date"],
          ["systemSize", "System size or load goal"]
        ].map(([name, label]) => (
          <label key={name} className={name === "systemSize" ? "grid gap-1 sm:col-span-2" : "grid gap-1"}>
            <span className="text-sm font-semibold">{label}</span>
            <input name={name} type={name === "preferredDate" ? "date" : "text"} required className="h-11 rounded-md border border-border bg-background px-3 outline-none focus:border-primary" />
          </label>
        ))}
        <label className="grid gap-1 sm:col-span-2">
          <span className="text-sm font-semibold">Notes</span>
          <textarea name="notes" rows={4} className="rounded-md border border-border bg-background p-3 outline-none focus:border-primary" />
        </label>
      </div>
      {message && <p className="mt-4 rounded-md bg-muted p-3 text-sm font-semibold">{message}</p>}
      <Button className="mt-6" icon={loading ? <Loader2 className="animate-spin" size={18} /> : <CalendarPlus size={18} />} disabled={loading}>
        Submit request
      </Button>
    </form>
  );
}
