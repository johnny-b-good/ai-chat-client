import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ollama client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-100 text-slate-900 antialiased">
      <body>{children}</body>
    </html>
  );
}
