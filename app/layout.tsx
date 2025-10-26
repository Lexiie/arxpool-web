import type { Metadata } from "next";
import { Cabin_Condensed } from "next/font/google";
import "../styles/globals.css";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://arxpool.dev";

const cabinCondensed = Cabin_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "ArxPool Web Portal",
  description:
    "Dark, futuristic portal for developers to explore the ArxPool SDK, docs, and interactive demos.",
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "ArxPool Web Portal",
    description:
      "Dark, futuristic portal for developers to explore the ArxPool SDK, docs, and interactive demos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ArxPool Portal Overview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ArxPool Web Portal",
    description:
      "Dark, futuristic portal for developers to explore the ArxPool SDK, docs, and interactive demos.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${cabinCondensed.variable}`}>
      <body className={`${cabinCondensed.className} min-h-screen bg-background text-foreground`}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
