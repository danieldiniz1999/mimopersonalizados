ALTER TABLE public.produtos DROP CONSTRAINT IF EXISTS produtos_category_check;
ALTER TABLE public.produtos ADD CONSTRAINT produtos_category_check CHECK (
  category IS NULL OR category = ANY (ARRAY[
    'Clássicas 3D','Básicas','Luxo',
    'Kit Linha Clássica','Kit Linha Luxo','Kit Premium Mimô',
    'Sacolinhas Personalizadas','Pipoca Gourmet','Acrílico',
    'Cofres','Tubolatas','Convites'
  ])
);