import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: number;
  name: string;
  isNew: boolean;
  hue: number;
  image?: string;
  images?: string[];
  active?: boolean;
  price?: number;
};

type Row = {
  id: number;
  name: string;
  is_new: boolean;
  hue: number;
  image: string | null;
  images: unknown;
  active: boolean;
  sort_order: number;
  price: number | string | null;
};

function fromRow(r: Row): Product {
  const imgs = Array.isArray(r.images) ? (r.images as string[]) : [];
  return {
    id: Number(r.id),
    name: r.name,
    isNew: !!r.is_new,
    hue: r.hue,
    image: r.image ?? undefined,
    images: imgs,
    active: r.active,
    price: r.price == null ? undefined : Number(r.price),
  };
}

let cache: Product[] = [];
let loaded = false;
let loadingPromise: Promise<Product[]> | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

async function fetchAll(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("produtos")
    .select("id, name, is_new, hue, image, images, active, sort_order, price")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  if (error) {
    console.error("[produtos] erro ao buscar:", error);
    return cache;
  }
  cache = (data as Row[]).map(fromRow);
  loaded = true;
  emit();
  return cache;
}

function ensureLoaded() {
  if (loaded || loadingPromise) return loadingPromise;
  loadingPromise = fetchAll().finally(() => { loadingPromise = null; });
  return loadingPromise;
}

export const productsStore = {
  getAll(): Product[] {
    return cache;
  },
  refresh() {
    return fetchAll();
  },
  async add(p: Omit<Product, "id">) {
    const { data, error } = await supabase
      .from("produtos")
      .insert({
        name: p.name,
        is_new: p.isNew,
        hue: p.hue,
        image: p.image ?? null,
        images: p.images ?? [],
        active: p.active ?? true,
        price: p.price ?? null,
      })
      .select("id, name, is_new, hue, image, images, active, sort_order, price")
      .single();
    if (error) {
      console.error("[produtos] erro ao criar:", error);
      alert("Erro ao criar produto: " + error.message);
      return;
    }
    cache = [...cache, fromRow(data as Row)];
    emit();
  },
  async update(id: number, patch: Partial<Product>) {
    const dbPatch: {
      name?: string;
      is_new?: boolean;
      hue?: number;
      image?: string | null;
      images?: string[];
      active?: boolean;
      price?: number | null;
    } = {};
    if (patch.name !== undefined) dbPatch.name = patch.name;
    if (patch.isNew !== undefined) dbPatch.is_new = patch.isNew;
    if (patch.hue !== undefined) dbPatch.hue = patch.hue;
    if (patch.image !== undefined) dbPatch.image = patch.image ?? null;
    if (patch.images !== undefined) dbPatch.images = patch.images ?? [];
    if (patch.active !== undefined) dbPatch.active = patch.active;
    if (patch.price !== undefined) dbPatch.price = patch.price ?? null;

    // otimista
    cache = cache.map((p) => (p.id === id ? { ...p, ...patch } : p));
    emit();

    const { error } = await supabase.from("produtos").update(dbPatch).eq("id", id);
    if (error) {
      console.error("[produtos] erro ao atualizar:", error);
      alert("Erro ao atualizar: " + error.message);
      await fetchAll();
    }
  },
  async remove(id: number) {
    const prev = cache;
    cache = cache.filter((p) => p.id !== id);
    emit();
    const { error } = await supabase.from("produtos").delete().eq("id", id);
    if (error) {
      console.error("[produtos] erro ao excluir:", error);
      alert("Erro ao excluir: " + error.message);
      cache = prev;
      emit();
    }
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  },
};

export function useProducts(): Product[] {
  const [list, setList] = useState<Product[]>(cache);
  useEffect(() => {
    setList(cache);
    const unsub = productsStore.subscribe(() => setList([...cache]));
    ensureLoaded();
    return unsub;
  }, []);
  return list;
}