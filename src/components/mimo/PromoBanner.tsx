export function PromoBanner() {
  return (
    <div className="relative py-10 md:py-14 overflow-visible">
      {/* Balões decorativos — esquerda */}
      <svg
        aria-hidden
        viewBox="0 0 240 320"
        className="hidden sm:block absolute left-0 md:left-2 top-2 w-[140px] md:w-[180px] pointer-events-none"
      >
        <defs>
          <radialGradient id="pbPink" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffe1ee" />
            <stop offset="55%" stopColor="#F97FAF" />
            <stop offset="100%" stopColor="#c95a86" />
          </radialGradient>
          <radialGradient id="pbYellow" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff6a8" />
            <stop offset="60%" stopColor="#F2D74E" />
            <stop offset="100%" stopColor="#b89320" />
          </radialGradient>
        </defs>
        {/* fios */}
        <path d="M70 150 C 74 200, 82 250, 86 320" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".45" />
        <path d="M150 140 C 146 200, 138 260, 132 320" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".45" />
        {/* balão coração */}
        <g className="mimo-float" style={{ animationDelay: "0s" }}>
          <path
            d="M70 30 C 55 8, 25 18, 32 50 C 39 82, 70 110, 70 122 C 70 110, 101 82, 108 50 C 115 18, 85 8, 70 30 Z"
            fill="url(#pbPink)"
          />
          <ellipse cx="55" cy="40" rx="5" ry="8" fill="#fff" opacity=".5" />
          <polygon points="68,124 72,124 70,134" fill="#c95a86" />
        </g>
        {/* balão amarelo */}
        <g className="mimo-float" style={{ animationDelay: ".8s" }}>
          <ellipse cx="155" cy="80" rx="26" ry="33" fill="url(#pbYellow)" />
          <ellipse cx="147" cy="68" rx="4" ry="7" fill="#fff" opacity=".5" />
          <polygon points="153,113 157,113 155,122" fill="#b89320" />
        </g>
      </svg>

      {/* Balões decorativos — direita */}
      <svg
        aria-hidden
        viewBox="0 0 200 320"
        className="hidden sm:block absolute right-0 md:right-2 top-6 w-[120px] md:w-[160px] pointer-events-none"
      >
        <defs>
          <radialGradient id="pbBlue" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#dff1ff" />
            <stop offset="60%" stopColor="#7CC9F0" />
            <stop offset="100%" stopColor="#3e91bf" />
          </radialGradient>
          <radialGradient id="pbPink2" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffe1ee" />
            <stop offset="55%" stopColor="#F97FAF" />
            <stop offset="100%" stopColor="#c95a86" />
          </radialGradient>
        </defs>
        <path d="M70 130 C 74 190, 82 250, 86 320" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".45" />
        <path d="M140 150 C 136 210, 128 270, 122 320" stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".45" />
        <g className="mimo-float" style={{ animationDelay: ".3s" }}>
          <ellipse cx="70" cy="80" rx="28" ry="35" fill="url(#pbBlue)" />
          <ellipse cx="61" cy="68" rx="5" ry="8" fill="#fff" opacity=".5" />
          <polygon points="68,115 72,115 70,124" fill="#3e91bf" />
        </g>
        <g className="mimo-float" style={{ animationDelay: "1.1s" }}>
          <ellipse cx="140" cy="95" rx="24" ry="30" fill="url(#pbPink2)" />
          <ellipse cx="133" cy="84" rx="4" ry="6" fill="#fff" opacity=".5" />
          <polygon points="138,125 142,125 140,134" fill="#c95a86" />
        </g>
      </svg>

      {/* Confetes sutis */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <span className="absolute left-[28%] top-[12%] h-1.5 w-1.5 rotate-45 rounded-full bg-[#F97FAF]/60" />
        <span className="absolute left-[42%] top-[6%] h-1 w-1 rounded-full bg-[#D5DB1F]" />
        <span className="absolute right-[32%] top-[14%] h-1.5 w-1.5 rotate-12 rounded-sm bg-[#7CC9F0]/70" />
        <span className="absolute right-[40%] bottom-[18%] h-1 w-1 rounded-full bg-[#F97FAF]/70" />
        <span className="absolute left-[36%] bottom-[10%] h-1.5 w-1.5 rotate-12 rounded-sm bg-[#D5DB1F]/80" />
      </div>

      {/* Conteúdo central */}
      <div className="relative flex flex-col items-center text-center px-4">
        <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#F97FAF]">
          <span className="h-px w-10 bg-[#F97FAF]/40" />
          Oferta por tempo limitado
          <span className="h-px w-10 bg-[#F97FAF]/40" />
        </span>

        <h2
          className="mt-4 font-black text-[#5b2b48] tracking-tight leading-[0.95]"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
        >
          Promoção <span className="italic text-[#F97FAF]">Mimô</span>
        </h2>

        <p className="mt-3 text-sm md:text-base text-[#7a4a64] max-w-md">
          Leve mais lembrancinhas para a sua festa — o mimo extra fica por nossa conta.
        </p>

        {/* Oferta tipográfica */}
        <div className="mt-8 flex flex-wrap items-end justify-center gap-x-8 gap-y-5 md:gap-x-12">
          <div className="text-center">
            <div className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#7a4a64]">Compre</div>
            <div className="mt-1.5 flex items-baseline gap-1.5 justify-center font-black text-[#5b2b48] leading-none">
              <span style={{ fontSize: "clamp(2.6rem, 5.5vw, 3.75rem)" }}>100</span>
              <span className="text-sm md:text-base font-extrabold text-[#7a4a64] tracking-wide">caixinhas</span>
            </div>
          </div>

          <div aria-hidden className="self-center text-2xl md:text-3xl font-light text-[#F97FAF]/70 pb-2">
            +
          </div>

          <div className="text-center">
            <div className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#F97FAF]">Ganhe</div>
            <div className="mt-1.5 flex items-baseline gap-1.5 justify-center font-black text-[#F97FAF] leading-none">
              <span style={{ fontSize: "clamp(2.6rem, 5.5vw, 3.75rem)" }}>20</span>
              <span className="text-sm md:text-base font-extrabold tracking-wide">sacolas</span>
            </div>
            <div className="mt-2 inline-block text-[10px] font-black tracking-[0.22em] uppercase text-[#3a1a2f] bg-[#D5DB1F] px-2.5 py-1 rounded-full">
              Grátis
            </div>
          </div>
        </div>

        {/* divisor */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-[#f3c6d5]" />
          <span className="text-[#F97FAF] text-xs">✦</span>
          <span className="h-px w-14 bg-[#f3c6d5]" />
        </div>

        <p className="mt-3 text-xs md:text-sm text-[#7a4a64] italic">
          Aproveite enquanto durar
        </p>
      </div>
    </div>
  );
}