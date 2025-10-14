import {
  getLowStockAction,
  getRecentProductsAction,
  getTotalProductsAction,
} from "@/actions/products/getProduct";
import { getCurrentUser } from "@/lib/auth";
import React from "react";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const userId = user.id;

  const [responseCountTotalProducts, responseLowStock, responseRecentProducts] =
    await Promise.all([
      getTotalProductsAction(userId),
      getLowStockAction(userId),
      getRecentProductsAction(userId),
    ]);

  console.log(
    responseCountTotalProducts.countProducts,
    responseLowStock.lowStock,
    responseRecentProducts.recentProducts
  );

  return (
    <div className="flex max-h-svh overflow-y-auto">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Panel Principal</h1>
        <p className="font-poppins mt-2 text-gray-500">
          Bienvenido de nuevo! Aquí está una vista previa de tu inventario.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
