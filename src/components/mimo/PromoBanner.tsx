export function PromoBanner() {
  return (
    <div className="relative py-8 md:py-12 px-4">
      <div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-[#f3c6d5] bg-gradient-to-b from-[#fff7fb] via-white to-[#fff1f6] px-6 py-12 md:px-14 md:py-16 text-center shadow-[0_20px_60px_-30px_rgba(91,43,72,0.35)]"
      >
        {/* Brilhos de fundo */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full bg-[#F97FAF]/10 blur-3xl" />
          <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#D5DB1F]/10 blur-3xl" />
        </div>

        {/* Balões nos cantos */}
        <svg aria-hidden viewBox="0 0 140 200" className="pointer-events-none absolute -top-2 -left-2 md:top-4 md:left-4 hidden sm:block w-20 md:w-24 h-auto mimo-float" style={{ animationDelay: "0s" }}>
          <defs>
            <radialGradient id="pbHeart" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffe1ee" /><stop offset="55%" stopColor="#F97FAF" /><stop offset="100%" stopColor="#c95a86" />
            </radialGradient>
          </defs>
          <path d="M70 50 C 55 28, 26 36, 32 64 C 38 92, 70 114, 70 126 C 70 114, 102 92, 108 64 C 114 36, 85 28, 70 50 Z" fill="url(#pbHeart)" stroke="#5b2b48" strokeWidth="1" />
          <ellipse cx="55" cy="58" rx="5" ry="8" fill="#fff" opacity=".6" />
          <path d="M70 128 C 74 150, 66 170, 74 198" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".55" />
        </svg>

        <svg aria-hidden viewBox="0 0 140 200" className="pointer-events-none absolute top-6 left-24 md:top-10 md:left-32 hidden md:block w-16 h-auto mimo-float" style={{ animationDelay: ".7s" }}>
          <defs>
            <radialGradient id="pbYel" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fff6a8" /><stop offset="60%" stopColor="#D5DB1F" /><stop offset="100%" stopColor="#9ea317" />
            </radialGradient>
          </defs>
          <ellipse cx="70" cy="60" rx="32" ry="40" fill="url(#pbYel)" stroke="#5b2b48" strokeWidth="1" />
          <ellipse cx="60" cy="46" rx="5" ry="8" fill="#fff" opacity=".6" />
          <polygon points="67,102 73,102 70,112" fill="#9ea317" />
          <path d="M70 112 C 74 138, 64 160, 72 198" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".55" />
        </svg>

        <svg aria-hidden viewBox="0 0 140 200" className="pointer-events-none absolute -top-2 -right-2 md:top-4 md:right-4 hidden sm:block w-20 md:w-24 h-auto mimo-float" style={{ animationDelay: ".4s" }}>
          <defs>
            <radialGradient id="pbBlu" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#dff1ff" /><stop offset="60%" stopColor="#7CC9F0" /><stop offset="100%" stopColor="#3e91bf" />
            </radialGradient>
          </defs>
          <ellipse cx="70" cy="60" rx="34" ry="42" fill="url(#pbBlu)" stroke="#5b2b48" strokeWidth="1" />
          <ellipse cx="60" cy="46" rx="5" ry="8" fill="#fff" opacity=".6" />
          <polygon points="67,104 73,104 70,114" fill="#3e91bf" />
          <path d="M70 114 C 66 140, 76 162, 68 198" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".55" />
        </svg>

        <svg aria-hidden viewBox="0 0 140 200" className="pointer-events-none absolute top-6 right-24 md:top-10 md:right-32 hidden md:block w-16 h-auto mimo-float" style={{ animationDelay: "1.1s" }}>
          <defs>
            <radialGradient id="pbLil" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#f3dcef" /><stop offset="60%" stopColor="#C77FC2" /><stop offset="100%" stopColor="#8c4d8a" />
            </radialGradient>
          </defs>
          <ellipse cx="70" cy="60" rx="30" ry="38" fill="url(#pbLil)" stroke="#5b2b48" strokeWidth="1" />
          <ellipse cx="60" cy="46" rx="5" ry="8" fill="#fff" opacity=".6" />
          <polygon points="67,100 73,100 70,110" fill="#8c4d8a" />
          <path d="M70 110 C 74 134, 66 158, 72 198" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".55" />
        </svg>

        {/* CONTEÚDO */}
        <div className="relative flex flex-col items-center">
          {/* etiqueta */}
          <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#F97FAF]">
            <span className="h-px w-10 bg-[#F97FAF]/40" />
            Edição limitada
            <span className="h-px w-10 bg-[#F97FAF]/40" />
          </span>

          {/* Título tipográfico */}
          <h2
            className="mt-5 font-serif italic text-[#5b2b48] leading-[0.95]"
            style={{ fontFamily: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem, 7vw, 5rem)" }}
          >
            Promo<span className="text-[#F97FAF]">ção</span>{" "}
            <span className="text-[#C77FC2]">Mimô</span>
          </h2>

          {/* divisor */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#f3c6d5]" />
            <span className="text-[#F97FAF] text-xs">✦</span>
            <span className="h-px w-16 bg-[#f3c6d5]" />
          </div>

          <p className="mt-5 text-sm md:text-base text-[#7a4a64] max-w-md">
            Leve mais lembrancinhas para a sua festa — o mimo extra fica por nossa conta.
          </p>

          {/* OFERTA */}
          <div className="mt-8 flex flex-wrap items-end justify-center gap-x-10 gap-y-5 md:gap-x-14">
            <div className="text-center">
              <div className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#7a4a64]">Compre</div>
              <div className="mt-1.5 flex items-baseline gap-2 justify-center font-black text-[#5b2b48] leading-none">
                <span style={{ fontSize: "clamp(2.6rem, 5.5vw, 3.75rem)" }}>100</span>
                <span className="text-sm md:text-base font-extrabold text-[#7a4a64] tracking-wide">caixinhas</span>
              </div>
            </div>

            <div aria-hidden className="self-center text-2xl md:text-3xl font-light text-[#F97FAF]/70 pb-2">+</div>

            <div className="text-center">
              <div className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#F97FAF]">Ganhe</div>
              <div className="mt-1.5 flex items-baseline gap-2 justify-center font-black text-[#F97FAF] leading-none">
                <span style={{ fontSize: "clamp(2.6rem, 5.5vw, 3.75rem)" }}>20</span>
                <span className="text-sm md:text-base font-extrabold tracking-wide">sacolas</span>
              </div>
              <div className="mt-2 inline-block text-[10px] font-black tracking-[0.22em] uppercase text-[#3a1a2f] bg-[#D5DB1F] px-2.5 py-1 rounded-full">
                Grátis
              </div>
            </div>
          </div>

          <p className="mt-7 text-xs md:text-sm text-[#7a4a64] italic">
            Aproveite enquanto durar
          </p>
        </div>
      </div>
    </div>
  );
}