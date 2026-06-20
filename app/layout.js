import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vesa Haaparanta",
  description: "Personal website of Vesa Haaparanta — Software Engineer, DevOps, and Developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
