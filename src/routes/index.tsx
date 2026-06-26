import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Plus, Minus, Instagram, Mail, Clock, Heart, Palette, Users, Sparkles, ShieldCheck, BadgeCheck, Truck, MessageCircle } from "lucide-react";
import { Header } from "@/components/mimo/Header";
import { Footer } from "@/components/mimo/Footer";
import { FloatingWidgets } from "@/components/mimo/FloatingWidgets";
import { Particles } from "@/components/mimo/Particles";
import { useReveal } from "@/hooks/use-reveal";
import quemSomosAsset from "@/assets/quem-somos.png.asset.json";
import { CatalogGrid } from "@/components/mimo/CatalogGrid";
import { SectionTitle } from "@/components/mimo/SectionTitle";
import { TeamSection } from "@/components/mimo/TeamSection";
import { openSellersModal } from "@/components/mimo/SellersModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mimô Personalizados, Aniversários inesquecíveis" },
      { name: "description", content: "A Mimô transforma aniversários em memórias inesquecíveis com itens personalizados feitos com amor." },
      { property: "og:title", content: "Mimô Personalizados, Aniversários inesquecíveis" },
      { property: "og:description", content: "Itens personalizados para festas, feitos com amor, família e alegria." },
      { property: "og:url", content: "https://mimopersonalizados.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Mimô Personalizados, Aniversários inesquecíveis" },
      { name: "twitter:description", content: "Itens personalizados para festas, feitos com amor, família e alegria." },
    ],
    links: [{ rel: "canonical", href: "https://mimopersonalizados.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Mimô Personalizados",
          url: "https://mimopersonalizados.lovable.app/",
          inLanguage: "pt-BR",
        }),
      },
    ],
  }),
  component: Index,
});

const WA_URL = "https://wa.me/?text=" + encodeURIComponent("Olá Mimô! Vi o site e quero um orçamento");

const FAQ = [
  { q: "Qual o valor mínimo do pedido?", a: "O pedido mínimo é de R$ 100,00 em compras de produtos diversos." },
  { q: "Como funciona o prazo de entrega?", a: "Trabalhamos por agendamento. Nos informe o dia da festa que vemos a data disponível para o envio." },
  { q: "Quais formas de pagamento vocês aceitam?", a: "Aceitamos PIX (entrada de 50% e o restante 1 dia antes do envio) e Cartão de Crédito (pagamento integral, consultar taxas)." },
  { q: "Como funciona a entrega?", a: "Oferecemos retirada no ateliê em Caucaia-CE, UBER para Fortaleza e Região Metropolitana (cliente solicita) e Correios/Transportadora para todo o Brasil." },
  { q: "E se eu desistir da compra?", a: "Em caso de desistência o valor da entrada não será devolvido. Se informar com 15 dias de antecedência, fica como crédito para futuras compras (válido por 1 ano)." },
  { q: "As embalagens vêm com doces?", a: "Não. Todas as nossas embalagens são vazias. Trabalhamos apenas com os itens personalizados." },
];

function Index() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden" id="home">
        <Particles />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            <span className="mimo-title-glow">A Mimô transforma aniversários em memórias inesquecíveis.</span>{" "}
            <span className="mimo-heart-beat">💕</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#7a4a64]">
            Itens personalizados feitos com amor, criatividade e muito carinho para a sua festa.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#catalogo" className="mimo-btn mimo-btn-cta">VER CATÁLOGO</a>
          </div>
          <div className="mt-14 flex justify-center">
            <a href="#quem-somos" aria-label="Role para baixo" className="mimo-bounce-down text-[#F97FAF]">
              <ChevronDown className="h-10 w-10" />
            </a>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section id="quem-somos" className="max-w-7xl mx-auto px-4 py-20">
        <SectionTitle>Quem Somos</SectionTitle>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Uma história de amor, família e muita alegria
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-start">
          <div className="mimo-reveal order-2 md:order-1 space-y-4 text-[#5b2b48] leading-relaxed">
            <p>Mahyra e Halexia são mais que sócias, são tia e sobrinha. Uma dupla que une experiência, juventude e muito amor em cada detalhe.</p>
            <p>Mahyra, com sua criatividade afiada e olhar atento para as tendências, sempre foi a tia que caprichava nos presentes e fazia questão de que cada celebração fosse especial. Halexia, sua sobrinha, cresceu vendo esse cuidado e herdou o mesmo brilho nos olhos pela arte de encantar.</p>
            <p>Foi em uma conversa descontraída, regada a café e muitos sonhos, que a Mimô nasceu. A ideia era simples e poderosa: criar itens personalizados com alma, cor e alegria, para que cada aniversário fosse único, assim como o amor que une essa família.</p>
            <p>Mahyra desenha, cria e dá vida a cada peça. Halexia organiza, planeja e garante que tudo chegue no tempo certo e com o cuidado que cada cliente merece. Juntas, elas transformam papel em memória, e festa em emoção.</p>
            <p>Hoje, a Mimô é o reflexo de um laço que vai além do sangue, é amizade, parceria e um propósito em comum: fazer os outros felizes, um item de cada vez. Porque para Mahyra e Halexia, a alegria não se vive apenas... ela se personaliza. 💕✨</p>
            <p className="mt-6 text-lg font-bold text-[#C77FC2] italic">"O amor que nos une é o mesmo que colocamos em cada item. ✨"</p>
          </div>

          <div className="mimo-reveal order-1 md:order-2" style={{ animationDelay: ".2s" }}>
            <figure className="overflow-hidden rounded-[20px] border-4 transition-transform duration-500 hover:scale-105" style={{ borderColor: "#F97FAF" }}>
              <img src={quemSomosAsset.url} alt="Mahyra e Halexia, fundadoras da Mimô" className="w-full aspect-[4/5] object-cover" />
              <figcaption className="bg-white p-4 text-center font-bold text-[#5b2b48]">
                Mahyra &amp; Halexia, As fundadoras
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Valores */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { Icon: Heart,    title: "Amor em cada detalhe",     desc: "Cada peça é feita com cuidado e atenção em todos os mínimos detalhes." },
            { Icon: Palette,  title: "Criatividade sem limites", desc: "Designs únicos e exclusivos que dão personalidade à sua festa." },
            { Icon: Users,    title: "Parceria e família",        desc: "Mais que um negócio, um laço de confiança com cada cliente." },
            { Icon: Sparkles, title: "Alegria contagiante",       desc: "Levamos brilho e emoção para tornar o seu dia inesquecível." },
          ].map((v, i) => (
            <div
              key={v.title}
              tabIndex={0}
              className="mimo-reveal group relative bg-white rounded-[20px] p-7 text-left transition-all duration-500 outline-none cursor-pointer hover:-translate-y-2 hover:!border-2 hover:!border-[#F97FAF] hover:[box-shadow:0_0_0_2px_rgba(249,127,175,.18),0_18px_38px_-12px_rgba(199,127,194,.25)] focus:-translate-y-2 focus:!border-2 focus:!border-[#F97FAF] focus:[box-shadow:0_0_0_2px_rgba(249,127,175,.18),0_18px_38px_-12px_rgba(199,127,194,.25)] active:!border-2 active:!border-[#F97FAF]"
              style={{
                animationDelay: `${0.15 * i}s`,
                boxShadow: "0 1px 0 rgba(249,127,175,.08), 0 10px 30px -12px rgba(199,127,194,.18)",
                border: "1px solid #f3dfe7",
              }}
            >
              <span
                aria-hidden
                className="absolute top-0 left-7 right-7 h-[2px] rounded-full"
                style={{ background: "linear-gradient(90deg, #F97FAF, #C77FC2)" }}
              />
              <div
                className="h-12 w-12 rounded-[14px] grid place-items-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: "linear-gradient(135deg, #FEF5F6, #f7dde6)", color: "#F97FAF" }}
              >
                <v.Icon className="h-6 w-6" strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 font-extrabold text-[#3a1a2f] tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#7a4a64]">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 py-20">
        <SectionTitle>Destaques do Catálogo</SectionTitle>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Uma prévia dos nossos mimos, veja o catálogo completo para se inspirar
        </p>

        <CatalogGrid limit={6} />

        <div className="mt-12 flex justify-center">
          <Link to="/catalogo" className="mimo-btn mimo-btn-cta">VER CATÁLOGO COMPLETO</Link>
        </div>
      </section>

      {/* EQUIPE */}
      <TeamSection />

      {/* COMPRA SEGURA */}
      <section id="compra-segura" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-lg border border-[#f3dfe7]">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF5F6] text-[#F97FAF] font-bold text-sm">
              <ShieldCheck className="h-4 w-4" /> Compra Segura
            </span>
            <h2 className="mimo-reveal mt-4 text-2xl md:text-4xl font-black text-[#5b2b48]">
              Sua festa nas mãos de quem cuida 💕
            </h2>
            <p className="mimo-reveal text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
              Trabalhamos com transparência do orçamento à entrega para você comprar com tranquilidade.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: ShieldCheck, title: "Pagamento protegido", desc: "PIX com entrada de 50% e saldo 1 dia antes do envio, ou cartão de crédito." },
              { Icon: BadgeCheck, title: "Garantia de qualidade", desc: "Cada peça é conferida com carinho antes de sair do ateliê." },
              { Icon: Truck, title: "Envio rastreado", desc: "Retirada no ateliê, UBER em Fortaleza ou Correios para todo o Brasil." },
              { Icon: MessageCircle, title: "Atendimento humano", desc: "Tire dúvidas direto no WhatsApp, de segunda a sábado." },
            ].map((v, i) => (
              <div
                key={v.title}
                className="mimo-reveal rounded-[20px] p-6 bg-[#FEF5F6]/50 border border-[#f3dfe7]"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div
                  className="h-12 w-12 rounded-[14px] grid place-items-center"
                  style={{ background: "linear-gradient(135deg, #FEF5F6, #f7dde6)", color: "#F97FAF" }}
                >
                  <v.Icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <h3 className="mt-4 font-extrabold text-[#3a1a2f]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#7a4a64]">{v.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[#7a4a64]">
            Confira nossas{" "}
            <Link to="/politicas" className="font-bold text-[#F97FAF] hover:underline">
              políticas e combinados
            </Link>{" "}
            para mais detalhes sobre pedidos, prazos e desistência.
          </p>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-20">
        <SectionTitle>Dúvidas Frequentes</SectionTitle>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Tire suas dúvidas antes de fazer seu pedido
        </p>

        <div className="mt-10 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={item.q} className="mimo-reveal mimo-card !p-0 overflow-hidden" style={{ animationDelay: `${0.1 * i}s` }}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-[#5b2b48] transition-colors duration-300 hover:text-[#F97FAF]"
                >
                  <span>{item.q}</span>
                  <span className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                    {isOpen ? <Minus className="h-5 w-5 text-[#F97FAF]" /> : <Plus className="h-5 w-5 text-[#F97FAF]" />}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[#7a4a64]">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="max-w-6xl mx-auto px-4 py-20">
        <SectionTitle>Vamos fazer sua festa brilhar?</SectionTitle>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Conte para a gente o que você sonhou para o seu aniversário
        </p>

        <div className="mt-12 max-w-2xl mx-auto">
          <div className="mimo-reveal space-y-4" style={{ animationDelay: ".2s" }}>
            <button
              onClick={openSellersModal}
              className="mimo-card flex items-center gap-3 text-[#5b2b48] hover:!border-[#F97FAF] w-full text-left"
            >
              <span className="text-2xl">💬</span> <span><strong>WhatsApp</strong>, Fale com a gente agora</span>
            </button>
            <a href="https://www.instagram.com/mimopersonalizadoos" target="_blank" rel="noopener" className="mimo-card flex items-center gap-3 text-[#5b2b48]">
              <Instagram className="text-[#F97FAF]" /> <span><strong>Instagram</strong>, @mimopersonalizadoos</span>
            </a>
            <a href="mailto:mimopersonalizados@gmail.com" className="mimo-card flex items-center gap-3 text-[#5b2b48]">
              <Mail className="text-[#F97FAF]" /> <span><strong>E-mail</strong>, mimopersonalizados@gmail.com</span>
            </a>
            <div className="mimo-card flex items-center gap-3 text-[#5b2b48]">
              <Clock className="text-[#F97FAF]" />
              <span><strong>Atendimento</strong>, Seg-Sex 9h às 18h | Sáb 9h às 13h</span>
            </div>
          </div>
        </div>

        <div className="mimo-reveal mt-16 text-center bg-white rounded-[20px] p-8 shadow-lg">
          <p className="text-xl md:text-2xl font-black text-[#5b2b48]">Sua festa merece a Mimô. Vamos conversar? 💬</p>
          <button onClick={openSellersModal} className="mimo-btn mimo-btn-pink mt-5">FALAR NO WHATSAPP</button>
        </div>
      </section>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
