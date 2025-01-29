import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mypayIQ - Smart Subscription Management",
  description: "Manage your subscriptions and payments efficiently with mypayIQ",
  keywords: "subscription management, payment tracking, financial dashboard",
  authors: [{ name: "mypayIQ Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
