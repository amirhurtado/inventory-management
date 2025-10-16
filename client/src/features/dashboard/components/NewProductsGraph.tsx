"use client";
import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NewProductsGraphProps {
  dataGraphNewProducts: { date: string; count: number }[];
}

const NewProductsGraph = ({ dataGraphNewProducts }: NewProductsGraphProps) => {
  return (
    <div className="border-1 h-[350px] md:h-1/2 rounded-2xl px-3 py-6 flex flex-col gap-6 md:gap-8 shadow-sm">
      <h2 className="text-lg font-semibold">Nuevos productos por día</h2>

      <div className="h-full w-full">
        {dataGraphNewProducts.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataGraphNewProducts}
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                padding={{ left: 40, right: 20 }}
              />

              <YAxis fontSize={12} tickLine={false} axisLine={false} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />

              <Area
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                fill="url(#colorBlue)"
                fillOpacity={1}
                dot={{ r: 4, strokeWidth: 2, stroke: "#3b82f6", fill: "hsl(var(--background))" }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="text-lg font-semibold tracking-tight">No hay datos recientes</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Cuando añadas productos, sus estadísticas aparecerán aquí.
            </p>
            <Button asChild className="mt-4 text-white">
              <Link href="/add-product">Añadir primer producto</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProductsGraph;