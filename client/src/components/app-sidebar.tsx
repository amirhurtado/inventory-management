import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarHeader className="mt-2 md:mt-4" >

        <Image src="/logo.png" width={50} height={50} alt="logo" />
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}