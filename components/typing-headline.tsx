"use client";

import { useEffect, useState } from "react";

const phrases = ["dashboard yang cepat", "interface yang rapi", "cerita proyek yang bisa dicek"];
const finalPhrase = phrases[phrases.length - 1];

export function TypingHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(phrases.length - 1);
  const [visibleLength, setVisibleLength] = useState(finalPhrase.length);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    let currentPhraseIndex = 0;
    let currentLength = 0;
    let timeoutId: number | undefined;

    const tick = () => {
      frame += 1;

      if (frame % 2 === 0) {
        currentLength += 1;
        setVisibleLength(currentLength);
      }

      if (currentLength < phrases[currentPhraseIndex].length) {
        timeoutId = window.setTimeout(tick, 32);
        return;
      }

      if (currentPhraseIndex < phrases.length - 1) {
        timeoutId = window.setTimeout(() => {
          currentPhraseIndex += 1;
          currentLength = 0;
          setPhraseIndex(currentPhraseIndex);
          setVisibleLength(0);
          tick();
        }, 480);
        return;
      }

      setIsTyping(false);
    };

    timeoutId = window.setTimeout(() => {
      setPhraseIndex(0);
      setVisibleLength(0);
      setIsTyping(true);
      tick();
    }, 260);

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <span aria-hidden="true" className="block max-w-full text-balance">
      Gua bikin{" "}
      <span className="inline-grid min-w-0 max-w-full align-baseline sm:min-w-[17ch]">
        <span className="col-start-1 row-start-1 invisible">{finalPhrase}</span>
        <span className="col-start-1 row-start-1 min-w-0 break-words">
          {phrases[phraseIndex].slice(0, visibleLength)}
          {isTyping ? <span className="motion-safe:animate-pulse">|</span> : null}
        </span>
      </span>
    </span>
  );
}

