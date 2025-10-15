import { getInventoryProductsAction } from "@/actions/products/getProduct";
import HeaderInventory from "@/features/inventory/components/Header";
import InventoryList from "@/features/inventory/components/InventoryList";
import { getCurrentUser } from "@/lib/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import React from "react";

const InventoryPage = async () => {
  const user = await getCurrentUser();
  const { success, products, error } = await getInventoryProductsAction(user.id);

  if (!success) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || "No se pudieron cargar los productos. Intenta de nuevo más tarde."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col w-full overflow-y-auto md:max-h-dvh gap-4 md:gap-8 p-2">
      <HeaderInventory />
      <InventoryList products={products || []} />
    </div>
  );
};

export default InventoryPage;