import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import ProductionLayout from "./production/ProductionLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventBrain",
  description: "EventBrain is a web app to manage events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ProductionLayout>{children}</ProductionLayout>
        </Providers>
      </body>
    </html>
  );
}
