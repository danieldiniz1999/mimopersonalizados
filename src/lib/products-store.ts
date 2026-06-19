import { useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  isNew: boolean;
  hue: number;
  image?: string; // data URL opcional
  active?: boolean; // default true
};

const KEY = "mimo:products";

const DEFAULTS: Product[] = [];

function read(): Product[] {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULTS;
    return parsed;
  } catch {
    return DEFAULTS;
  }
}

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const productsStore = {
  getAll(): Product[] {
    return read();
  },
  save(list: Product[]) {
    localStorage.setItem(KEY, JSON.stringify(list));
    emit();
    window.dispatchEvent(new Event("mimo-products-changed"));
  },
  add(p: Omit<Product, "id">) {
    const list = read();
    const id = list.length ? Math.max(...list.map((x) => x.id)) + 1 : 1;
    this.save([...list, { ...p, id }]);
  },
  update(id: number, patch: Partial<Product>) {
    this.save(read().map((p) => (p.id === id ? { ...p, ...patch } : p)));
  },
  remove(id: number) {
    this.save(read().filter((p) => p.id !== id));
  },
  reset() {
    this.save(DEFAULTS);
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) fn();
    };
    const onCustom = () => fn();
    window.addEventListener("storage", onStorage);
    window.addEventListener("mimo-products-changed", onCustom);
    return () => {
      listeners.delete(fn);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("mimo-products-changed", onCustom);
    };
  },
};

export function useProducts(): Product[] {
  const [list, setList] = useState<Product[]>(DEFAULTS);
  useEffect(() => {
    setList(productsStore.getAll());
    return productsStore.subscribe(() => setList(productsStore.getAll()));
  }, []);
  return list;
}