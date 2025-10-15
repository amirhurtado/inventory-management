import { getInventoryProductsAction } from "@/actions/products/getProduct";
import HeaderInventory from "@/features/inventory/components/Header";
import InventoryList from "@/features/inventory/components/InventoryList";
import { getCurrentUser } from "@/lib/auth";
import React from "react";

const InventoryPage = async () => {
  const user = await getCurrentUser();
  const { success, products } = await getInventoryProductsAction(user.id);

  if (!success) {
      throw new Error( "No se pudieron cargar los productos.");
  }

  return (
    <div className="flex flex-col w-full overflow-y-auto md:max-h-dvh gap-4 md:gap-8 p-2">
      <HeaderInventory />
      <InventoryList products={products || []} />
    </div>
  );
};

export default InventoryPage;