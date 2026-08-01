import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "../components/LenisProvider";
import CustomCursor from "../components/CustomCursor";
import { AuthProvider } from "../context/AuthContext";
import { ImageProvider } from "../context/ImageContext";

export const metadata: Metadata = {
  title: "Lakxam Rekha | Cryptographic Pixel Watermarking & Deepfake Protection",
  description: "Secure your visual assets at the pixel level. Lakxam Rekha provides spatial steganography pixel signatures and real-time crawler tracking alerts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#020205]">
        <AuthProvider>
          <ImageProvider>
            <LenisProvider>
              <CustomCursor />
              {children}
            </LenisProvider>
          </ImageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
