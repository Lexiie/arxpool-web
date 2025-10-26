import type { Metadata } from "next";
import "../styles/globals.css";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const metadata: Metadata = {
  title: "ArxPool Web Portal",
  description:
    "Dark, futuristic portal for developers to explore the ArxPool SDK, docs, and interactive demos."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
