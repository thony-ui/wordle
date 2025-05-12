import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./providers/QueryClientProvider";
import forest from "@images/forest.jpg";

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
      <body
        className="flex flex-col items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url(${forest.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
