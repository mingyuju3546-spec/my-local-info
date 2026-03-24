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
    const petalCount = 25; // 벚꽃 잎의 수
    const newPetals = Array.from({ length: petalCount }).map((_, i) => {
      const left = Math.random() * 100; // 랜덤 가로 위치 (0%~100%)
      const duration = 10 + Math.random() * 15; // 낙하 시간 (10s~25s)
      const delay = Math.random() * -20; // 시작 지연 (이미 화면에 흩뿌려진 느낌을 위해 음수 사용)
      const size = 10 + Math.random() * 15; // 꽃잎 크기 (10px~25px)
      const rotate = Math.random() * 360; // 초기 회전각
      const swayDuration = 3 + Math.random() * 4; // 좌우 흔들림 시간 (3s~7s)
      const opacity = 0.5 + Math.random() * 0.4; // 투명도 (0.5~0.9)

      // 벚꽃 색상 랜덤 선택 (부드러운 핑크 계열)
      const colors = ["#ffc0cb", "#ffb6c1", "#ff99aa", "#ffecf1"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: i,
        style: {
          left: `${left}%`,
          top: `-5%`,
          fontSize: `${size}px`,
          color: color,
          opacity: opacity,
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotate(${rotate}deg)`,
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
