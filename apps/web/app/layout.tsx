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
  title: "upup",
  description: "AMA app with upvotes",
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
        </Providers>
      </body>
    </html>
  );
}
