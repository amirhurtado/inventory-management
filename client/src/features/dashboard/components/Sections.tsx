import React from "react";
import KeyParameters from "./KeyParameters";
import StockLevels from "./StockLevels";

import { productsDashboardType } from "@/types";

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
    (product) => product.lowStockAt === product.quantity
  ).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full gap-4">
      <div className="flex flex-col gap-4">
        <KeyParameters
          data={{
            totalProducts: dataSections.products.length,
            totalPrice: totalPrice,
            lowStock: lowStockCount,
          }}
        />

        <StockLevels />
      </div>

      <h2 className="">Hola</h2>
    </div>
  );
};

export default SectionsDashboard;
