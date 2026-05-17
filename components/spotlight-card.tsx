"use client";

import { type ReactNode, useRef, useState } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(203, 216, 16, 0.18)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function updatePosition(clientX: number, clientY: number) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    setPosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={(event) => {
        updatePosition(event.clientX, event.clientY);
        setOpacity(1);
      }}
      onMouseMove={(event) => updatePosition(event.clientX, event.clientY)}
      onMouseLeave={() => setOpacity(0)}
      onFocus={() => setOpacity(1)}
      onBlur={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:hidden"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 72%)`,
        }}
      />
      {children}
    </div>
  );
}
