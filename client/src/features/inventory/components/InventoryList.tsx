"use client";

import { deleteProductAction } from "@/actions/products/deleteProduct";
import { getInventoryProductsAction } from "@/actions/products/getProduct";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { InventorySkeleton } from "./InventorySkeleton";
import { ProductCard } from "./ProductCard";
import { toast } from "sonner"; 
import { Product } from "@/types";


interface InventoryListProps {
  initialProducts: Product[];
}

const InventoryList = ({ initialProducts }: InventoryListProps) => {
  const queryClient = useQueryClient();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { data: products, isLoading, isError, error: queryError } = useQuery({
    queryKey: ["inventoryProducts"],
    queryFn: async () => JSON.parse(JSON.stringify(await getInventoryProductsAction())),
    initialData: initialProducts,
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: deleteProductAction,
    onSuccess: (data) => {
      setProductToDelete(null);
      if (data.success) {
        toast.success("¡Éxito!", {
          description: data.message,
        });
        queryClient.invalidateQueries({ queryKey: ["inventoryProducts"] });
        queryClient.invalidateQueries({ queryKey: ["dashboardProducts"] });
      } else {
        toast.error("Error", {
          description: data.error || "Ocurrió un error desconocido.",
        });
      }
    },
    onError: (error) => {
      setProductToDelete(null);
      toast.error("Error de red", {
        description: error.message,
      });
    },
  });


  if (isLoading && !initialProducts) return <InventorySkeleton />;

  if (isError) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error de Carga</AlertTitle>
        <AlertDescription>
          {queryError instanceof Error ? queryError.message : "No se pudieron cargar los productos."}
        </AlertDescription>
      </Alert>
    );
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8 py-12">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">No tienes productos</h3>
          <p className="text-sm text-muted-foreground">Empieza añadiendo tu primer producto para verlo aquí.</p>
          <Button asChild className="mt-4"><Link href="/add-product">Añadir Producto</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product : Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => alert(`Editando: ${product.name}`)}
            onDelete={() => setProductToDelete(product)}
          />
        ))}
      </div>

      {productToDelete && (
        <DeleteConfirmationDialog
          isOpen={!!productToDelete}
          onClose={() => setProductToDelete(null)}
          onConfirm={() => deleteProduct(productToDelete.id)}
          productName={productToDelete.name}
          isPending={isDeleting}
        />
      )}
    </>
  );
};

export default InventoryList;