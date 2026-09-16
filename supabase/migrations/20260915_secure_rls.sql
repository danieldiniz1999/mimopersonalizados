-- =====================================================================
-- BLINDAGEM DE SEGURANÇA: ROW LEVEL SECURITY (RLS)
-- Remove permissões anônimas perigosas de INSERT/UPDATE/DELETE.
-- =====================================================================

-- 1. Revogar permissões perigosas da role pública (anon) na tabela produtos
REVOKE INSERT, UPDATE, DELETE ON public.produtos FROM anon;

-- 2. Remover políticas antigas abertas para qualquer um
DROP POLICY IF EXISTS "Qualquer um pode criar produtos" ON public.produtos;
DROP POLICY IF EXISTS "Qualquer um pode atualizar produtos" ON public.produtos;
DROP POLICY IF EXISTS "Qualquer um pode excluir produtos" ON public.produtos;
DROP POLICY IF EXISTS "Qualquer um pode ver produtos" ON public.produtos;

-- 3. Habilitar RLS estrito
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;

-- 4. Criar política segura de leitura pública (qualquer um pode VER produtos ativos)
CREATE POLICY "Leitura publica de produtos"
  ON public.produtos FOR SELECT
  TO public
  USING (true);

-- 5. Apenas usuários autenticados ou service_role podem inserir, atualizar e excluir produtos
CREATE POLICY "Apenas admin pode inserir produtos"
  ON public.produtos FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);

CREATE POLICY "Apenas admin pode atualizar produtos"
  ON public.produtos FOR UPDATE
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Apenas admin pode excluir produtos"
  ON public.produtos FOR DELETE
  TO authenticated, service_role
  USING (true);

-- 6. Blindagem do Storage de imagens (bucket 'produtos')
DROP POLICY IF EXISTS "Public update produtos" ON storage.objects;
DROP POLICY IF EXISTS "Public delete produtos" ON storage.objects;

-- Leitura pública das imagens permitida
-- Inserção/Upload e Exclusão apenas para authenticated e service_role
REVOKE UPDATE, DELETE ON storage.objects FROM anon;
