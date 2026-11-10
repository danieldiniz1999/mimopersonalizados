DROP POLICY IF EXISTS "Qualquer um pode atualizar produtos" ON public.produtos;
DROP POLICY IF EXISTS "Qualquer um pode criar produtos" ON public.produtos;
DROP POLICY IF EXISTS "Qualquer um pode excluir produtos" ON public.produtos;
REVOKE INSERT, UPDATE, DELETE ON public.produtos FROM anon, authenticated;
GRANT ALL ON public.produtos TO service_role;
DROP POLICY IF EXISTS "Public delete produtos" ON storage.objects;
DROP POLICY IF EXISTS "Public update produtos" ON storage.objects;