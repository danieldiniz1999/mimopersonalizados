import promoTitulo from "@/assets/promocao-titulo.png.asset.json";

export function PromoBanner() {
  return (
    <div className="relative py-6 md:py-10 px-4">
      <div className="relative mx-auto max-w-3xl flex justify-center">
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
