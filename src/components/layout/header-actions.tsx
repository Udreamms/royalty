
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle"; // Importamos el nuevo componente

const headerLinks = [
  { href: "/#", label: "Docs" },
  { href: "/#", label: "Support" },
  { href: "/#", label: "Console" },
];

export function HeaderActions() {
  return (
    <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
      {headerLinks.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          className="hover:text-foreground transition-colors"
          legacyBehavior>
          {label}
        </Link>
      ))}
      <ThemeToggle />
    </div>
  );
}
