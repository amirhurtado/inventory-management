"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { navBar } from "@/constants";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="mt-2 md:mt-4">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col justify-between h-dvh">
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase mt-2">
              <h2>Principal</h2>
            </SidebarGroupLabel>

            <SidebarGroupContent className="flex flex-col gap-2 pl-2 mt-2">
              {navBar.map((item, i) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    href={item.href}
                    key={i}
                    className={`flex gap-4 px-2 py-3 transition-all rounded-lg hover:scale-[0.98] ease-in-out duration-200 ${
                      isActive
                        ? "bg-primary text-white  "
                        : "hover:bg-accent text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    <Icon strokeWidth={1} size={22} />
                    <p className="text-md">{item.name}</p>
                  </Link>
                );
              })}
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="flex flex-col pl-2">
            <SidebarGroupLabel className="uppercase mt-2">
              <h2>Mi perfil</h2>
            </SidebarGroupLabel>

            <div className="pl-2 mt-2" >

            <UserButton showUserInfo/>


            </div>

          </div>
        </div>

        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
