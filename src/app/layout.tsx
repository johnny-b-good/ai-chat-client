import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en" className="bg-slate-100 text-slate-900 antialiased">
      <body className="bg-slate-200">{children}</body>
    </html>
  );
}
