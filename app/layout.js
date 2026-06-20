import { Inter } from "next/font/google";
import "./globals.css";

import { NavBarMenu, NavBarFloating, Navbar } from "@/components/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vesa Haaparanta",
  description: "Personal website of Vesa Haaparanta — Software Engineer, DevOps, and Developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
