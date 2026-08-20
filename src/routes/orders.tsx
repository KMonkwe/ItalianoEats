import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { OrderProgressCard, OrderStepper, orderItems } from "@/components/OrderTracker";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Order Tracking — Italiano Restaurant" },
      {
        name: "description",
        content: "Follow your Italiano Restaurant order from the kitchen pass to your door, stage by stage.",
      },
      { property: "og:title", content: "Order Tracking — Italiano Restaurant" },
      { property: "og:description", content: "Live status for your Italiano Restaurant order." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { order } = useCart();

  if (!order) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-card">
        <h1 className="font-serif text-2xl">No active order</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Once you place an order you'll be able to follow every stage here, from the pass to your door.
        </p>
        <Link
          to="/menu"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  const items = orderItems(order);

  return (
    <div className="space-y-10">
      <h1 className="font-serif text-3xl sm:text-4xl">Order tracking</h1>

      <OrderProgressCard order={order} />

      <section className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="eyebrow mb-6">Progress</h2>
          <OrderStepper order={order} />
        </div>

        <div>
          <h2 className="eyebrow mb-6">Order #{order.reference}</h2>
          <ul className="divide-y divide-border rounded-xl border border-border bg-card px-5 shadow-card">
            {items.map(({ item, qty }) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="size-12 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1 truncate text-sm">
                  {qty} × {item.name}
                </span>
                <span className="shrink-0 text-sm font-medium">${item.price * qty}</span>
              </li>
            ))}
            <li className="flex items-baseline justify-between py-4">
              <span className="font-serif text-lg">Total</span>
              <span className="text-lg font-bold text-primary">${order.total}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Placed at{" "}
            {new Date(order.placedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </section>
    </div>
  );
}
