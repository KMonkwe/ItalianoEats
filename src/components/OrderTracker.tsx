import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { orderStages, type MenuItem } from "@/lib/restaurant-data";
import { menu } from "@/lib/restaurant-data";
import type { PlacedOrder } from "@/lib/cart";

const STAGE_MS = 45_000;

export function useOrderStage(order: PlacedOrder | null) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(t);
  }, []);

  if (!order) return { stage: 0, etaMinutes: 0, done: false };
  const elapsed = now - order.placedAt;
  const stage = Math.min(Math.floor(elapsed / STAGE_MS), orderStages.length - 1);
  const remaining = Math.max(orderStages.length * STAGE_MS - elapsed, 0);
  return {
    stage,
    etaMinutes: Math.max(1, Math.ceil(remaining / 60_000)),
    done: remaining === 0,
  };
}

export function OrderProgressCard({ order }: { order: PlacedOrder }) {
  const { stage, etaMinutes, done } = useOrderStage(order);

  return (
    <section className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-elegant">
      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] opacity-70">Current order</p>
          <h2 className="font-serif text-2xl">
            {done ? "Delivered — buon appetito" : `Arriving in ${etaMinutes} min`}
          </h2>
        </div>
        <div className="shrink-0 rounded-full bg-primary-foreground/20 px-3 py-1 text-xs">#{order.reference}</div>
      </div>
      <div className="mb-3 flex gap-2">
        {orderStages.map((s, i) => (
          <div
            key={s.label}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i <= stage ? "bg-primary-foreground" : "bg-primary-foreground/30"
            }`}
          />
        ))}
      </div>
      <p className="text-sm opacity-80">{orderStages[stage]?.detail}</p>
    </section>
  );
}

export function OrderStepper({ order }: { order: PlacedOrder }) {
  const { stage } = useOrderStage(order);

  return (
    <ol className="relative space-y-7 border-l border-border pl-8">
      {orderStages.map((s, i) => {
        const complete = i < stage;
        const active = i === stage;
        return (
          <li key={s.label} className="relative">
            <span
              className={`absolute -left-[41px] grid size-5 place-items-center rounded-full ring-4 ring-background ${
                complete ? "bg-success" : active ? "bg-primary" : "bg-border"
              }`}
            >
              {complete && <Check className="size-3 text-primary-foreground" strokeWidth={3} />}
            </span>
            <p className={`text-sm font-semibold ${active ? "text-primary" : complete ? "" : "text-muted-foreground"}`}>
              {s.label}
            </p>
            <p className="text-xs text-muted-foreground">{s.detail}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function orderItems(order: PlacedOrder): { item: MenuItem; qty: number }[] {
  return order.lines.flatMap((l) => {
    const item = menu.find((m) => m.id === l.id);
    return item ? [{ item, qty: l.qty }] : [];
  });
}
