"use client"
import React, { useState, useEffect, useRef } from 'react';

const MallasmaratonPage = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [beers, setBeers] = useState([]);
  const audioRef = useRef(null);  // Reference to the audio element

  // Function to handle incrementing minutes and adding beer emoji
  const handleIncrementMinutes = () => {
    if (minutes < 100) {
      setMinutes(prevMinutes => prevMinutes + 1);
      setBeers(prevBeers => [...prevBeers, <span key={minutes} className="inline-block">🍺</span>]);
      audioRef.current?.play();  // Play audio when the minute increments
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        const newSeconds = (prevSeconds + 1) % 60;
        if (newSeconds === 0) {
          handleIncrementMinutes();
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-5">
      <h1 className="text-4xl font-bold mb-4">Mallasmaraton Timer</h1>
      <div className="text-6xl font-mono mb-5">
        <span>{String(minutes).padStart(2, '0')}:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <div className="flex space-x-1 mb-3">
        {beers}
      </div>
      <audio ref={audioRef} src="/sound.wav" className="hidden" />
    </main>
  );
};

export default MallasmaratonPage;
