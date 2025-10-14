"use server";

import prisma from "@/lib/prisma";

export const getTotalProductsAction = async (userId: string) => {
  try {
    const countProducts = await prisma.product.count({
      where: {
        userId,
      },
    });

    

    return { success: true, countProducts };
  } catch {
    return { success: false };
  }
};

export const getLowStockAction = async (userId: string) => {
  try {
    const lowStock = await prisma.product.findMany({
      where: {
        userId,
      },
    });

    return { success: true, lowStock };
  } catch {
    return { success: false };
  }
};


export const getRecentProductsAction = async (userId: string) => {
    try{
        const recentProducts = await prisma.product.findMany({
            where: {
                userId,
            },
            take: 5,
            orderBy: {
                createdAt: "desc"
            }
        })

        return { success: true, recentProducts}

    }catch{
        return { success: false };

    }
}