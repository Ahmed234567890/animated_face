"use client";

import { useEffect } from "react";

export default function MicAnalyzer() {
  useEffect(() => {
    let animation: number;

    async function start() {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      const context =
        new AudioContext();

      const source =
        context.createMediaStreamSource(stream);

      const analyser =
        context.createAnalyser();

      analyser.fftSize = 512;

      source.connect(analyser);

      const data =
        new Uint8Array(
          analyser.frequencyBinCount
        );

      function update() {
        analyser.getByteFrequencyData(data);

        let sum = 0;

        for (const value of data) {
          sum += value;
        }

        const volume =
          sum / data.length / 255;

        (window as any).audioLevel =
          Math.min(volume * 3, 1);

        animation =
          requestAnimationFrame(update);
      }

      update();
    }

    start();

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  return null;
}
