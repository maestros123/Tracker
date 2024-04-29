import type { Metadata } from "next";
import {Inter, Roboto} from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tracker",
  description: "Multifunctional tracker",
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
