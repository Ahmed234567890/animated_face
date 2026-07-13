"use client";

import { useEffect } from "react";

export default function AudioAnalyzer() {
  useEffect(() => {
    const audio =
      window.speechSynthesis;

    if (!audio) return;

    const interval = setInterval(() => {
      // temporary placeholder
      window.audioLevel = 0;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return null;
}
