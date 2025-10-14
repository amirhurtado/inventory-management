"use server";

import prisma from "@/lib/prisma";

export const getTotalProductsAction = async () => {
    try {

        const countProducts = await prisma.product.count();


        return countProducts

    } catch {
        throw new Error("Error al obtener productos");
    }
}