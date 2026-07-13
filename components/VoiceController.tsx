"use client";

import { useState, useEffect } from "react";

export default function VoiceController() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const list =
        window.speechSynthesis.getVoices();

      console.log("Available voices:", list);

      setVoices(list);
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;
  }, []);


  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Chromium");
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "ar-TN";
    recognition.continuous = false;


    recognition.onstart = () => {
      setListening(true);
    };


    recognition.onend = () => {
      setListening(false);
    };


    recognition.onresult = (event: any) => {
      const text =
        event.results[0][0].transcript;

      console.log("Recognized:", text);

      speak(text);
    };


    recognition.start();
  };


  function speak(text: string) {
    console.log("Speaking:", text);

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);


    // Try Arabic voice first
    const arabic =
      voices.find((v) =>
        v.lang.startsWith("ar")
      );


    if (arabic) {
      console.log(
        "Using voice:",
        arabic.name
      );

      utterance.voice = arabic;
    } else {
      console.log(
        "No Arabic voice found, using default"
      );
    }


    utterance.lang = "ar";
    utterance.rate = 1;
    utterance.pitch = 1;


    utterance.onstart = () =>
      console.log("TTS started");

    utterance.onend = () =>
      console.log("TTS finished");

    utterance.onerror = (e) =>
      console.error(
        "TTS error:",
        e
      );


    window.speechSynthesis.speak(
      utterance
    );
  }


  return (
    <button
      onClick={startListening}
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 20,
        padding: 15,
      }}
    >
      {listening
        ? "Listening..."
        : "🎤 Talk"}
    </button>
  );
}
