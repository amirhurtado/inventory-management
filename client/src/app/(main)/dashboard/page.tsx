import { getDashboardProductAction } from "@/actions/products/getProduct";
import HeaderDashBoard from "@/features/dashboard/components/Header";
import SectionsDashboard from "@/features/dashboard/components/Sections";
import React from "react";
import { productsDashboardType } from "@/types";

const DashboardPage = async () => {
  let initialProducts: productsDashboardType;

  try {
    const productsFromDb = await getDashboardProductAction();

    initialProducts = JSON.parse(JSON.stringify(productsFromDb));
  } catch {
    throw new Error("No se pudieron cargar los productos.");
  }

  return (
    <div className="flex flex-col w-full overflow-y-auto md:max-h-dvh gap-4 md:gap-8 p-2">
      <HeaderDashBoard />
      <SectionsDashboard initialProducts={initialProducts} />
    </div>
  );
};

export default DashboardPage;
