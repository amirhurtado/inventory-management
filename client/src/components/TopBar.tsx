import React from "react";
import { ModeToggle } from "./theme/ModeToggle";
import { Github } from "lucide-react";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="flex gap-2">
      <ModeToggle />

      <Link
        href={"https://github.com/amirhurtado"}
        className="border-1 gap-2 border-gray-300 dark:border-gray-700 rounded-lg flex justify-center items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ease-in "
      >
        <p className="text-sm hidden md:block">Amir Hurtado</p>
        <Github strokeWidth={1} size={19.5} />
      </Link>
    </div>
  );
};

export default TopBar;
