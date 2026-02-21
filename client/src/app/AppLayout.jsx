import React from 'react'
import {Outlet} from "react-router-dom"
import {SidebarInset} from '@/components/ui/sidebar'
import AppSidebar from '@/components/layout/AppSidebar'
import Topbar from '@/components/layout/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'

const AppLayout = () => {
  return (
    <div className="min-h-screen flex ">
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="flex-1 p-2">
              <Outlet />
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AppLayout
