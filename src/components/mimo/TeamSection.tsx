import { SectionTitle } from "./SectionTitle";
import { SELLERS } from "./SellersModal";
import { Heart } from "lucide-react";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" className={className} fill="currentColor" aria-hidden>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}

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
              <WhatsAppIcon className="h-4 w-4" /> Chamar {s.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}