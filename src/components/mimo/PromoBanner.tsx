import promoTitulo from "@/assets/promocao-titulo.png.asset.json";

export function PromoBanner() {
  return (
    <div className="relative py-6 md:py-10 px-4">
      <div className="relative mx-auto max-w-3xl flex justify-center rounded-[28px] bg-[#fbcad9] px-6 py-8 md:px-10 md:py-10 shadow-[0_15px_40px_-25px_rgba(91,43,72,0.35)]">
        <img
          src={promoTitulo.url}
          alt="Promoção Mimô — 100 caixinhas + 20 sacolas grátis"
          className="w-full h-auto select-none pointer-events-none mimo-float"
          draggable={false}
        />
      </div>
    </div>
  );
}
