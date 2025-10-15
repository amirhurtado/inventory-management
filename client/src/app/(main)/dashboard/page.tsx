import {
  getDashboardProductAction,
  getLowStockAction,
  getRecentProductsAction,
} from "@/actions/products/getProduct";
import HeaderDashBoard from "@/features/dashboard/components/Header";
import SectionsDashboard from "@/features/dashboard/components/Sections";
import { getCurrentUser } from "@/lib/auth";
import React from "react";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const userId = user.id;

  const [responseGetProducts, responseLowStock, responseRecentProducts] =
    await Promise.all([
      getDashboardProductAction(userId),
      getLowStockAction(userId),
      getRecentProductsAction(userId),
    ]);

 
    if(!responseGetProducts.success || !responseLowStock.success || !responseRecentProducts.success){
      return <p>Error inesperado</p>
    }

  const totalPrice = responseGetProducts.products?.reduce(
    (total, product) => total + Number(product.price) * product.quantity,
    0
  );


  return (
    <div className="flex flex-col  gap-4 md:gap-8 max-h-svh w-full overflow-y-auto p-2 ">
      <HeaderDashBoard />
      <SectionsDashboard dataSections={{
        totalProducts: responseGetProducts.products!.length,
        totalPrice: totalPrice!,
        lowStock: responseLowStock.lowStock!.length

      }}/>
    </div>
  );
};

export default DashboardPage;
