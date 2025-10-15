"use client";

import { addProductAction } from "@/actions/products/addProduct";
import { useState, useTransition, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddProductForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await addProductAction(formData);
      if (result.error) {
        setError(result.error);
        setSuccess(undefined);
      }
      if (result.success) {
        setSuccess(result.success);
        setError(undefined);
        formRef.current?.reset();
      }
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-12 border-1 rounded-lg p-6 w-full max-w-2xl mx-auto shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-medium">Nombre del producto</label>
          <Input id="name" name="name" placeholder="Ej: Teclado mecánico" className="placeholder:text-sm md:placeholder:text-md" required minLength={3} />
        </div>
        <div className="flex flex-col gap-2">
           <label htmlFor="sku" className="text-xs font-medium">SKU (Opcional)</label>
          <Input id="sku" name="sku" className="placeholder:text-sm md:placeholder:text-md" placeholder="Ej: PROD-015" />
        </div>
        <div className="flex flex-col gap-2">
           <label htmlFor="price" className="text-xs font-medium">Precio</label>
          <Input id="price" name="price" className="placeholder:text-sm md:placeholder:text-md" type="number" step="0.01" placeholder="0.00" required />
        </div>
        <div className="flex flex-col gap-2">
           <label htmlFor="quantity" className="text-xs font-medium">Cantidad</label>
          <Input id="quantity" name="quantity" className="placeholder:text-sm md:placeholder:text-md" type="number" placeholder="0" required />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
           <label htmlFor="lowStockAt" className="text-xs font-medium">Notificar inventario bajo en (Opcional)</label>
          <Input id="lowStockAt" name="lowStockAt" className="placeholder:text-sm md:placeholder:text-md" type="number" placeholder="Ej: 5" />
        </div>
      </div>

        {error && <p className="text-xs font-medium text-destructive bg-destructive/10 p-3 rounded-md text-center">{error}</p>}
        {success && <p className="text-xs font-medium text-primary bg-primary/10 p-3 rounded-md text-center">{success}</p>}

      <Button type="submit" className="w-full text-white cursor-pointer" disabled={isPending}>
        {isPending ? "Añadiendo..." : "Añadir Producto"}
      </Button>
    </form>
  );
};

export default AddProductForm;