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
  title: "CRAZY BUILD | Coding Club JISCE",
  description: "Join CRAZY BUILD 2026, the 8-hour hackathon. Experience chaos, creativity, and code!",
  openGraph: {
    title: "CRAZY BUILD | Coding Club JISCE",
    description: "Join CRAZY BUILD 2026, the 8-hour hackathon. Experience chaos, creativity, and code!",
    images: ["/sharelogo.jpeg"],
  },
  twitter: {
    card: "summary_large_image", 
    title: "CRAZY BUILD | Coding Club JISCE",
    description: "Join CRAZY BUILD 2026, the 8-hour hackathon. Experience chaos, creativity, and code!",
    images: ["/sharelogo.jpeg"],
  },
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
      <body className="font-sans antialiased text-[#1a1a1a]" suppressHydrationWarning>
        <div className="overflow-x-clip relative w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
