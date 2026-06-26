
ALTER TABLE public.produtos ADD COLUMN category TEXT;
ALTER TABLE public.produtos ADD CONSTRAINT produtos_category_check
  CHECK (category IS NULL OR category IN ('Clássicas 3D','Básicas','Luxo','Kit Linha Clássica','Kit Linha Luxo','Kit Premium Mimô'));
