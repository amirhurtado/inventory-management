"use server";

import prisma from "@/lib/prisma";

export const getDashboardProductAction = async (userId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId,
      },
      select: {
        price: true,
        quantity: true,
        createdAt: true,
      },
    });

    return { success: true, products };
  } catch {
    return { success: false };
  }
};

export const getLowStockAction = async (userId: string) => {
  try {
    const lowStock = await prisma.product.findMany({
      where: {
        userId,
        lowStockAt: {not : null},
      },
    });

    const lowStockFilter = lowStock.filter((product) => product.quantity <= product.lowStockAt!)

    return { success: true, lowStock: lowStockFilter };
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
