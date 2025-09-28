import { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";

export interface DashboardLayoutProps {
  children: ReactNode;
}

interface User {
  full_name: string;
  email: string;
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}
