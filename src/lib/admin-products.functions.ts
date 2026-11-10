import { createServerFn } from "@tanstack/react-start";

async function assertAdmin(token: unknown) {
  if (typeof token !== "string" || !token) throw new Error("Não autorizado");
  const crypto = await import("node:crypto");
  const secret = process.env.ADMIN_SESSION_SECRET || "mimo-secret-session-2026";
  const parts = token.split(".");
  if (parts.length !== 2) throw new Error("Não autorizado");
  const [payload, signature] = parts;
  const expiresAt = Number(payload.split(":")[1]);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) throw new Error("Não autorizado");
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) throw new Error("Não autorizado");
}

const ALLOWED = [
  "name", "is_new", "hue", "image", "images", "active", "price", "original_price",
  "is_kit", "kit_items", "category", "is_promo", "description",
] as const;

function pick(row: unknown) {
  const out: Record<string, unknown> = {};
  if (row && typeof row === "object") {
    for (const k of ALLOWED) if (k in row) out[k] = (row as Record<string, unknown>)[k];
  }
  return out;
}

const SELECT_COLS =
  "id, name, is_new, hue, image, images, active, sort_order, price, original_price, is_kit, kit_items, category, is_promo, description";

export const adminCreateProduct = createServerFn({ method: "POST" })
  .validator((d: { token: string; row: Record<string, unknown> }) => d)
  .handler(async ({ data }) => {
    await assertAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("produtos")
      .insert(pick(data.row) as never)
      .select(SELECT_COLS)
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminUpdateProduct = createServerFn({ method: "POST" })
  .validator((d: { token: string; id: number; patch: Record<string, unknown> }) => d)
  .handler(async ({ data }) => {
    await assertAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("produtos")
      .update(pick(data.patch) as never)
      .eq("id", Number(data.id));
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .validator((d: { token: string; id: number }) => d)
  .handler(async ({ data }) => {
    await assertAdmin(data.token);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("produtos").delete().eq("id", Number(data.id));
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminCreateUploadUrl = createServerFn({ method: "POST" })
  .validator((d: { token: string; ext: string }) => d)
  .handler(async ({ data }) => {
    await assertAdmin(data.token);
    const ext = String(data.ext || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: res, error } = await supabaseAdmin.storage.from("produtos").createSignedUploadUrl(path);
    if (error || !res) throw new Error(error?.message || "Falha ao preparar envio");
    return { path: res.path, token: res.token };
  });
