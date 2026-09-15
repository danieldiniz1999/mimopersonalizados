# MIMÔ Personalizados

Aplicação web e catálogo online da **MIMÔ Personalizados**, desenvolvida com React 19, TanStack Start, Tailwind CSS e Supabase, pronta para deploy na **Vercel**.

## 🚀 Tecnologias

- **Framework:** [React 19](https://react.dev) + [TanStack Start](https://tanstack.com/start)
- **Roteamento:** [TanStack Router](https://tanstack.com/router)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com) + [Radix UI](https://www.radix-ui.com)
- **Backend & Autenticação:** [Supabase](https://supabase.com)
- **Deploy:** [Vercel](https://vercel.com) (Build Output API v3 via Nitro)

## 💻 Desenvolvimento Local

1. Instale as dependências:
   `sh
npm install
`

2. Configure o arquivo .env com as credenciais do Supabase (consulte .env.example).

3. Inicie o servidor de desenvolvimento:
   `sh
npm run dev
`

4. Acesse em http://localhost:3000 (ou na porta indicada no terminal).

## 📦 Build e Deploy na Vercel

### Deploy com Git (Recomendado)

1. Crie um novo projeto na [Vercel](https://vercel.com/new).
2. Importe o repositório danieldiniz1999/mimopersonalizados.
3. Em **Environment Variables**, adicione as variáveis contidas no arquivo .env.example:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_PUBLISHABLE_KEY
   - VITE_SUPABASE_PROJECT_ID
   - SUPABASE_URL
   - SUPABASE_PUBLISHABLE_KEY
   - SUPABASE_PROJECT_ID
4. Clique em **Deploy**. A Vercel detectará e construirá a aplicação automaticamente utilizando a saída de .vercel/output.
