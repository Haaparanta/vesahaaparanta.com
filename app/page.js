"use client";
import React, { useState, useEffect } from 'react';
import { EvervaultCard } from "@/components/ui/evervault-card";

const timerTime = 10000;

const text = [
  "Everybody wants to be Hacker",
  "I am a Software Engineer",
  "I am a DevOps Engineer",
  "I am a Frontend Developer",
  "I am a Backend Developer",
  "I am a Game Developer",
  "I am a Mobile Developer",
  "I am a Software Developer",
  "I am a UI/UX Designer",
  "I am a 3D modeller"
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, timerTime);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div style={{ width: '75vw', height: '75vh' }} className="flex items-center justify-center">
        <EvervaultCard text={text[currentIndex]} className="custom-class w-full h-full" />
      </div>
    </main>
  );
}
