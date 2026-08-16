"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { careerProgress } from "@/lib/data";

export function CareerProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={careerProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5B5FEF" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#5B5FEF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#EEF1F6" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 16, border: "1px solid #E5E7EB", fontSize: 12 }}
        />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#5B5FEF"
          strokeWidth={2.5}
          fill="url(#scoreGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
