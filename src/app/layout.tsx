import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgriFarm Tours TZ | Premium Authentic Tanzania Experiences",
  description: "Go Beyond the Safari. Discover Where Tanzania Grows. Experience authentic agricultural and cultural tourism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Pre-warm DNS/TCP connections to image CDNs before page renders */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://ayexlmmcquztkpqycoey.supabase.co" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        
        <CustomCursor />
        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
