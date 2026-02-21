import { SidebarTrigger } from "../ui/sidebar";

export default function Topbar() {
  return (
    <header className="h-14 border-b flex items-center px-6 sticky top-0 bg-background" >
      <SidebarTrigger className="ml-1" />
      <div className="ml-auto text-sm text-muted-foreground">
        Welcome 👋
      </div>
    </header>
  );
}
