import type { Metadata } from "next";
import "./globals.css";
import { SiteProvider } from "@/context/SiteContext";

export const metadata: Metadata = {
  title: "Shree New Everest Distillery – Nepal's Premium Spirits House",
  description: "Crafted with Precision. Distilled for the World. Nepal's emerging premium spirits house — 15 Years of Distillation Excellence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
