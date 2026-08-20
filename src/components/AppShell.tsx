import { Link } from "@tanstack/react-router";
import { Bell, CalendarDays, Home, ReceiptText, UtensilsCrossed } from "lucide-react";
import type { ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { notifications } from "@/lib/restaurant-data";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/calendar", label: "Events", icon: CalendarDays },
  { to: "/orders", label: "Orders", icon: ReceiptText },
  { to: "/notifications", label: "Alerts", icon: Bell },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { count } = useCart();
  const unread = notifications.filter((n) => n.unread).length;

  const badgeFor = (label: string) =>
    label === "Orders" ? count : label === "Alerts" ? unread : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 md:flex md:justify-between">
          <Link to="/" className="min-w-0">
            <span className="font-serif text-2xl font-semibold tracking-tight text-primary">Italiano</span>
            <span className="ml-2 hidden text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:inline">
              Ristorante · Dal 1984
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                activeProps={{ className: "bg-secondary text-primary" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
              >
                {label}
                {badgeFor(label) > 0 && (
                  <span className="ml-2 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {badgeFor(label)}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            JD
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-32 pt-8 md:pb-16">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <span className="relative grid size-7 place-items-center">
                <Icon className="size-5" strokeWidth={1.75} />
                {badgeFor(label) > 0 && (
                  <span className="absolute -right-1.5 -top-1 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                    {badgeFor(label)}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
