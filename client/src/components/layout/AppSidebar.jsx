import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText } from "lucide-react";
import { BusinessSwitcher } from "./business-switcher";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import  NavMain  from "./nav-main";
import { NavUser } from "./nav-user";

const versions = [1,2,3]
const sidebarItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Transactions",
    icon: FileText,
    href: "/transactions",
  },
  {
    label: "Invoices",
    icon: FileText,
    href: "/invoices",
  },
  {
    label: "Customers",
    icon: FileText,
    href: "/customers",
  },

]
const user = {
  name: "John Doe",
  email: "BxGQK@example.com",
  avatar: "https://github.com/vercel.png",
}

export default function AppSidebar({...props}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <BusinessSwitcher versions={versions} defaultVersion={versions[0]}/>
      </SidebarHeader>    
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent> 
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
