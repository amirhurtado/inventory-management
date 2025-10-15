import {
  getDashboardProductAction,
  getRecentProductsAction,
} from "@/actions/products/getProduct";
import HeaderDashBoard from "@/features/dashboard/components/Header";
import SectionsDashboard from "@/features/dashboard/components/Sections";
import { getCurrentUser } from "@/lib/auth";
import React from "react";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const userId = user.id;

  const [responseGetProducts, responseRecentProducts] =
    await Promise.all([
      getDashboardProductAction(userId),
      getRecentProductsAction(userId),
    ]);

 
    if(!responseGetProducts.success  || !responseRecentProducts.success){
      return <p>Error inesperado</p>
    }

  


  return (
    <div className="flex flex-col  gap-4 md:gap-8 max-h-svh w-full overflow-y-auto p-2 ">
      <HeaderDashBoard />
      <SectionsDashboard dataSections={{
        products: responseGetProducts.products!,

      }}/>
    </div>
  );
};

export default DashboardPage;
