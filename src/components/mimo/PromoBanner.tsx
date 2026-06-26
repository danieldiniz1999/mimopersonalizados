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

        {/* Balões flutuantes — laterais */}
        <svg
          aria-hidden
          viewBox="0 0 200 320"
          className="pointer-events-none absolute left-2 md:left-6 top-1/2 -translate-y-1/2 hidden sm:block h-[78%] w-auto"
        >
          <defs>
            <radialGradient id="pbL1" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffe1ee" />
              <stop offset="55%" stopColor="#F97FAF" />
              <stop offset="100%" stopColor="#c95a86" />
            </radialGradient>
            <radialGradient id="pbL2" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fff6a8" />
              <stop offset="60%" stopColor="#D5DB1F" />
              <stop offset="100%" stopColor="#9ea317" />
            </radialGradient>
          </defs>
          <g className="mimo-float" style={{ animationDelay: "0s" }}>
            <path d="M120 60 C 105 38, 76 46, 82 74 C 88 102, 120 124, 120 136 C 120 124, 152 102, 158 74 C 164 46, 135 38, 120 60 Z" fill="url(#pbL1)" stroke="#5b2b48" strokeWidth="1" />
            <ellipse cx="105" cy="68" rx="5" ry="8" fill="#fff" opacity=".6" />
            <path d="M120 138 C 122 160, 116 180, 122 210" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".5" />
          </g>
          <g className="mimo-float" style={{ animationDelay: ".8s" }}>
            <ellipse cx="60" cy="170" rx="28" ry="34" fill="url(#pbL2)" stroke="#5b2b48" strokeWidth="1" />
            <ellipse cx="52" cy="159" rx="5" ry="7.5" fill="#fff" opacity=".6" />
            <polygon points="58,204 62,204 60,212" fill="#9ea317" />
            <path d="M60 212 C 64 234, 58 252, 66 280" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".5" />
          </g>
        </svg>

        <svg
          aria-hidden
          viewBox="0 0 200 320"
          className="pointer-events-none absolute right-2 md:right-6 top-1/2 -translate-y-1/2 hidden sm:block h-[78%] w-auto"
        >
          <defs>
            <radialGradient id="pbR1" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#dff1ff" />
              <stop offset="60%" stopColor="#7CC9F0" />
              <stop offset="100%" stopColor="#3e91bf" />
            </radialGradient>
            <radialGradient id="pbR2" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#f3dcef" />
              <stop offset="60%" stopColor="#C77FC2" />
              <stop offset="100%" stopColor="#8c4d8a" />
            </radialGradient>
          </defs>
          <g className="mimo-float" style={{ animationDelay: ".4s" }}>
            <ellipse cx="80" cy="70" rx="30" ry="36" fill="url(#pbR1)" stroke="#5b2b48" strokeWidth="1" />
            <ellipse cx="71" cy="58" rx="5" ry="8" fill="#fff" opacity=".6" />
            <polygon points="78,108 82,108 80,116" fill="#3e91bf" />
            <path d="M80 116 C 84 138, 76 156, 84 186" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".5" />
          </g>
          <g className="mimo-float" style={{ animationDelay: "1.1s" }}>
            <ellipse cx="140" cy="180" rx="24" ry="29" fill="url(#pbR2)" stroke="#5b2b48" strokeWidth="1" />
            <ellipse cx="133" cy="170" rx="4.5" ry="6.5" fill="#fff" opacity=".6" />
            <polygon points="138,210 142,210 140,217" fill="#8c4d8a" />
            <path d="M140 217 C 136 238, 144 254, 138 282" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".5" />
          </g>
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