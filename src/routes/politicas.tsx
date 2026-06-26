import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/mimo/Header";
import { Footer } from "@/components/mimo/Footer";
import { FloatingWidgets } from "@/components/mimo/FloatingWidgets";
import { SectionTitle } from "@/components/mimo/SectionTitle";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/politicas")({
  head: () => ({
    meta: [
      { title: "Combinados da Mimô — Políticas" },
      { name: "description", content: "Conheça os combinados da Mimô: pedido mínimo, prazos, pagamento, entregas e cancelamentos." },
      { property: "og:title", content: "Combinados da Mimô" },
      { property: "og:description", content: "Combinados para que tudo dê certo na sua festa." },
      { property: "og:url", content: "https://mimopersonalizados.lovable.app/politicas" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: "Combinados da Mimô" },
      { name: "twitter:description", content: "Combinados para que tudo dê certo na sua festa." },
    ],
    links: [{ rel: "canonical", href: "https://mimopersonalizados.lovable.app/politicas" }],
  }),
  component: PoliticasPage,
});

const WA_URL = "https://wa.me/?text=" + encodeURIComponent("Olá Mimô! Vi os combinados e quero um orçamento");

const CARDS = [
  { icon: "🛒", title: "Pedido Mínimo", text: "R$ 100,00 em compras. Produtos diversos." },
  { icon: "📦", title: "Embalagens", text: "Todas as embalagens são vazias. Não trabalhamos com doces." },
  { icon: "📅", title: "Prazos", text: "Trabalhamos por agendamento. Nos informe o dia da festa que vemos a data disponível para o envio." },
  { icon: "💳", title: "Pagamento", text: "💚 PIX: Entrada de 50% e o restante 1 dia antes do envio. 💳 Cartão de Crédito: Pagamento Integral (consultar taxas)." },
  { icon: "🚚", title: "Entregas", text: "📍 Retirada no ateliê em Caucaia-CE. 🚗 UBER: Fortaleza e Região Metropolitana (cliente solicita). 📮 Correios/Transportadora para todo o Brasil." },
  { icon: "🔄", title: "Cancelamentos", text: "Em caso de desistência o valor da entrada não será devolvido. Informando com 15 dias de antecedência, ficará como crédito para futuras compras. Validade: 1 ano." },
];

function PoliticasPage() {
  useReveal();
  return (
    <div className="min-h-screen">
      <Header />
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <SectionTitle as="h1">Combinados da Mimô</SectionTitle>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Aqui estão nossos combinados para que tudo dê certo na sua festa
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {CARDS.map((c, i) => (
            <article
              key={c.title}
              className="mimo-reveal mimo-card group [perspective:1000px]"
              style={{ animationDelay: `${0.12 * i}s` }}
            >
              <div className="transition-transform duration-500 group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
                <div className="text-6xl mb-3 inline-block transition-transform duration-500 group-hover:rotate-12">{c.icon}</div>
                <h2 className="text-2xl font-black text-[#F97FAF]">{c.title}</h2>
                <p className="mt-2 text-[#5b2b48] leading-relaxed">{c.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mimo-reveal mt-14 text-center bg-white rounded-[20px] p-8 shadow-lg">
          <p className="text-lg md:text-xl font-bold text-[#5b2b48]">Ficou com alguma dúvida? Fale com a gente! 💕</p>
          <a href={WA_URL} target="_blank" rel="noopener" className="mimo-btn mimo-btn-pink mt-5">FALAR NO WHATSAPP</a>
        </div>
      </section>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}