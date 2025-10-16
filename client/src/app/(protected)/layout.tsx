import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import TopBar from "@/components/TopBar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <div className="flex w-full max-h-dvh overflow-y-hidden">
        <AppSidebar />

        <main className="flex-1 flex flex-col">
          <div className="border-b flex items-center justify-between p-2 md:p-4">
            <SidebarTrigger />
            <TopBar />
          </div>

          <div className="flex flex-1 p-4 max-h-screen overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
