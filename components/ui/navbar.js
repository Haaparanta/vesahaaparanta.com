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
      <div className="max-w-7xl mx-auto w-full">
        <div className="lg:hidden flex justify-between items-center w-full">
          <Link
            href="/"
            className="text-white font-medium text-lg hover:text-neutral-300"
          >
            Vesa Haaparanta
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-white p-2 min-h-11 min-w-11 flex items-center justify-center rounded-md hover:bg-white/10"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="hidden lg:flex flex-wrap justify-center items-center gap-x-1 gap-y-1 w-full">
          {navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className="text-white whitespace-nowrap flex items-center gap-1.5 px-2.5 py-2 rounded-md text-sm hover:text-neutral-300 hover:bg-white/5"
            >
              <span className="shrink-0">{navItem.icon}</span>
              <span>{navItem.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <nav className="lg:hidden mt-2 border-t border-white/10 pt-2 max-w-7xl mx-auto">
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
