import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { categories, menu } from "@/lib/restaurant-data";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu & Ordering — Italiano Restaurant" },
      {
        name: "description",
        content: "Browse antipasti, primi, secondi and dolci from Italiano Restaurant and build your order.",
      },
      { property: "og:title", content: "Menu & Ordering — Italiano Restaurant" },
      { property: "og:description", content: "Build your order from our Tuscan kitchen, course by course." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { add, remove, lines, detailed, total, count, placeOrder } = useCart();
  const [filter, setFilter] = useState<string>("All");
  const navigate = useNavigate();

  const visible = filter === "All" ? menu : menu.filter((m) => m.category === filter);
  const qtyOf = (id: string) => lines.find((l) => l.id === id)?.qty ?? 0;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl sm:text-4xl">La Carta</h1>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Everything is made to order. Add dishes and send them straight to Chef Marco's pass.
        </p>
      </header>

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === c
                ? "bg-primary text-primary-foreground"
                : "border border-input text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((item) => (
          <article
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              width={512}
              height={512}
              className="size-20 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-serif text-lg">{item.name}</h2>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <span className="mt-1 inline-block text-sm font-bold text-primary">${item.price}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {qtyOf(item.id) > 0 && (
                <>
                  <button
                    onClick={() => remove(item.id)}
                    aria-label={`Remove one ${item.name}`}
                    className="grid size-8 place-items-center rounded-full border border-input transition-colors hover:bg-secondary"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold">{qtyOf(item.id)}</span>
                </>
              )}
              <button
                onClick={() => add(item.id)}
                aria-label={`Add ${item.name}`}
                className="grid size-8 place-items-center rounded-full border border-input transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {count > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="eyebrow mb-4">Your order</h2>
          <ul className="divide-y divide-border">
            {detailed.map(({ item, qty }) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="min-w-0 truncate">
                  {qty} × {item.name}
                </span>
                <span className="shrink-0 font-medium">${item.price * qty}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="font-serif text-lg">Total</span>
            <span className="text-lg font-bold text-primary">${total}</span>
          </div>
          <button
            onClick={() => {
              const placed = placeOrder();
              if (placed) {
                toast.success(`Order #${placed.reference} sent to the kitchen`);
                navigate({ to: "/orders" });
              }
            }}
            className="mt-5 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Place order
          </button>
        </section>
      )}
    </div>
  );
}
