import { useEffect, useState } from "react";
import { X } from "lucide-react";
import mahyraDoll from "@/assets/mahyra-doll.png";
import halexiaDoll from "@/assets/halexia-doll.png";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" className={className} fill="currentColor" aria-hidden>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  );
}

export const SELLERS = [
  {
    name: "Mahyra",
    role: "Atendimento & criação",
    phoneDisplay: "(85) 98626-9902",
    phone: "5585986269902",
    doll: mahyraDoll,
    desc: "Desenha, cria e dá vida a cada peça com muito carinho.",
  },
  {
    name: "Halexia",
    role: "Atendimento & criação",
    phoneDisplay: "(85) 99414-8941",
    phone: "5585994148941",
    doll: halexiaDoll,
    desc: "Cuida do seu pedido do primeiro \"oi\" até o seu mimo chegar.",
  },
];

export function openSellersModal() {
  window.dispatchEvent(new Event("mimo:open-sellers"));
}

export function SellersModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("mimo:open-sellers", handler);
    return () => window.removeEventListener("mimo:open-sellers", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm grid place-items-center p-4 animate-in fade-in duration-200"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-[#FEF5F6] rounded-[24px] p-6 md:p-8 shadow-2xl border-2 border-[#F97FAF] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full border-2 border-[#F97FAF] text-[#F97FAF] bg-white hover:scale-110 transition-transform"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="text-2xl md:text-3xl font-black text-center text-[#3a1a2f]">
          Com quem você quer falar?
        </h3>
        <p className="mt-2 text-center text-sm text-[#7a4a64]">
          Nossas mimosas estão prontinhas para te atender 💕
        </p>

        <div className="mt-6 space-y-3">
          {SELLERS.map((s) => (
            <a
              key={s.name}
              href={`https://wa.me/${s.phone}?text=${encodeURIComponent("Oiê, " + s.name + "! 💕 Vim pelo site da MIMÔ e me apaixonei pelos mimos de vocês ✨ Será que dá pra você me ajudar com um orçamento super especial?")}`}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-4 bg-white rounded-[18px] p-3 pr-4 border-2 border-transparent hover:border-[#F97FAF] transition-all hover:-translate-y-0.5 shadow-sm"
            >
              <span
                className="h-14 w-14 shrink-0 rounded-full overflow-hidden border-2 border-white grid place-items-center"
                style={{ background: "linear-gradient(135deg, #F97FAF, #C77FC2)", boxShadow: "0 6px 16px -6px rgba(199,127,194,.5)" }}
              >
                <img src={s.doll} alt={s.name} width={56} height={56} loading="lazy" className="h-full w-full object-cover" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-extrabold text-[#3a1a2f]">Falar com {s.name}</span>
                <span className="block text-sm text-[#7a4a64]">{s.phoneDisplay}</span>
              </span>
              <span
                className="h-10 w-10 shrink-0 grid place-items-center rounded-full text-white transition-transform group-hover:scale-110"
                style={{ backgroundColor: "#25D366" }}
                aria-hidden
              >
                <WhatsAppIcon className="h-5 w-5" />
              </span>
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[#7a4a64]">
          As duas atendem com o mesmo carinho — escolha quem preferir!
        </p>
      </div>
    </div>
  );
}