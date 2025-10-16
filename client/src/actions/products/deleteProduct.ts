"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const deleteProductAction = async (productId: string) => {
  try {
    const user = await getCurrentUser();

    // Verificamos que el producto exista y pertenezca al usuario.
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        userId: user.id,
      },
    });

    if (!product) {
      return { success: false, error: "Producto no encontrado o no autorizado." };
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    // ¡Quitamos revalidatePath! La UI se actualizará via TanStack Query.
    return { success: true, message: "Producto eliminado correctamente." };
    
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "No se pudo eliminar el producto." };
  }
};