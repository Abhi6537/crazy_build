import type { Metadata } from "next";
import { Space_Grotesk, Inter, Kalam } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-caveat", // Keep variable name same so tailwind picks it up
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CRAZY BUILD | Premium Hackathon",
  description: "A designer's sketchbook mixed with an engineer's notebook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${kalam.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
