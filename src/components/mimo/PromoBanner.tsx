export function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border-4 border-white shadow-[0_20px_50px_-20px_rgba(249,127,175,0.55)]"
         style={{ background: "linear-gradient(135deg, #ffe0ec 0%, #ffd1e3 45%, #ffc1d7 100%)" }}>
      {/* confetes */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <span className="absolute left-[6%] top-[18%] h-2 w-2 rotate-12 rounded-sm bg-[#F97FAF]" />
        <span className="absolute left-[14%] top-[70%] h-2.5 w-2.5 -rotate-12 rounded-sm bg-[#D5DB1F]" />
        <span className="absolute left-[28%] top-[10%] h-1.5 w-1.5 rotate-45 rounded-full bg-[#5b2b48]" />
        <span className="absolute right-[10%] top-[22%] h-2 w-2 rotate-12 rounded-sm bg-[#D5DB1F]" />
        <span className="absolute right-[20%] top-[78%] h-2.5 w-2.5 -rotate-12 rounded-full bg-[#F97FAF]" />
        <span className="absolute right-[6%] top-[55%] h-2 w-2 rotate-45 rounded-sm bg-white" />
        <span className="absolute left-[45%] top-[8%] h-1.5 w-1.5 rounded-full bg-white" />
        <span className="absolute left-[60%] bottom-[12%] h-2 w-2 rotate-12 rounded-sm bg-[#F97FAF]" />
      </div>

      <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-4 items-center px-5 sm:px-8 py-8 md:py-10">
        {/* lado esquerdo: balões + título */}
        <div className="relative flex items-center gap-4 sm:gap-6 justify-center md:justify-start">
          {/* balões */}
          <svg
            viewBox="0 0 220 220"
            className="w-[140px] sm:w-[180px] md:w-[200px] shrink-0 drop-shadow-[0_8px_14px_rgba(91,43,72,0.18)]"
            aria-hidden
          >
            <defs>
              <radialGradient id="balPink" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffd0e2" />
                <stop offset="60%" stopColor="#F97FAF" />
                <stop offset="100%" stopColor="#d95a8d" />
              </radialGradient>
              <radialGradient id="balYellow" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fff7a8" />
                <stop offset="60%" stopColor="#F2D74E" />
                <stop offset="100%" stopColor="#caa92a" />
              </radialGradient>
              <radialGradient id="balBlue" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#d6f0ff" />
                <stop offset="60%" stopColor="#7CC9F0" />
                <stop offset="100%" stopColor="#3e91bf" />
              </radialGradient>
            </defs>

            {/* fios */}
            <path d="M70 130 C 72 160, 78 180, 80 210" stroke="#5b2b48" strokeWidth="1.5" fill="none" opacity=".7" />
            <path d="M150 120 C 148 150, 142 180, 138 210" stroke="#5b2b48" strokeWidth="1.5" fill="none" opacity=".7" />
            <path d="M120 140 C 118 165, 112 190, 108 210" stroke="#5b2b48" strokeWidth="1.5" fill="none" opacity=".7" />

            {/* balão coração (rosa) */}
            <g className="mimo-float" style={{ animationDelay: "0s" }}>
              <path
                d="M70 25 C 55 5, 25 15, 30 45 C 35 75, 70 100, 70 110 C 70 100, 105 75, 110 45 C 115 15, 85 5, 70 25 Z"
                fill="url(#balPink)"
                stroke="#5b2b48"
                strokeWidth="1.5"
              />
              <ellipse cx="55" cy="35" rx="6" ry="9" fill="#fff" opacity=".55" />
              <polygon points="68,112 72,112 70,120" fill="#d95a8d" />
            </g>

            {/* balão azul */}
            <g className="mimo-float" style={{ animationDelay: ".6s" }}>
              <ellipse cx="120" cy="70" rx="28" ry="35" fill="url(#balBlue)" stroke="#5b2b48" strokeWidth="1.5" />
              <ellipse cx="111" cy="58" rx="5" ry="8" fill="#fff" opacity=".55" />
              <polygon points="118,104 122,104 120,112" fill="#3e91bf" />
            </g>

            {/* balão amarelo */}
            <g className="mimo-float" style={{ animationDelay: "1.1s" }}>
              <ellipse cx="170" cy="80" rx="26" ry="33" fill="url(#balYellow)" stroke="#5b2b48" strokeWidth="1.5" />
              <ellipse cx="162" cy="68" rx="5" ry="7" fill="#fff" opacity=".55" />
              <polygon points="168,112 172,112 170,120" fill="#caa92a" />
            </g>
          </svg>

          {/* título Promoção */}
          <div className="relative">
            <h2
              className="font-black leading-none text-[#F97FAF] tracking-tight italic select-none"
              style={{
                fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
                textShadow:
                  "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 6px 0 #d95a8d, 0 10px 14px rgba(91,43,72,.25)",
                transform: "rotate(-4deg)",
              }}
            >
              Promoção
            </h2>
            <span
              className="absolute -right-3 -top-3 h-7 w-7 rounded-full grid place-items-center text-xs font-black text-[#3a1a2f] rotate-12 shadow-md"
              style={{ backgroundColor: "#D5DB1F" }}
            >
              ✦
            </span>
          </div>
        </div>

        {/* lado direito: oferta */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <div className="rounded-2xl bg-[#F97FAF] text-white px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_8px_0_#c95a86] border-2 border-white">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-90">Compre</div>
              <div className="font-black leading-none text-2xl sm:text-3xl">100 <span className="text-base sm:text-lg font-extrabold">caixinhas</span></div>
            </div>
            <span className="text-3xl sm:text-4xl font-black text-[#5b2b48]">+</span>
            <div className="rounded-2xl bg-[#7CC9F0] text-white px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_8px_0_#4f9cc4] border-2 border-white">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-95">Ganhe</div>
              <div className="font-black leading-none text-2xl sm:text-3xl">20 <span className="text-base sm:text-lg font-extrabold">sacolas</span></div>
              <div className="text-[10px] sm:text-xs font-black mt-0.5 inline-block bg-white text-[#3e91bf] px-1.5 py-0.5 rounded-full">GRÁTIS</div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#5b2b48] font-bold text-center md:text-right">
            Aproveite enquanto durar 💕
          </p>
        </div>
      </div>
    </div>
  );
}