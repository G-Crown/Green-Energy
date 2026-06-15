import { ArrowRight, BatteryCharging, ShieldCheck, Truck } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="border-b border-border bg-card">
      <div className="container-page grid min-h-[520px] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 inline-flex rounded-md bg-muted px-3 py-1 text-sm font-semibold text-primary">
            Solar commerce, installation, and support
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Greener Energy
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Buy verified solar panels, inverters, batteries, and full kits with tracked orders, expert installation, and clean handover documents.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/shop" icon={<ArrowRight size={18} />}>
              Shop solar products
            </LinkButton>
            <LinkButton href="/consultation" variant="ghost">
              Book installation
            </LinkButton>
          </div>
          <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
            <span className="flex items-center gap-2"><Truck size={18} /> Nationwide dispatch</span>
            <span className="flex items-center gap-2"><ShieldCheck size={18} /> Warranty-backed</span>
            <span className="flex items-center gap-2"><BatteryCharging size={18} /> Load sizing support</span>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-md bg-[url('https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center shadow-soft">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-primary/30" />
          <div className="absolute bottom-5 left-5 right-5 rounded-md bg-card/92 p-5 shadow-soft backdrop-blur">
            <p className="text-sm font-semibold text-muted-foreground">Popular package</p>
            <p className="mt-1 text-2xl font-black">5kVA home backup kit</p>
            <p className="mt-2 text-sm text-muted-foreground">Panels, inverter, lithium battery, mounting, installation checklist.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
