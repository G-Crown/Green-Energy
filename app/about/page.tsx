import { BatteryCharging, ShieldCheck, SunMedium } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black">About Greener Energy</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
        Greener Energy combines a solar product catalog, payment workflow, installation operations, and after-sales support in one commerce platform.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { icon: SunMedium, title: "Verified equipment", body: "Products include specs, stock levels, reviews, and warranty expectations." },
          { icon: BatteryCharging, title: "System thinking", body: "Kits connect panels, batteries, inverters, monitoring, and service booking." },
          { icon: ShieldCheck, title: "Operational trust", body: "Orders, invoices, email notices, and webhooks create a traceable customer journey." }
        ].map((item) => (
          <div key={item.title} className="rounded-md border border-border bg-card p-5 shadow-soft">
            <item.icon className="text-primary" />
            <h2 className="mt-4 text-xl font-black">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
