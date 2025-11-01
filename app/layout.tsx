import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arxpool-web.vercel.app";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "ArxPool — Testnet Portal",
  description: "Landing, docs, demo, and collector API for the ArxPool encrypted pooling toolkit.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "ArxPool — Testnet Portal",
    description: "Landing, docs, demo, and collector API for the ArxPool encrypted pooling toolkit.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ArxPool Portal"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ArxPool — Testnet Portal",
    description: "Landing, docs, demo, and collector API for the ArxPool encrypted pooling toolkit.",
    images: ["/og.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground" style={{ fontFamily: '"Google Sans", var(--font-inter), "Inter", sans-serif' }}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
