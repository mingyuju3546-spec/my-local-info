"use client";

import React, { useEffect, useState } from "react";

const Petal = ({ id, style }: { id: number; style: React.CSSProperties }) => {
  return (
    <svg
      className="absolute pointer-events-none select-none opacity-70"
      style={style}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.5C12 21.5 17.5 16.5 20.5 11.5C23.5 6.5 19 2.5 15.5 4.5C12 6.5 12 10.5 12 10.5C12 10.5 12 6.5 8.5 4.5C5 2.5 0.5 6.5 3.5 11.5C6.5 16.5 12 21.5 12 21.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function BlossomBackground() {
  const [petals, setPetals] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    const petalCount = 100; // 벚꽃 잎의 수 대폭 증가
    const newPetals = Array.from({ length: petalCount }).map((_, i) => {
      const left = -10 + Math.random() * 120; // 화면 밖에서도 시작하도록 범위 확장
      const duration = 15 + Math.random() * 20; // 더 천천히 떨어지게 조정
      const delay = Math.random() * -30;
      const size = 12 + Math.random() * 20; 
      const rotate = Math.random() * 360;
      const swayDuration = 5 + Math.random() * 6;
      const opacity = 0.6 + Math.random() * 0.3; 

      const colors = ["#ffc0cb", "#ffb6c1", "#ff99aa", "#ffb2d0", "#ffdee6"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: i,
        style: {
          left: `${left}%`,
          top: `-10%`,
          fontSize: `${size}px`,
          color: color,
          opacity: opacity,
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotate(${rotate}deg) rotateY(${Math.random() * 360}deg)`,
          filter: "drop-shadow(0 0 3px rgba(255,105,180,0.3))", // 그림자 강화
          animation: `
            fall ${duration}s linear infinite ${delay}s,
            sway ${swayDuration}s ease-in-out infinite alternate
          `,
        },
      };
    });
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <Petal key={petal.id} id={petal.id} style={petal.style} />
      ))}
    </div>
  );
}
