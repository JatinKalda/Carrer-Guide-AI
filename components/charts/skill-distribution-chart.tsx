"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { skillDistribution } from "@/lib/data";

export function SkillDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={skillDistribution}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          cornerRadius={8}
        >
          {skillDistribution.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke="none" />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #E5E7EB", fontSize: 12 }} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span className="text-xs text-muted">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
