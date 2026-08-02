import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laxman Rekha | AI Digital Copyright Protection & Blockchain Provenance",
  description: "Draw an impenetrable digital boundary around your photography. Invisible DCT frequency watermarking, Polygon Amoy blockchain proof, and AI breach detection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased bg-[#070a0f] text-[#f0f6fc] min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}