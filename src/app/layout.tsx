import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wordle clone",
  description: "A wordle clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
