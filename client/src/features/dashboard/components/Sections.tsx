"use client";

import React from "react";
import KeyParameters from "./KeyParameters";
import StockLevels from "./StockLevels";
import { productsDashboardType } from "@/types";
import NewProductsGraph from "./NewProductsGraph";
import StockPieChart from "./StockPieChart";
import { useQuery } from "@tanstack/react-query";
import { getDashboardProductAction } from "@/actions/products/getProduct";
import { DashboardSkeleton } from "./DashboardSkeleton";

interface SectionsDashboardProps {
  initialProducts: productsDashboardType;
}

const SectionsDashboard = ({ initialProducts }: SectionsDashboardProps) => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["dashboardProducts"],
    queryFn: () => getDashboardProductAction(),
    initialData: initialProducts,
    staleTime: 1000 * 60 * 5, 
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !products) {
    return <p>Error al cargar los datos.</p>;
  }

  const totalPrice = products.reduce(
    (total, product) => total + Number(product.price) * product.quantity,
    0
  );
  const lowStockCount = products.filter(
    (product) => product.lowStockAt && product.quantity <= product.lowStockAt
  ).length;

  const dataStockLevels = products.map((product) => ({
    name: product.name,
    quantity: product.quantity,
    isLowStock: product.lowStockAt
      ? product.quantity <= product.lowStockAt
      : false,
  }));

  const productsByDate = products.reduce((acc, product) => {
    const date = new Date(product.createdAt).toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dataGraphNewProducts = Object.entries(productsByDate)
    .map(([date, count]) => ({ date, count }))
    .slice(0, 5);

  const dataStockPie =
    products
      ?.filter((p) => typeof p.quantity === "number" && !!p.name)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 6)
      .map((product) => ({
        name: product.name as string,
        value: Number(product.quantity),
      })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-y-scroll md:max-h-dvh md:overflow-hidden w-full gap-4">
      <div className="flex flex-col gap-4 md:max-h-dvh md:overflow-hidden">
        <KeyParameters
          data={{
            totalProducts: products.length,
            totalPrice: totalPrice,
            lowStock: lowStockCount,
          }}
        />
        <StockLevels products={dataStockLevels} />
      </div>

      <div className="flex flex-col gap-4 md:max-h-dvh md:overflow-hidden">
        <NewProductsGraph dataGraphNewProducts={dataGraphNewProducts} />
        <StockPieChart data={dataStockPie} />
      </div>
    </div>
  );
};



export default SectionsDashboard;