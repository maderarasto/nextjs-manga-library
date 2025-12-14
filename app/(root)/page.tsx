import LeftPanel from "@/components/sidebar/LeftPanel";
import {SidebarProvider} from "@/components/ui/sidebar";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <SidebarProvider>
      <LeftPanel />
      <main className="w-full">
        <Topbar />
        <div className="p-4">
          <h1>Hello</h1>
        </div>
      </main>
    </SidebarProvider>
  );
}
