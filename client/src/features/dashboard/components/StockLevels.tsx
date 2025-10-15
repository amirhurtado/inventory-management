import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

interface StockLevelsInterface {
  products: {
    name: string;
    quantity: number;
    isLowStock: boolean;
  }[];
}

const StockLevels = ({ products }: StockLevelsInterface) => {
  return (
    <div className="border-1 flex flex-col flex-1  max-h-[30rem]  md:max-h-dvh overflow-y-auto  rounded-lg px-3 py-6   gap-5  ">
      <h2 className="">Niveles de existencias </h2>

      <div className="flex flex-col gap-3 w-full ">
        {products.map((product, index) => (
          <div
            className="w-full flex justify-between font-poppins  p-3 bg-accent rounded-lg "
            key={index}
          >
            <div className="flex gap-2 items-center">

              <div className="rounded-full">
                 {product.isLowStock ? <TrendingDown size={18} className="text-red-400" />: <TrendingUp size={18} className="text-green-400" />}
              </div>
             
              <p className="text-sm md:text-md">{product.name}</p>
            </div>

            <p className="text-xs md:text-md">
              {product.quantity}{" "}
              {product.quantity === 1 ? "Unidad" : "Unidades"}
            </p>
          </div>
        ))}


      

  
      </div>
    </div>
  );
};

export default StockLevels;
