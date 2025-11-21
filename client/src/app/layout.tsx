import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/global.css";
import RootProvider from "@/components/providers/RootProvider";
import Modals from "@/components/modals";
import Message from "@/components/ui/Message";
import MainLayout from "@/components/layouts/Main";

interface RootLayoutProps {
  children: React.ReactNode;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Best Funny Memes and Breaking News`,
  description:
    "Your daily dose of funny memes, GIFs, videos and weird news stories. We deliver hundreds of new memes daily and much more humor anywhere you go.",
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Best Funny Memes and Breaking News`,
    description:
      "Your daily dose of funny memes, GIFs, videos and weird news stories. We deliver hundreds of new memes daily and much more humor anywhere you go.",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider>
          <Modals />
          <Message />

          <MainLayout>{children}</MainLayout>
        </RootProvider>
      </body>
    </html>
  );
}
