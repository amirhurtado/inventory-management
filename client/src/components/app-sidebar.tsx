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
import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mt-2 md:mt-4">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase mt-2">
            <h2>Principal</h2>
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex flex-col gap-2 pl-2 mt-2  ">
            {navBar.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={i} className="flex gap-4 px-2 py-3 transition-colors hover:bg-accent rounded-lg">
                  <Icon strokeWidth={1} size={22} />
                  <p className="text-md text-gray-800 dark:text-gray-300">
                    {item.name}
                  </p>
                </Link>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
