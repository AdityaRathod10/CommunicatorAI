import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google"
import "./globals.css";
import MouseMoveEffect from "@/components/mouse-move-effect"
import Navbar from "@/components/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] })
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CommunicatorAI - Cutting-Edge Software Solutions",
  description: "Amane Soft delivers innovative, high-performance software solutions for businesses of the future.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
     <html lang="en" className="dark">
        <body className={`
          ${inter.className} 
          ${geistSans.variable} 
          ${geistMono.variable}
          bg-background 
          text-foreground 
          antialiased 
          flex 
          flex-col 
          min-h-screen
        `}>
          <MouseMoveEffect />
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
