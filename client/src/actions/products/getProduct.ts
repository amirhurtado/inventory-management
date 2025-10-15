"use server";

import prisma from "@/lib/prisma";

export const getDashboardProductAction = async (userId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId,
      },
      select: {
        name: true,
        price: true,
        lowStockAt: true,
        quantity: true,
        createdAt: true,
      },
    });

    return { success: true, products };
  } catch {
    return { success: false };
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
