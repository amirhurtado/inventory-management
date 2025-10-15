import React from "react";
import KeyParameters from "./KeyParameters";
import StockLevels from "./StockLevels";

import { productsDashboardType } from "@/types";
import NewProductsGraph from "./NewProductsGraph";
import StockPieChart from "./StockPieChart";

interface SectionsDashboardInterface {
  dataSections: {
    products: productsDashboardType;
  };
}

const SectionsDashboard = ({ dataSections }: SectionsDashboardInterface) => {
  const totalPrice = dataSections.products.reduce(
    (total, product) => total + Number(product.price) * product.quantity,
    0
  );
  const lowStockCount = dataSections.products.filter(
    (product) => product.lowStockAt && product.lowStockAt <= product.quantity
  ).length;

  const dataStockLevels = dataSections.products.map((product) => ({
    name: product.name,
    quantity: product.quantity,
    isLowStock: product.lowStockAt
      ? product.quantity <= product.lowStockAt
      : false,
  }));

  const productsByDate = dataSections.products.reduce((acc, product) => {
  const date = new Date(product.createdAt).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  acc[date] = (acc[date] || 0) + 1;

  return acc;
}, {} as Record<string, number>);

const dataGraphNewProducts = Object.entries(productsByDate).map(([date, count]) => ({
  date,
  count,
})).slice(0, 5);;


const dataStockPie =
  dataSections?.products
    ?.filter((p) => typeof p.quantity === "number" && !!p.name)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 6)
    .map((product) => ({
      name: product.name as string,
      value: Number(product.quantity),
    })) || [];





  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 flex-1  overflow-y-scroll md:max-h-dvh md:overflow-hidden    w-full gap-4 ">
      <div className="flex flex-col gap-4 md:max-h-dvh md:overflow-hidden">
        <KeyParameters
          data={{
            totalProducts: dataSections.products.length,
            totalPrice: totalPrice,
            lowStock: lowStockCount,
          }}
        />

        <StockLevels products={dataStockLevels} />
      </div>



     <div className="flex flex-col gap-4  md:max-h-dvh md:overflow-hidden ">
      <NewProductsGraph dataGraphNewProducts={dataGraphNewProducts} />
      <StockPieChart data={dataStockPie} />

     </div>
    </div>
  );
};

export default SectionsDashboard;
