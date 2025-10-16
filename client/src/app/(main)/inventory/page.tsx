import { getInventoryProductsAction } from "@/actions/products/getProduct";
import HeaderInventory from "@/features/inventory/components/Header";
import InventoryList from "@/features/inventory/components/InventoryList";
import React from "react";

const InventoryPage = async () => {
  let initialProducts;
  try {
    // 1. Obtenemos los productos
    const productsFromDb = await getInventoryProductsAction();

    // 2. Serializamos los datos para el cliente
    initialProducts = JSON.parse(JSON.stringify(productsFromDb));

  } catch {
        throw new Error("No se pudieron cargar los productos.");
  }

  return (
    <div className="flex flex-col w-full overflow-y-auto md:max-h-dvh gap-4 md:gap-8 p-2">
      <HeaderInventory />
      <InventoryList initialProducts={initialProducts} />
    </div>
  );
};

export default InventoryPage;