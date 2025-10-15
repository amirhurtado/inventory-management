"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6", 
  "#10b981", 
  "#f59e0b", 
  "#ef4444", 
  "#8b5cf6", 
  "#ec4899", 
];

interface StockPieChartProps {
  data: { name: string; value: number }[];
}

const StockPieChart = ({ data }: StockPieChartProps) => {
  return (
    <div className="border-1 h-[350px] md:h-1/2 rounded-2xl px-3 py-6 flex flex-col gap-6 md:gap-8 shadow-sm">
      <h2 className="text-lg font-semibold">Distribución de inventario</h2>

      <div className="h-full w-full flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              innerRadius="40%"
              paddingAngle={5}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockPieChart;