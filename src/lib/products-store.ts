import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type KitItem = { name: string; qty: number };

export const CATEGORIES = [
  "Clássicas 3D",
  "Básicas",
  "Luxo",
  "Kit Linha Clássica",
  "Kit Linha Luxo",
  "Kit Premium Mimô",
] as const;
export type Category = typeof CATEGORIES[number];

export type Product = {
  id: number;
  name: string;
  isNew: boolean;
  hue: number;
  image?: string;
  images?: string[];
  thumbnails?: string[];
  active?: boolean;
  price?: number;
  originalPrice?: number;
  isKit?: boolean;
  kitItems?: KitItem[];
  category?: Category;
  isPromo?: boolean;
  description?: string;
};

type Row = {
  id: number;
  name: string;
  is_new: boolean;
  hue: number;
  image: string | null;
  images: unknown;
  thumbnails?: unknown;
  active: boolean;
  sort_order: number;
  price: number | string | null;
  original_price?: number | string | null;
  is_kit?: boolean;
  kit_items?: unknown;
  category?: string | null;
  is_promo?: boolean;
  description?: string | null;
};

function fromRow(r: Row): Product {
  const imgs = Array.isArray(r.images) ? (r.images as string[]) : [];
  const thumbs = Array.isArray(r.thumbnails) ? (r.thumbnails as string[]) : [];
  const ki = Array.isArray(r.kit_items)
    ? (r.kit_items as unknown[])
        .map((x) => {
          const o = x as { name?: unknown; qty?: unknown };
          const name = typeof o?.name === "string" ? o.name : "";
          const qty = Number(o?.qty);
          return { name, qty: Number.isFinite(qty) && qty > 0 ? qty : 1 };
        })
        .filter((k) => k.name.trim() !== "")
    : [];
  return {
    id: Number(r.id),
    name: r.name,
    isNew: !!r.is_new,
    hue: r.hue,
    image: r.image ?? undefined,
    images: imgs,
    thumbnails: thumbs,
    active: r.active,
    price: r.price == null ? undefined : Number(r.price),
    originalPrice: r.original_price == null ? undefined : Number(r.original_price),
    isKit: !!r.is_kit,
    kitItems: ki,
    category: (r.category ?? undefined) as Category | undefined,
    isPromo: !!r.is_promo,
    description: r.description ?? undefined,
  };
}

let cache: Product[] = [];
let loaded = false;
let loadingPromise: Promise<Product[]> | null = null;
const listeners = new Set<() => void>();
export let isLoadingProducts = false;

function emit() {
  listeners.forEach((l) => l());
}

async function fetchAll(): Promise<Product[]> {
  isLoadingProducts = true;
  emit();
  const { data, error } = await supabase
    .from("produtos")
    .select("id, name, is_new, hue, images, thumbnails, active, sort_order, price, original_price, is_kit, kit_items, category, is_promo, description")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  isLoadingProducts = false;
  if (error) {
    console.error("[produtos] erro ao buscar:", error);
    emit();
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
        original_price: p.originalPrice ?? null,
        is_kit: p.isKit ?? false,
        kit_items: p.kitItems ?? [],
        category: p.category ?? null,
        is_promo: p.isPromo ?? false,
        description: p.description ?? null,
      })
      .select("id, name, is_new, hue, image, images, active, sort_order, price, original_price, is_kit, kit_items, category, is_promo, description")
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
      original_price?: number | null;
      is_kit?: boolean;
      kit_items?: KitItem[];
      category?: string | null;
      is_promo?: boolean;
      description?: string | null;
    } = {};
    if (patch.name !== undefined) dbPatch.name = patch.name;
    if (patch.isNew !== undefined) dbPatch.is_new = patch.isNew;
    if (patch.hue !== undefined) dbPatch.hue = patch.hue;
    if (patch.image !== undefined) dbPatch.image = patch.image ?? null;
    if (patch.images !== undefined) dbPatch.images = patch.images ?? [];
    if (patch.active !== undefined) dbPatch.active = patch.active;
    if (patch.price !== undefined) dbPatch.price = patch.price ?? null;
    if (patch.originalPrice !== undefined) dbPatch.original_price = patch.originalPrice ?? null;
    if (patch.isKit !== undefined) dbPatch.is_kit = patch.isKit;
    if (patch.kitItems !== undefined) dbPatch.kit_items = patch.kitItems ?? [];
    if (patch.category !== undefined) dbPatch.category = patch.category ?? null;
    if (patch.isPromo !== undefined) dbPatch.is_promo = patch.isPromo ?? false;
    if (patch.description !== undefined) dbPatch.description = patch.description ?? null;

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

export function useProductsLoading(): boolean {
  const [loading, setLoading] = useState<boolean>(isLoadingProducts || !loaded);
  useEffect(() => {
    const update = () => setLoading(isLoadingProducts || !loaded);
    update();
    return productsStore.subscribe(update);
  }, []);
  return loading;
}