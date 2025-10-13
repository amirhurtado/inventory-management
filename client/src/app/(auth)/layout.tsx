import { ModeToggle } from "@/components/theme/ModeToggle";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh w-screen flex justify-center items-center p-2 md:p-8 relative">
      <div className="absolute top-8 right-8 flex gap-2 items-center">
        <ModeToggle />

        <Link href={"https://github.com/amirhurtado"} className="border-1 border-gray-300 dark:border-gray-700 rounded-lg flex justify-center items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ease-in ">
          <Github strokeWidth={1} size={19.5} />
        </Link>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">{children}</div>

      <Image
        src={"/sign-img.svg"}
        alt="sign-img"
        width={400}
        height={300}
        className="object-cover hidden md:block w-1/3 p-6"
      />
    </div>
  );
};

export default layout;
