import type { Metadata } from "next";
import "@/app/globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "Greener Energy",
  description: "Solar e-commerce platform for products, installation, and clean power support."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
