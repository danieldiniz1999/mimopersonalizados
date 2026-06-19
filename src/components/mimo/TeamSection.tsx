import { SectionTitle } from "./SectionTitle";
import { SELLERS } from "./SellersModal";
import { Heart, MessageCircle } from "lucide-react";

const WA_MSG = (name: string) =>
  encodeURIComponent(
    `Oiê, ${name}! 💕 Vim pelo site da MIMÔ e me apaixonei pelos mimos de vocês ✨ Será que dá pra você me ajudar com um orçamento super especial?`,
  );

export function TeamSection() {
  return (
    <section id="equipe" className="max-w-6xl mx-auto px-4 py-20">
      <SectionTitle>Nossa Equipe</SectionTitle>
      <h2 className="mimo-reveal text-center mt-5 text-3xl md:text-5xl font-black text-[#3a1a2f]" style={{ animationDelay: ".1s" }}>
        Quem faz a{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg, #F97FAF, #C77FC2)" }}
        >
          magia acontecer
        </span>
      </h2>
      <p className="mimo-reveal text-center text-[#7a4a64] mt-3 max-w-xl mx-auto" style={{ animationDelay: ".2s" }}>
        Somos uma dupla apaixonada por transformar festas em lembranças que ficam para sempre.
        Pode chamar qualquer uma de nós — o carinho é o mesmo.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {SELLERS.map((s, i) => (
          <div
            key={s.name}
            className="mimo-reveal relative bg-white rounded-[24px] p-7 pt-16 text-center border border-[#f3dfe7] shadow-[0_10px_30px_-12px_rgba(199,127,194,.25)]"
            style={{ animationDelay: `${0.15 * i}s` }}
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div
                className="h-24 w-24 rounded-full grid place-items-center border-4 border-white overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #F97FAF, #C77FC2)",
                  boxShadow: "0 12px 28px -10px rgba(199,127,194,.55)",
                }}
              >
                <img src={s.doll} alt={s.name} width={96} height={96} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#3a1a2f]">{s.name}</h3>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#C77FC2]">
              <Heart className="h-4 w-4 fill-[#C77FC2]" /> {s.role}
            </p>
            <p className="mt-3 text-sm text-[#7a4a64] leading-relaxed">{s.desc}</p>

            <a
              href={`https://wa.me/${s.phone}?text=${WA_MSG(s.name)}`}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm shadow-md hover:scale-105 transition-transform"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="h-4 w-4" /> Chamar {s.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}