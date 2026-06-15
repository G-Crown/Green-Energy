import { ClipboardList, HardHat, Home, Zap } from "lucide-react";
import { ConsultationForm } from "@/components/ConsultationForm";

export default function ConsultationPage() {
  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_0.8fr]">
      <ConsultationForm />
      <aside className="grid h-max gap-4">
        {[
          { icon: Home, title: "Site survey", body: "Confirm roof, load profile, cable path, and battery placement." },
          { icon: ClipboardList, title: "Quote", body: "Receive a bill of materials and installation estimate." },
          { icon: HardHat, title: "Install", body: "Schedule certified technicians and track handover tasks." },
          { icon: Zap, title: "Support", body: "Post-install monitoring, warranty, and maintenance reminders." }
        ].map((item) => (
          <div key={item.title} className="rounded-md border border-border bg-card p-5 shadow-soft">
            <item.icon className="text-primary" />
            <h2 className="mt-3 font-black">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </aside>
    </section>
  );
}
