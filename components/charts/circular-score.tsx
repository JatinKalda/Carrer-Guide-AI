"use client";
import { motion } from "framer-motion";

export function CircularScore({
  value,
  size = 96,
  stroke = 9,
  label,
  sublabel,
  color = "#5B5FEF",
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#EEF1F6"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-mono text-xl font-bold text-ink">{value}</span>
        {label && <span className="text-[10px] font-medium text-muted">{label}</span>}
        {sublabel && <span className="text-[10px] text-muted">{sublabel}</span>}
      </div>
    </div>
  );
}
