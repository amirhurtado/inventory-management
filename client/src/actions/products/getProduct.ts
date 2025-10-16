"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const getDashboardProductAction = async () => {
  try {
    const user = await getCurrentUser();
    const products = await prisma.product.findMany({
      where: {
        userId: user.id,
      },
      select: {
        name: true,
        price: true,
        lowStockAt: true,
        quantity: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching dashboard products:", error);
    throw new Error("No se pudieron obtener los productos del dashboard.");
  }
};


export const getInventoryProductsAction = async () => {
  try {
    const user = await getCurrentUser();
    const products = await prisma.product.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching inventory products:", error);
    throw new Error("No se pudieron obtener los productos del inventario.");
  }
};




export const getRecentProductsAction = async (userId: string) => {
  try {
    const recentProducts = await prisma.product.findMany({
      where: {
        userId,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, recentProducts };
  } catch {
    return { success: false };
  }
};




