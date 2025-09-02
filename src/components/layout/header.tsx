
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { HeaderActions } from "./header-actions"; // Importamos el nuevo componente

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden md:block group-data-[state=collapsed]:hidden">
       <Link href="/dashboard" legacyBehavior>
         <Logo className="h-7" />
       </Link>
     </div>
      <div className="ml-auto flex items-center gap-4">
        <HeaderActions /> {/* Añadimos la barra de acciones */}
        <div className="w-px h-6 bg-border" /> {/* Separador visual */}
        <UserNav />
      </div>
    </header>
  );
}
