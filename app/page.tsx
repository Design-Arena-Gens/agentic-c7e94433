/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useMemo } from "react";

const line = "A is for Apple, red and sweet, Crunchy and juicy — a tasty treat!";

export default function Home() {
  const sparkleOffsets = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        style: {
          animationDelay: `${index * 0.35}s`,
          transform: `rotate(${index * 30}deg)`
        }
      })),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const message = new SpeechSynthesisUtterance(line);
    message.pitch = 1.6;
    message.rate = 1.05;
    message.volume = 1;
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((voice) =>
          voice.name.toLowerCase().includes("child")
        ) ||
        voices.find((voice) =>
          voice.name.toLowerCase().includes("female")
        ) ||
        voices.find((voice) => voice.lang.startsWith("en"));
      if (preferred) {
        message.voice = preferred;
      }
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(message);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
    } else {
      pickVoice();
    }

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
    };
  }, []);

  return (
    <main className="scene">
      <div className="sun">
        <div className="sun-face">☀️</div>
      </div>
      <div className="table" />
      <div className="apple">
        <div className="apple-body">
          <div className="apple-highlight" />
          <div className="apple-eye left" />
          <div className="apple-eye right" />
          <div className="apple-mouth">
            <div className="apple-tongue" />
          </div>
        </div>
        <div className="apple-leaf" />
        <div className="apple-stem" />
        <div className="sparkle-field">
          {sparkleOffsets.map(({ id, style }) => (
            <span key={id} className="sparkle" style={style} />
          ))}
        </div>
      </div>
      <div className="speech-bubble">
        <p>{line}</p>
      </div>
    </main>
  );
}
