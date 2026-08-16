"use client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { skillRadar } from "@/lib/data";

export function SkillRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={skillRadar} outerRadius="72%">
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "#64748B" }} />
        <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
        <Radar name="Current" dataKey="current" stroke="#5B5FEF" fill="#5B5FEF" fillOpacity={0.35} />
        <Radar name="Target" dataKey="target" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.12} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
