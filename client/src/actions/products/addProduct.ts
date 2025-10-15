"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addProductAction = async (formData: FormData) => {
  const user = await getCurrentUser();

  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string | null;
  const price = formData.get("price") as string;
  const quantity = formData.get("quantity") as string;
  const lowStockAt = formData.get("lowStockAt") as string;

  // Validación básica en el servidor
  if (!name || name.length < 3) {
    return { error: "El nombre debe tener al menos 3 caracteres." };
  }
  if (!price || isNaN(parseFloat(price))) {
    return { error: "El precio es inválido." };
  }
  if (!quantity || isNaN(parseInt(quantity, 10))) {
    return { error: "La cantidad es inválida." };
  }

  try {
    // Si el SKU es un string vacío, lo convertimos a null para la base de datos
    const finalSku = sku === "" ? null : sku;

    // Verificamos si ya existe un producto con ese SKU si no es nulo
    if (finalSku) {
      const existingProduct = await prisma.product.findUnique({
        where: { sku: finalSku },
      });

      if (existingProduct) {
        return { error: "Ya existe un producto con este SKU." };
      }
    }

    await prisma.product.create({
      data: {
        userId: user.id,
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        sku: finalSku,
        lowStockAt: lowStockAt ? parseInt(lowStockAt, 10) : null,
      },
    });

    revalidatePath("/inventory");
    revalidatePath("/dashboard");
    return { success: "¡Producto añadido!" };
  } catch (error) {
    console.error(error);
    return { error: "No se pudo crear el producto. Intenta de nuevo." };
  }
};