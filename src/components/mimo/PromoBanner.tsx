export function PromoBanner() {
  return (
    <div className="relative py-6 md:py-8">
      {/* etiqueta + título */}
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.28em] uppercase text-[#F97FAF]">
          <span className="h-px w-8 bg-[#F97FAF]/40" />
          Oferta por tempo limitado
          <span className="h-px w-8 bg-[#F97FAF]/40" />
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#5b2b48] tracking-tight">
          Promoção <span className="text-[#F97FAF]">Mimô</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-[#7a4a64] max-w-xl">
          Leve mais lembrancinhas para a sua festa e ganhe um mimo extra por nossa conta.
        </p>
      </div>

      {/* oferta */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-10">
        <div className="text-center">
          <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#7a4a64]">Compre</div>
          <div className="mt-1 font-black text-[#5b2b48] leading-none">
            <span className="text-4xl md:text-5xl">100</span>
            <span className="ml-1 text-base md:text-lg font-extrabold text-[#7a4a64]">caixinhas</span>
          </div>
        </div>

        <div aria-hidden className="text-2xl md:text-3xl font-light text-[#F97FAF]">+</div>

        <div className="text-center">
          <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#F97FAF]">Ganhe</div>
          <div className="mt-1 font-black text-[#F97FAF] leading-none">
            <span className="text-4xl md:text-5xl">20</span>
            <span className="ml-1 text-base md:text-lg font-extrabold">sacolas</span>
          </div>
          <div className="mt-1.5 inline-block text-[10px] font-black tracking-[0.18em] uppercase text-[#3a1a2f] bg-[#D5DB1F] px-2 py-0.5 rounded-full">
            Grátis
          </div>
        </div>
      </div>

      {/* divisor delicado */}
      <div className="mt-7 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-[#f3c6d5]" />
        <span className="text-[#F97FAF] text-xs">✦</span>
        <span className="h-px w-16 bg-[#f3c6d5]" />
      </div>

      <p className="mt-3 text-center text-xs md:text-sm text-[#7a4a64] italic">
        Aproveite enquanto durar
      </p>
    </div>
  );
}