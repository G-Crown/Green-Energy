import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[0.8fr_1fr]">
      <div>
        <h1 className="text-4xl font-black">Contact support</h1>
        <p className="mt-2 text-muted-foreground">Reach sales, installation, warranty, and order teams.</p>
        <div className="mt-8 grid gap-4">
          <p className="flex items-center gap-3"><Phone className="text-primary" /> +234 800 555 0199</p>
          <p className="flex items-center gap-3"><Mail className="text-primary" /> support@greenerenergy.example</p>
          <p className="flex items-center gap-3"><MapPin className="text-primary" /> Lagos, Nigeria</p>
        </div>
      </div>
      <form className="rounded-md border border-border bg-card p-5 shadow-soft">
        <div className="grid gap-4">
          <input className="h-11 rounded-md border border-border bg-background px-3" placeholder="Name" />
          <input className="h-11 rounded-md border border-border bg-background px-3" placeholder="Email" />
          <select className="h-11 rounded-md border border-border bg-background px-3" defaultValue="orders">
            <option value="orders">Order support</option>
            <option value="installation">Installation</option>
            <option value="warranty">Warranty</option>
            <option value="sales">Sales</option>
          </select>
          <textarea className="rounded-md border border-border bg-background p-3" rows={5} placeholder="Message" />
          <button className="rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground">Send message</button>
        </div>
      </form>
    </section>
  );
}
