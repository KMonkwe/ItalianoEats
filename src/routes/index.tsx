import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { events, heroSpecialImage, menu } from "@/lib/restaurant-data";
import { OrderProgressCard } from "@/components/OrderTracker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Italiano Restaurant — Order, Track & Reserve" },
      {
        name: "description",
        content:
          "Order hand-rolled pasta and Tuscan classics from Italiano Restaurant, track your order live, and reserve a seat at our events.",
      },
      { property: "og:title", content: "Italiano Restaurant — Order, Track & Reserve" },
      {
        property: "og:description",
        content: "Chef's specials, live order tracking, and an events calendar from Italiano Restaurant.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { add, order } = useCart();
  const special = menu.find((m) => m.id === "tagliatelle")!;
  const classics = menu.filter((m) => m.id !== "tagliatelle").slice(0, 4);
  const upcoming = events.slice(0, 2);

  return (
    <div className="space-y-12">
      {order ? (
        <OrderProgressCard order={order} />
      ) : (
        <section className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-elegant">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-70">Benvenuti</p>
          <h1 className="max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
            Hand-rolled tradition, delivered warm to your table.
          </h1>
          <Link
            to="/menu"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Start an order <ArrowRight className="size-4" />
          </Link>
        </section>
      )}

      <section>
        <h2 className="eyebrow mb-6">Chef's specials</h2>
        <div className="group relative overflow-hidden rounded-3xl">
          <img
            src={heroSpecialImage}
            alt="Wild forest truffle tagliatelle plated in the dining room"
            width={1200}
            height={675}
            className="aspect-[3/4] w-full object-cover sm:aspect-[16/9] transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/90 to-transparent p-6 sm:p-8">
            <span className="mb-2 inline-block rounded-sm bg-primary px-2 py-1 text-[10px] uppercase tracking-tight text-primary-foreground">
              Limited supply
            </span>
            <h3 className="mb-2 font-serif text-2xl text-background sm:text-3xl">{special.name}</h3>
            <p className="max-w-md text-sm text-background/70">{special.description}</p>
            <button
              onClick={() => {
                add(special.id);
                toast.success(`${special.name} added to your order`);
              }}
              className="mt-6 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Add to order — ${special.price}
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="eyebrow">Events calendar</h2>
          <Link to="/calendar" className="text-sm font-semibold text-primary">
            View month
          </Link>
        </div>
        <div className="space-y-3">
          {upcoming.map((e) => (
            <article
              key={e.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
            >
              <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-accent/40">
                <span className="text-[10px] font-bold uppercase text-primary">
                  {new Date(e.date).toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="font-serif text-lg font-bold leading-none">{new Date(e.date).getDate()}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold">{e.title}</h3>
                <p className="truncate text-xs text-muted-foreground">{e.description}</p>
              </div>
              <Link
                to="/calendar"
                className="shrink-0 rounded-lg border border-input px-4 py-2 text-xs font-bold transition-colors hover:bg-secondary"
              >
                Book
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="eyebrow">The classics</h2>
          <Link to="/menu" className="text-sm font-semibold text-primary">
            Full menu
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {classics.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                width={512}
                height={512}
                className="size-24 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <h3 className="font-serif text-lg">{item.name}</h3>
                <p className="mb-2 text-xs text-muted-foreground">{item.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary">${item.price}</span>
                  <button
                    onClick={() => {
                      add(item.id);
                      toast.success(`${item.name} added to your order`);
                    }}
                    aria-label={`Add ${item.name}`}
                    className="grid size-7 place-items-center rounded-full border border-input transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
