import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { events } from "@/lib/restaurant-data";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Events Calendar — Italiano Restaurant" },
      {
        name: "description",
        content: "Wine tastings, jazz nights and pasta masterclasses at Italiano Restaurant. Reserve your seat.",
      },
      { property: "og:title", content: "Events Calendar — Italiano Restaurant" },
      { property: "og:description", content: "See what's on at Italiano Restaurant and book a table." },
    ],
  }),
  component: CalendarPage,
});

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function CalendarPage() {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<string | null>(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const pad = (n: number) => String(n).padStart(2, "0");
  const iso = (day: number) => `${year}-${pad(month + 1)}-${pad(day)}`;

  const eventsOn = (day: number) => events.filter((e) => e.date === iso(day));
  const monthEvents = events.filter((e) => e.date.startsWith(`${year}-${pad(month + 1)}`));
  const listed = selected ? events.filter((e) => e.date === selected) : monthEvents;

  const shift = (delta: number) => {
    setSelected(null);
    setCursor(new Date(year, month + delta, 1));
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl sm:text-4xl">Events calendar</h1>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Tastings, live music and hands-on classes in the dining room. Tap a date to see what's on.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-serif text-lg">
              {cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => shift(-1)}
                aria-label="Previous month"
                className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => shift(1)}
                aria-label="Next month"
                className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
            {WEEKDAYS.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={`pad-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const has = eventsOn(day).length > 0;
              const isSelected = selected === iso(day);
              const isToday =
                today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelected(isSelected ? null : iso(day))}
                  className={`relative flex aspect-square items-center justify-center rounded-full text-xs transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isToday
                        ? "bg-accent/50 font-semibold"
                        : "hover:bg-secondary"
                  }`}
                >
                  {day}
                  {has && !isSelected && (
                    <span className="absolute bottom-1 size-1 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="eyebrow mb-4">
            {selected
              ? new Date(selected).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
              : "This month"}
          </h2>
          {listed.length === 0 ? (
            <p className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-card">
              Nothing scheduled — the kitchen is all yours. Reserve a regular table any evening from 6 PM.
            </p>
          ) : (
            <div className="space-y-3">
              {listed.map((e) => (
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
                    <p className="truncate text-xs text-muted-foreground">
                      {e.time} · {e.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toast.success(`Seat reserved for ${e.title}`)}
                    className="shrink-0 rounded-lg border border-input px-4 py-2 text-xs font-bold transition-colors hover:bg-secondary"
                  >
                    Book
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
