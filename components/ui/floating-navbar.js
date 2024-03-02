"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true); // Start with the nav visible

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((current) => {
      if (current < 0.05) {
        setVisible(true); // Show the navbar at the top of the page
      } else {
        setVisible(false); // Hide as we scroll down
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <AnimatePresence>
      {visible && (
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
            "w-full fixed top-0 left-0 right-0 mx-auto border border-transparent dark:border-white/[0.2] bg-white dark:bg-black shadow-lg z-[5000] px-4 py-2 items-center justify-center",
            className
          )}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
            {navItems.map((navItem, idx) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative dark:text-neutral-50 flex items-center space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
