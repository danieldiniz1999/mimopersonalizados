
CREATE POLICY "Public upload produtos" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'produtos');
CREATE POLICY "Public update produtos" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'produtos') WITH CHECK (bucket_id = 'produtos');
CREATE POLICY "Public delete produtos" ON storage.objects FOR DELETE TO public USING (bucket_id = 'produtos');
