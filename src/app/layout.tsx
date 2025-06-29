import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui";

export const metadata: Metadata = {
  title: "Ollama client",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background text-foreground antialiased">
      <body className="bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
