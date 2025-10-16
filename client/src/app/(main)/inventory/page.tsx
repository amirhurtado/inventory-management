import { getInventoryProductsAction } from "@/actions/products/getProduct";
import HeaderInventory from "@/features/inventory/components/Header";
import InventoryList from "@/features/inventory/components/InventoryList";
import React from "react";

export const dynamic = "force-dynamic";


const InventoryPage = async () => {
  let initialProducts;
  try {
    const productsFromDb = await getInventoryProductsAction();

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