import {
  getDashboardProductAction,
  getLowStockAction,
  getRecentProductsAction,
} from "@/actions/products/getProduct";
import { getCurrentUser } from "@/lib/auth";
import React from "react";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const userId = user.id;

  const [responseGetProducts, responseLowStock, responseRecentProducts] =
    await Promise.all([
      getDashboardProductAction(userId),
      getLowStockAction(userId),
      getRecentProductsAction(userId),
    ]);

  console.log(
    responseGetProducts.products,
    responseLowStock.lowStock,
    responseRecentProducts.recentProducts
  );

  const totalPrice = responseGetProducts.products?.reduce((total, product) => total + (Number(product.price) * product.quantity), 0)

  console.log(totalPrice)

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
