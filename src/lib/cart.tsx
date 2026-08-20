import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { menu, type MenuItem } from "./restaurant-data";

export type CartLine = { id: string; qty: number };

export type PlacedOrder = {
  reference: string;
  placedAt: number;
  lines: CartLine[];
  total: number;
};

type CartValue = {
  lines: CartLine[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  total: number;
  detailed: { item: MenuItem; qty: number }[];
  order: PlacedOrder | null;
  placeOrder: () => PlacedOrder | null;
};

const CartContext = createContext<CartValue | null>(null);
const STORAGE_KEY = "italiano.cart.v1";
const ORDER_KEY = "italiano.order.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
      const rawOrder = localStorage.getItem(ORDER_KEY);
      if (rawOrder) setOrder(JSON.parse(rawOrder));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((id: string) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) =>
      prev.flatMap((l) => (l.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const detailed = useMemo(
    () =>
      lines.flatMap((l) => {
        const item = menu.find((m) => m.id === l.id);
        return item ? [{ item, qty: l.qty }] : [];
      }),
    [lines],
  );

  const total = useMemo(() => detailed.reduce((s, d) => s + d.item.price * d.qty, 0), [detailed]);
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const placeOrder = useCallback(() => {
    if (lines.length === 0) return null;
    const placed: PlacedOrder = {
      reference: `IT-${Math.floor(1000 + Math.random() * 9000)}`,
      placedAt: Date.now(),
      lines,
      total,
    };
    setOrder(placed);
    setLines([]);
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(placed));
    } catch {
      /* ignore */
    }
    return placed;
  }, [lines, total]);

  const value: CartValue = { lines, add, remove, clear, count, total, detailed, order, placeOrder };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
