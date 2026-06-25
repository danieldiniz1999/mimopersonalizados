ALTER TABLE public.produtos
  ADD COLUMN IF NOT EXISTS is_kit boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS kit_items jsonb NOT NULL DEFAULT '[]'::jsonb;