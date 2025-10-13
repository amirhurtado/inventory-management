import { ModeToggle } from "@/components/theme/ModeToggle";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh w-screen flex flex-col  p-2 md:p-8 relative">
      <div className=" w-full flex   justify-between   items-start">
        <div>
          <Image src={"/logo.png"} alt="logo" width={90} height={90} />
        </div>

        <div className="flex gap-2">
          <ModeToggle />

          <Link
            href={"https://github.com/amirhurtado"}
            className="border-1 gap-2 border-gray-300 dark:border-gray-700 rounded-lg flex justify-center items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ease-in "
          >
            <p className="text-sm">Amir Hurtado</p>
            <Github strokeWidth={1} size={19.5} />
          </Link>
        </div>
      </div>

      <div className="flex justify-between ">
        <div className="w-full md:w-1/2 flex items-center justify-center ">{children}</div>

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
