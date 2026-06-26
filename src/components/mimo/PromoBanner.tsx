import promoTitulo from "@/assets/promocao-titulo.png.asset.json";

export function PromoBanner() {
  return (
    <div className="relative py-6 md:py-10 px-4">
      <div className="relative mx-auto w-full max-w-6xl flex justify-center rounded-[32px] bg-[#fbcad9] px-8 py-12 md:px-16 md:py-16 shadow-[0_20px_50px_-25px_rgba(91,43,72,0.35)]">
        <img
          src={promoTitulo.url}
          alt="Promoção Mimô — 100 caixinhas + 20 sacolas grátis"
          className="w-full max-w-3xl h-auto select-none pointer-events-none mimo-float"
          draggable={false}
        />
      </div>
    </div>
  );
}
