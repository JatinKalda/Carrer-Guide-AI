"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { weeklyActivity } from "@/lib/data";

export function WeeklyActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
        <CartesianGrid vertical={false} stroke="#EEF1F6" />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #E5E7EB", fontSize: 12 }} />
        <Bar dataKey="applications" fill="#5B5FEF" radius={[6, 6, 0, 0]} />
        <Bar dataKey="interviews" fill="#7C3AED" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
