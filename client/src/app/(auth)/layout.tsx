import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh w-screen flex justify-center items-center p-2 md:p-8">
      <div className="w-1/2 flex justify-center">{children}</div>

      <Image
        src={"/sign-img.svg"}
        alt="sign-img"
        width={400}
        height={400}
        className="object-cover hidden md:block w-1/2"
      />
    </div>
  );
};

export default layout;
