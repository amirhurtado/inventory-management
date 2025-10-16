"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const updateProductAction = async (formData: FormData) => {
  try {
    const user = await getCurrentUser();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const sku = formData.get("sku") as string | null;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const lowStockAt = formData.get("lowStockAt") as string;

    if (!id) {
      return { success: false, error: "ID del producto no encontrado." };
    }
    if (!name || name.length < 3) {
      return { success: false, error: "El nombre debe tener al menos 3 caracteres." };
    }

    const product = await prisma.product.findUnique({
      where: { id, userId: user.id },
    });

    if (!product) {
      return { success: false, error: "Producto no encontrado o no autorizado." };
    }

    const finalSku = sku === "" ? null : sku;

    await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        sku: finalSku,
        lowStockAt: lowStockAt ? parseInt(lowStockAt, 10) : null,
      },
    });

    return { success: true, message: "Producto actualizado correctamente." };

  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "No se pudo actualizar el producto." };
  }
};