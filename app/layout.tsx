import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Couture Club — Minky Couture",
  description: "The Couture Club app — Luxury is a feeling. Loyalty is the reward.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
