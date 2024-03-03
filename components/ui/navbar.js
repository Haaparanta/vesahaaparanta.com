"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const NavBar = ({
  navItems,
  className,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        y: -100,
      }}
      transition={{
        duration: 0.2,
      }}
      className={cn(
        "w-full fixed top-0 left-0 right-0 mx-auto border border-transparent dark:border-white/[0.2] bg-black shadow-lg z-[5000] px-4 py-4 items-center justify-center",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        {navItems.map((navItem, idx) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "text-white flex items-center space-x-1 hover:text-neutral-300"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-lg">{navItem.name}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
