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
    (product) => product.lowStockAt && product.lowStockAt <= product.quantity
  ).length;

  const dataStockLevels = dataSections.products.map((product) => ({
    name: product.name,
    quantity: product.quantity,
    isLowStock: product.lowStockAt
      ? product.quantity <= product.lowStockAt
      : false,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  overflow-y-scroll md:max-h-dvh md:overflow-hidden    w-full gap-4  ">
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

      <h2 className="">Hola</h2>
    </div>
  );
};

export default SectionsDashboard;
