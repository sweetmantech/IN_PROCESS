import type { Metadata } from "next";
import "@xyflow/react/dist/style.css";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import LoginButton from "@/components/LoginButton";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "In Process",
  description: "Imagined by LATASHÁ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[url('/bg.png')] bg-cover">
      <body className="min-h-screen flex flex-col !overflow-x-hidden w-screen">
        <Suspense>
          <Providers>
            <Logo className="fixed left-10 top-10 z-10" />
            <LoginButton className="fixed right-10 top-8 z-10" />
            <div className="grow relative flex flex-col">{children}</div>
            <Footer />
          </Providers>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
