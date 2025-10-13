import TopBar from "@/components/TopBar";

import Image from "next/image";

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh w-screen flex flex-col  p-2 md:p-8 relative">
      <div className=" w-full flex   justify-between   items-start">
        <div>
          <Image src={"/logo.png"} alt="logo" width={80} height={80} />
        </div>

        <TopBar />
      </div>

      <div className="flex justify-between ">
        <div className="w-full md:w-1/2 flex items-center justify-center ">
          {children}
        </div>

        <div className="w-1/2 hidden md:flex  justify-center ">
          <Image
            src={"/sign-img.svg"}
            alt="sign-img"
            width={400}
            height={300}
            className="object-cover w-1/2 "
          />
        </div>
      </div>
    </div>
  );
};

export default layout;
