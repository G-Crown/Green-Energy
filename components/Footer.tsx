import Link from "next/link";
import { Mail, MapPin, Phone, SunMedium } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <SunMedium size={20} />
            </span>
            Greener Energy
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Solar products, installation services, and after-sales support for homes and businesses.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">Company</h3>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <Link href="/about">About</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/consultation">Book installation</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">Support</h3>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Phone size={16} /> +234 800 555 0199</span>
            <span className="flex items-center gap-2"><Mail size={16} /> support@greenerenergy.example</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Lagos, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
