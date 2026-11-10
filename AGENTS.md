# MIMÔ - Diretrizes para Agentes de Desenvolvimento

## Visão Geral

Projeto e-commerce e catálogo da marca **MIMÔ**, desenvolvido com:

- **Framework:** React 19 + TanStack Start (SSR) + TanStack Router
- **Estilização:** Tailwind CSS v4 + Radix UI + Lucide Icons + Sonner
- **Deploy:** Lovable Cloud (Nitro, preset `cloudflare-module`, saída em `dist/`)
- **Backend/Banco:** Supabase

## Comandos Principais

-

pm run dev: Inicia o servidor de desenvolvimento local
-

pm run build: Executa a compilação de produção e gera o bundle publicável em `dist/` (para a Vercel: `NITRO_PRESET=vercel npm run build`, que sai em `.vercel/output`)
-

pm run preview: Visualiza o build localmente
-

pm run lint: Executa a verificação estática com ESLint
