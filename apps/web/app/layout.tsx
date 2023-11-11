import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import Navbar from "../components/layout/navbar";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "upup - AMA app with upvotes",
  description:
    "upup is an AMA app with upvotes, but for live streamers of any kind. it allows you to answer the top upvoted questions from your audience.",
  openGraph: {
    title: "upup - AMA app with upvotes",
    description:
      "upup is an AMA app with upvotes for live streamers of any kind. it allows you to answer the top upvoted questions from your audience.",
    url: "https://upupapp.xyz",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>
          <Navbar />

          {children}

          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
