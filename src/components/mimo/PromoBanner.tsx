export function PromoBanner() {
  return (
    <div className="relative py-10 md:py-14 overflow-visible">
      <div className="relative flex flex-col items-center text-center px-4">
        {/* Etiqueta superior */}
        <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.32em] uppercase text-[#F97FAF]">
          <span className="h-px w-10 bg-[#F97FAF]/40" />
          Edição limitada
          <span className="h-px w-10 bg-[#F97FAF]/40" />
        </span>

        {/* TÍTULO ARTÍSTICO com balões integrados */}
        <div className="relative mt-5 mx-auto w-full max-w-[720px]">
          <svg
            viewBox="0 0 720 280"
            className="w-full h-auto"
            aria-label="Promoção Mimô"
          >
            <defs>
              <radialGradient id="pbHeart" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffe1ee" />
                <stop offset="55%" stopColor="#F97FAF" />
                <stop offset="100%" stopColor="#c95a86" />
              </radialGradient>
              <radialGradient id="pbYel" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fff6a8" />
                <stop offset="60%" stopColor="#D5DB1F" />
                <stop offset="100%" stopColor="#9ea317" />
              </radialGradient>
              <radialGradient id="pbBlu" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#dff1ff" />
                <stop offset="60%" stopColor="#7CC9F0" />
                <stop offset="100%" stopColor="#3e91bf" />
              </radialGradient>
              <radialGradient id="pbLil" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#f3dcef" />
                <stop offset="60%" stopColor="#C77FC2" />
                <stop offset="100%" stopColor="#8c4d8a" />
              </radialGradient>
            </defs>

            {/* Cachos de fios convergindo no centro */}
            <g stroke="#5b2b48" strokeWidth="1" fill="none" opacity=".5" strokeLinecap="round">
              <path d="M118 92  C 200 110, 280 130, 360 158" />
              <path d="M195 60  C 240 95,  300 130, 360 158" />
              <path d="M285 48  C 310 90,  335 130, 360 158" />
              <path d="M610 95  C 540 115, 460 135, 360 158" />
              <path d="M535 62  C 500 100, 440 132, 360 158" />
              <path d="M445 50  C 425 95,  395 130, 360 158" />
            </g>

            {/* nó central onde os fios se encontram */}
            <circle cx="360" cy="158" r="3.5" fill="#5b2b48" />

            {/* BALÕES — esquerda */}
            <g className="mimo-float" style={{ animationDelay: "0s" }}>
              {/* coração rosa */}
              <path
                d="M118 50 C 105 30, 78 38, 84 64 C 90 90, 118 110, 118 120 C 118 110, 146 90, 152 64 C 158 38, 131 30, 118 50 Z"
                fill="url(#pbHeart)"
              />
              <ellipse cx="105" cy="58" rx="5" ry="8" fill="#fff" opacity=".55" />
              <polygon points="116,120 120,120 118,128" fill="#c95a86" />
            </g>
            <g className="mimo-float" style={{ animationDelay: ".5s" }}>
              {/* amarelo */}
              <ellipse cx="195" cy="60" rx="26" ry="32" fill="url(#pbYel)" />
              <ellipse cx="187" cy="49" rx="4.5" ry="7" fill="#fff" opacity=".55" />
              <polygon points="193,92 197,92 195,100" fill="#9ea317" />
            </g>
            <g className="mimo-float" style={{ animationDelay: "1s" }}>
              {/* lilás pequeno */}
              <ellipse cx="285" cy="50" rx="20" ry="25" fill="url(#pbLil)" />
              <ellipse cx="279" cy="42" rx="3.5" ry="6" fill="#fff" opacity=".55" />
              <polygon points="283,75 287,75 285,82" fill="#8c4d8a" />
            </g>

            {/* BALÕES — direita */}
            <g className="mimo-float" style={{ animationDelay: ".8s" }}>
              {/* azul */}
              <ellipse cx="610" cy="60" rx="26" ry="33" fill="url(#pbBlu)" />
              <ellipse cx="601" cy="48" rx="4.5" ry="7" fill="#fff" opacity=".55" />
              <polygon points="608,93 612,93 610,101" fill="#3e91bf" />
            </g>
            <g className="mimo-float" style={{ animationDelay: ".2s" }}>
              {/* rosa redondo */}
              <ellipse cx="535" cy="58" rx="24" ry="30" fill="url(#pbHeart)" />
              <ellipse cx="527" cy="48" rx="4.5" ry="7" fill="#fff" opacity=".55" />
              <polygon points="533,88 537,88 535,96" fill="#c95a86" />
            </g>
            <g className="mimo-float" style={{ animationDelay: "1.3s" }}>
              {/* amarelo pequeno */}
              <ellipse cx="445" cy="52" rx="18" ry="22" fill="url(#pbYel)" />
              <ellipse cx="439" cy="44" rx="3.5" ry="5.5" fill="#fff" opacity=".55" />
              <polygon points="443,74 447,74 445,80" fill="#9ea317" />
            </g>

            {/* Wordmark "Mimô" — script-like flowing serif */}
            <text
              x="360" y="218"
              textAnchor="middle"
              fontFamily="'Instrument Serif', 'Cormorant Garamond', Georgia, serif"
              fontStyle="italic"
              fontWeight="400"
              fontSize="92"
              fill="#5b2b48"
            >
              Promo<tspan fill="#F97FAF">ção</tspan>
            </text>

            {/* sublinha decorativa */}
            <path
              d="M205 240 C 280 256, 440 256, 515 240"
              stroke="#F97FAF"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              opacity=".85"
            />
            <circle cx="200" cy="240" r="2.5" fill="#D5DB1F" />
            <circle cx="520" cy="240" r="2.5" fill="#7CC9F0" />

            {/* selo Mimô — abaixo, à direita */}
            <g transform="translate(545 270) rotate(-6)">
              <text
                fontFamily="'Instrument Serif', Georgia, serif"
                fontStyle="italic"
                fontSize="30"
                fill="#C77FC2"
              >
                by Mimô
              </text>
            </g>

            {/* confetes ao redor */}
            <g>
              <rect x="65"  y="120" width="4" height="4" fill="#D5DB1F" transform="rotate(20 67 122)" />
              <circle cx="660" cy="125" r="2" fill="#F97FAF" />
              <rect x="370" y="22"  width="3" height="3" fill="#7CC9F0" transform="rotate(35 371 23)" />
              <circle cx="50"  cy="180" r="2" fill="#C77FC2" />
              <circle cx="678" cy="200" r="2.2" fill="#D5DB1F" />
              <rect x="340" y="258" width="3" height="3" fill="#F97FAF" transform="rotate(25 341 260)" />
            </g>
          </svg>
        </div>

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