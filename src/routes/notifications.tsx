import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CalendarDays, ReceiptText, Sparkles } from "lucide-react";
import { notifications as seed } from "@/lib/restaurant-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Italiano Restaurant" },
      {
        name: "description",
        content: "Order updates, reservation confirmations and new specials from Italiano Restaurant.",
      },
      { property: "og:title", content: "Notifications — Italiano Restaurant" },
      { property: "og:description", content: "Stay on top of your orders, bookings and seasonal specials." },
    ],
  }),
  component: NotificationsPage,
});

const iconFor = { order: ReceiptText, event: CalendarDays, special: Sparkles } as const;

function NotificationsPage() {
  const [items, setItems] = useState(seed);
  const unread = items.filter((n) => n.unread).length;

  return (
    <div className="space-y-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="font-serif text-3xl sm:text-4xl">Notifications</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {unread > 0 ? `${unread} unread update${unread > 1 ? "s" : ""}` : "You're all caught up."}
          </p>
        </div>
        <button
          onClick={() => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))}
          disabled={unread === 0}
          className="shrink-0 rounded-full border border-input px-4 py-2 text-xs font-bold transition-colors hover:bg-secondary disabled:opacity-40"
        >
          Mark all read
        </button>
      </header>

      <div className="divide-y divide-border rounded-2xl border border-border bg-card px-5 shadow-card">
        {items.map((n) => {
          const Icon = iconFor[n.kind] ?? Bell;
          return (
            <button
              key={n.id}
              onClick={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
              className="flex w-full items-start gap-4 py-4 text-left"
            >
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full ${
                  n.unread ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                }`}
              >
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className={`truncate text-sm ${n.unread ? "font-semibold" : "font-medium"}`}>{n.title}</span>
                  {n.unread && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{n.body}</span>
              </span>
              <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">{n.time}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
