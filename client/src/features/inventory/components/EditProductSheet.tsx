"use client";

import { updateProductAction } from "@/actions/products/updateProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  sku: string | null;
  price: number;
  quantity: number;
  lowStockAt: number | null;
};

interface EditProductSheetProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; 
}

export const EditProductSheet = ({ product, isOpen, onClose, onSuccess }: EditProductSheetProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  if (!product) return null;

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateProductAction(formData);

      if (result.success) {
        toast.success("Producto Actualizado", {
          description: `El producto "${product.name}" ha sido actualizado.`,
        });
        onSuccess();
      } else {
        toast.error("Error al actualizar", {
          description: result.error || "Ocurrió un error desconocido.",
        });
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Producto</SheetTitle>
          <SheetDescription>
            Realiza cambios en tu producto aquí. Haz clic en guardar cuando termines.
          </SheetDescription>
        </SheetHeader>
        <form
          ref={formRef}
          action={handleSubmit}
          className="space-y-4 p-4"
        >
          <input type="hidden" name="id" value={product.id} />
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del producto</Label>
            <Input id="name" name="name" defaultValue={product.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">SKU (Opcional)</Label>
            <Input id="sku" name="sku" defaultValue={product.sku ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Precio</Label>
            <Input id="price" name="price" type="number" step="0.01" defaultValue={product.price} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input id="quantity" name="quantity" type="number" defaultValue={product.quantity} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lowStockAt">Notificar inventario bajo en (Opcional)</Label>
            <Input id="lowStockAt" name="lowStockAt" type="number" defaultValue={product.lowStockAt ?? ""} />
          </div>

          <SheetFooter className="mt-6">
            <SheetClose asChild>
              <Button type="button" variant="secondary" className="bg-red-400">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isPending} className="text-white">
              {isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};