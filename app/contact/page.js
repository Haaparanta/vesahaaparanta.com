"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { ContactLinks } from "@/components/contact/contact-links";

export default function Contact() {
  return (
    <main className="flex min-h-screen max-h-screen items-center justify-center p-4 md:p-10">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.3, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center text-xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-slate-500 py-2 md:py-4 md:text-3xl"
        >
          Contact
          <ContactLinks className="mt-4 font-normal" />
        </motion.div>
      </LampContainer>
    </main>
  );
}
