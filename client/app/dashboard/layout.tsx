import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { type DashboardLayoutProps } from "@/types/dashboard.types";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const supabase = await createClient();
  const { data: authUser } = await supabase.auth.getUser();
  if (!authUser.user) redirect("/auth/login");

  const { data: userProfile } = await supabase
    .from("users")
    .select("full_name, email")
    .eq("id", authUser.user.id)
    .single();
  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          full_name: userProfile?.full_name ?? authUser.user.email,
          email: userProfile?.email ?? authUser.user.email,
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 ml-10 md:ml-60 lg:ml-80 p-4 pt-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
