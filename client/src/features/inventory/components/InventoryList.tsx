"use client";

import { deleteProductAction } from "@/actions/products/deleteProduct";
import { getInventoryProductsAction } from "@/actions/products/getProduct";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Pencil, Terminal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { InventorySkeleton } from "./InventorySkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


type Product = {
  id: string;
  name: string;
  sku: string | null;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  lowStockAt: number | null;
};

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
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["inventoryProducts"] });
        queryClient.invalidateQueries({ queryKey: ["dashboardProducts"] });
      } else {
        alert(`Error: ${data.error || "Ocurrió un error desconocido."}`);
      }
      setProductToDelete(null);
    },
    onError: (error) => {
      alert(`Error al eliminar: ${error.message}`);
      setProductToDelete(null);
    },
  });

  if (isLoading && !initialProducts) {
    return <InventorySkeleton />;
  }

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
          <p className="text-sm text-muted-foreground">
            Empieza añadiendo tu primer producto para verlo aquí.
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-product">Añadir Producto</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product : Product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => alert('Función de editar pendiente')}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onClick={() => setProductToDelete(product)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-2xl font-bold">${Number(product.price).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {product.quantity} unidades en stock
              </p>
              {product.sku && (
                <p className="text-xs text-muted-foreground mt-2">SKU: {product.sku}</p>
              )}
            </CardContent>
            <CardFooter>
              {product.lowStockAt != null && product.quantity <= product.lowStockAt ? (
                  <Badge variant="destructive">Bajo stock</Badge>
                ) : (
                  <Badge variant="secondary">En stock</Badge>
                )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!productToDelete} onOpenChange={(isOpen) => !isOpen && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el producto <span className="font-semibold">{productToDelete?.name}</span> de tus registros.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (productToDelete) {
                  deleteProduct(productToDelete.id);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Sí, eliminar producto"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InventoryList;