"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = ({
  navItems,
  className,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div
      className={cn(
        "w-full fixed top-0 left-0 right-0 mx-auto border border-transparent dark:border-white/[0.2] bg-black shadow-lg z-[5000] px-4 py-4",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <Link
          href="/"
          className="text-white font-medium text-lg hover:text-neutral-300 md:hidden"
        >
          Vesa Haaparanta
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden text-white p-2 min-h-11 min-w-11 flex items-center justify-center rounded-md hover:bg-white/10"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex justify-between items-center w-full">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className="text-white flex items-center gap-2 px-3 py-2 rounded-md hover:text-neutral-300 hover:bg-white/5"
            >
              <span className="text-lg">{navItem.icon}</span>
              <span className="text-lg">{navItem.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden mt-2 border-t border-white/10 pt-2">
          {navItems.map((navItem, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={navItem.link}
              onClick={() => setMenuOpen(false)}
              className="text-white flex items-center gap-3 px-4 py-3 min-h-11 rounded-md hover:text-neutral-300 hover:bg-white/5"
            >
              <span>{navItem.icon}</span>
              <span className="text-base">{navItem.name}</span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};
