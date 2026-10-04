import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Quotations" },
  { to: "/attendance", label: "Attendance" },
  { to: "/employees", label: "Employee Directory" },
] as const;

export function AppHeader({ subtitle }: { subtitle: string }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="no-print border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center gap-x-4 px-4 sm:px-6 py-3">
        {/* Brand */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border-b-4 border-highlight bg-primary-foreground font-extrabold text-primary">AE</div>
          <div className="min-w-0">
            <div className="truncate text-lg font-bold leading-tight">Aayush Elevator</div>
            <div className="truncate text-xs opacity-75">{subtitle}</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: true }}
              className="rounded-md px-3 py-1.5 text-sm font-medium opacity-80 hover:bg-primary-foreground/10 hover:opacity-100"
              activeProps={{ className: "bg-primary-foreground/15 opacity-100" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex h-10 w-10 items-center justify-center rounded-md hover:bg-primary-foreground/10"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          onClick={() => setNavOpen((o) => !o)}
        >
          {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown nav */}
      {navOpen && (
        <nav className="sm:hidden border-t border-primary-foreground/10 bg-primary px-4 py-2 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="block rounded-md px-3 py-2.5 text-sm font-medium opacity-80 hover:bg-primary-foreground/10 hover:opacity-100"
              activeProps={{ className: "bg-primary-foreground/15 opacity-100" }}
              onClick={() => setNavOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
