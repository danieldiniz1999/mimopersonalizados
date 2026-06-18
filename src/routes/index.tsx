import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, Download, X, Plus, Minus, Instagram, Mail, Clock, Heart, Palette, Users, Sparkles } from "lucide-react";
import { Header } from "@/components/mimo/Header";
import { Footer } from "@/components/mimo/Footer";
import { FloatingWidgets } from "@/components/mimo/FloatingWidgets";
import { Particles } from "@/components/mimo/Particles";
import { useReveal } from "@/hooks/use-reveal";
import quemSomosAsset from "@/assets/quem-somos.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MIMO Personalizados — Aniversários inesquecíveis" },
      { name: "description", content: "A MIMO transforma aniversários em memórias inesquecíveis com itens personalizados feitos com amor." },
      { property: "og:title", content: "MIMO Personalizados" },
      { property: "og:description", content: "Itens personalizados para festas, feitos com amor, família e alegria." },
    ],
  }),
  component: Index,
});

const WA_URL = "https://wa.me/?text=" + encodeURIComponent("Olá MIMO! Vi o site e quero um orçamento");

const PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Kit Personalizado ${i + 1}`,
  isNew: i < 3,
  hue: [330, 290, 70, 340, 310, 80][i % 6],
}));

const FAQ = [
  { q: "Qual o valor mínimo do pedido?", a: "O pedido mínimo é de R$ 100,00 em compras de produtos diversos." },
  { q: "Como funciona o prazo de entrega?", a: "Trabalhamos por agendamento. Nos informe o dia da festa que vemos a data disponível para o envio." },
  { q: "Quais formas de pagamento vocês aceitam?", a: "Aceitamos PIX (entrada de 50% e o restante 1 dia antes do envio) e Cartão de Crédito (pagamento integral, consultar taxas)." },
  { q: "Como funciona a entrega?", a: "Oferecemos retirada no ateliê em Caucaia-CE, UBER para Fortaleza e Região Metropolitana (cliente solicita) e Correios/Transportadora para todo o Brasil." },
  { q: "E se eu desistir da compra?", a: "Em caso de desistência o valor da entrada não será devolvido. Se informar com 15 dias de antecedência, fica como crédito para futuras compras (válido por 1 ano)." },
  { q: "As embalagens vêm com doces?", a: "Não. Todas as nossas embalagens são vazias. Trabalhamos apenas com os itens personalizados." },
];

function ProductPlaceholder({ hue }: { hue: number }) {
  return (
    <div
      className="aspect-[4/3] w-full rounded-[20px] grid place-items-center text-4xl"
      style={{ background: `linear-gradient(135deg, hsl(${hue} 90% 92%), hsl(${(hue + 30) % 360} 90% 85%))` }}
    >
      🎁
    </div>
  );
}

function Index() {
  useReveal();
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered = useMemo(
    () => PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  useEffect(() => {
    if (lightbox !== null) {
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [lightbox]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden" id="home">
        <Particles />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="mimo-reveal text-4xl md:text-6xl font-black leading-tight">
            <span className="mimo-title-glow">A MIMO transforma aniversários em memórias inesquecíveis.</span>{" "}
            <span className="mimo-heart-beat">💕</span>
          </h1>
          <p className="mimo-reveal mt-6 text-lg md:text-xl text-[#7a4a64]" style={{ animationDelay: ".2s" }}>
            Itens personalizados feitos com amor, criatividade e muito carinho para a sua festa.
          </p>
          <div className="mimo-reveal mt-10 flex flex-wrap justify-center gap-4" style={{ animationDelay: ".4s" }}>
            <a href="#catalogo" className="mimo-btn mimo-btn-cta">VER CATÁLOGO</a>
            <a href={WA_URL} target="_blank" rel="noopener" className="mimo-btn mimo-btn-pink">FALAR NO WHATSAPP</a>
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
        <h2 className="mimo-reveal text-3xl md:text-5xl font-black text-center text-[#F97FAF]">
          Quem Somos <span className="mimo-heart-beat">💕</span> <span className="mimo-heart-beat">🎂</span>
        </h2>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Uma história de amor, família e muita alegria
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-start">
          <div className="mimo-reveal space-y-4 text-[#5b2b48] leading-relaxed">
            <p>Mahyra e Halexia são mais que sócias — são tia e sobrinha. Uma dupla que une experiência, juventude e muito amor em cada detalhe.</p>
            <p>Mahyra, com sua criatividade afiada e olhar atento para as tendências, sempre foi a tia que caprichava nos presentes e fazia questão de que cada celebração fosse especial. Halexia, sua sobrinha, cresceu vendo esse cuidado e herdou o mesmo brilho nos olhos pela arte de encantar.</p>
            <p>Foi em uma conversa descontraída, regada a café e muitos sonhos, que a MIMO nasceu. A ideia era simples e poderosa: criar itens personalizados com alma, cor e alegria — para que cada aniversário fosse único, assim como o amor que une essa família.</p>
            <p>Mahyra desenha, cria e dá vida a cada peça. Halexia organiza, planeja e garante que tudo chegue no tempo certo e com o cuidado que cada cliente merece. Juntas, elas transformam papel em memória, e festa em emoção.</p>
            <p>Hoje, a MIMO é o reflexo de um laço que vai além do sangue — é amizade, parceria e um propósito em comum: fazer os outros felizes, um item de cada vez. Porque para Mahyra e Halexia, a alegria não se vive apenas... ela se personaliza. 💕✨</p>
            <p className="mt-6 text-lg font-bold text-[#C77FC2] italic">"O amor que nos une é o mesmo que colocamos em cada item. ✨"</p>
          </div>

          <div className="mimo-reveal" style={{ animationDelay: ".2s" }}>
            <figure className="overflow-hidden rounded-[20px] border-4 transition-transform duration-500 hover:scale-105" style={{ borderColor: "#F97FAF" }}>
              <img src={quemSomosAsset.url} alt="Mahyra e Halexia, fundadoras da MIMO" className="w-full aspect-[4/5] object-cover" />
              <figcaption className="bg-white p-4 text-center font-bold text-[#5b2b48]">
                Mahyra &amp; Halexia — As fundadoras 💕
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
              className="mimo-reveal group relative bg-white rounded-[20px] p-7 text-left transition-all duration-500 hover:-translate-y-2"
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
        <h2 className="mimo-reveal text-3xl md:text-5xl font-black text-center text-[#F97FAF]">Nosso Catálogo 🎈</h2>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Navegue pelos produtos e inspire-se para sua festa
        </p>

        <div className="mimo-reveal mt-8 max-w-md mx-auto relative" style={{ animationDelay: ".3s" }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#C77FC2]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar produto..."
            maxLength={80}
            className="mimo-input pl-12"
          />
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <article key={p.id} className="mimo-reveal mimo-card relative" style={{ animationDelay: `${0.1 * i}s` }}>
              {p.isNew && (
                <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-black text-[#3a1a2f]" style={{ backgroundColor: "#D5DB1F" }}>
                  NOVIDADE!
                </span>
              )}
              <button
                onClick={() => setLightbox(p.id)}
                className="block w-full overflow-hidden rounded-[20px] mimo-float"
                style={{ animationDelay: `${(i % 5) * 0.4}s` }}
                aria-label={`Ampliar ${p.name}`}
              >
                <div className="transition-transform duration-500 hover:scale-110">
                  <ProductPlaceholder hue={p.hue} />
                </div>
              </button>
              <h3 className="mt-4 font-bold text-[#5b2b48]">{p.name}</h3>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="mimo-btn mimo-btn-lilac mt-3 w-full text-sm"
              >
                <Download className="h-4 w-4" /> BAIXAR IMAGEM
              </a>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center mt-8 text-[#7a4a64]">Nenhum produto encontrado.</p>
        )}
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm grid place-items-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 h-12 w-12 grid place-items-center rounded-full bg-white text-[#F97FAF]"
            onClick={() => setLightbox(null)}
            aria-label="Fechar"
          >
            <X />
          </button>
          <div className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <ProductPlaceholder hue={PRODUCTS.find((p) => p.id === lightbox)?.hue ?? 330} />
          </div>
        </div>
      )}

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="mimo-reveal text-3xl md:text-5xl font-black text-center text-[#F97FAF]">❓ Dúvidas Frequentes</h2>
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
        <h2 className="mimo-reveal text-3xl md:text-5xl font-black text-center text-[#F97FAF]">
          Vamos fazer sua festa brilhar? ✨
        </h2>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Conte para a gente o que você sonhou para o seu aniversário
        </p>

        <div className="mt-12 max-w-2xl mx-auto">
          <div className="mimo-reveal space-y-4" style={{ animationDelay: ".2s" }}>
            <a href={WA_URL} target="_blank" rel="noopener" className="mimo-card flex items-center gap-3 text-[#5b2b48] hover:!border-[#F97FAF]">
              <span className="text-2xl">💬</span> <span><strong>WhatsApp</strong> — Fale com a gente agora</span>
            </a>
            <a href="https://www.instagram.com/mimopersonalizadoos" target="_blank" rel="noopener" className="mimo-card flex items-center gap-3 text-[#5b2b48]">
              <Instagram className="text-[#F97FAF]" /> <span><strong>Instagram</strong> — @mimopersonalizadoos</span>
            </a>
            <a href="mailto:mimopersonalizados@gmail.com" className="mimo-card flex items-center gap-3 text-[#5b2b48]">
              <Mail className="text-[#F97FAF]" /> <span><strong>E-mail</strong> — mimopersonalizados@gmail.com</span>
            </a>
            <div className="mimo-card flex items-center gap-3 text-[#5b2b48]">
              <Clock className="text-[#F97FAF]" />
              <span><strong>Atendimento</strong> — Seg-Sex 9h às 18h | Sáb 9h às 13h</span>
            </div>
          </div>
        </div>

        <div className="mimo-reveal mt-16 text-center bg-white rounded-[20px] p-8 shadow-lg">
          <p className="text-xl md:text-2xl font-black text-[#5b2b48]">Sua festa merece a MIMO. Vamos conversar? 💬</p>
          <a href={WA_URL} target="_blank" rel="noopener" className="mimo-btn mimo-btn-pink mt-5">FALAR NO WHATSAPP</a>
        </div>
      </section>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
