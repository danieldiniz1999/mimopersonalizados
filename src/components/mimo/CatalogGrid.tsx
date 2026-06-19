import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useProducts, type Product } from "@/lib/products-store";

function ProductPlaceholder({ hue, image, name }: { hue: number; image?: string; name?: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name ?? "Produto"}
        className="aspect-square sm:aspect-[4/3] w-full rounded-[20px] object-cover"
      />
    );
  }
  return (
    <div
      className="aspect-square sm:aspect-[4/3] w-full rounded-[20px] grid place-items-center text-4xl"
      style={{ background: `linear-gradient(135deg, hsl(${hue} 90% 92%), hsl(${(hue + 30) % 360} 90% 85%))` }}
    >
      🎁
    </div>
  );
}

export function CatalogGrid({ limit }: { limit?: number }) {
  const all = useProducts();
  const products: Product[] = limit ? all.slice(0, limit) : all;
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox !== null) {
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [lightbox]);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p, i) => (
          <article key={p.id} className="mimo-reveal mimo-card relative" style={{ animationDelay: `${0.1 * i}s` }}>
            {p.isNew && (
              <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-black text-[#3a1a2f]" style={{ backgroundColor: "#D5DB1F" }}>
                NOVIDADE!
              </span>
            )}
            <div className="relative">
              <button
                onClick={() => setLightbox(p.id)}
                className="block w-full overflow-hidden rounded-[20px] mimo-float"
                style={{ animationDelay: `${(i % 5) * 0.4}s` }}
                aria-label={`Ampliar ${p.name}`}
              >
                <div className="transition-transform duration-500 hover:scale-110">
                  <ProductPlaceholder hue={p.hue} image={p.image} name={p.name} />
                </div>
              </button>
              <a
                href={p.image ?? "#"}
                download={p.image ? `${p.name}.png` : undefined}
                onClick={(e) => { if (!p.image) e.preventDefault(); }}
                aria-label={`Baixar imagem de ${p.name}`}
                className="mimo-btn mimo-btn-lilac absolute bottom-2 right-2 h-9 w-9 !p-0 grid place-items-center rounded-full shadow-md z-10"
              >
                <Download className="h-4 w-4" />
              </a>
            </div>
            <h3 className="mt-4 font-bold text-[#5b2b48]">{p.name}</h3>
          </article>
        ))}
      </div>

      {lightbox !== null && (() => {
        const product = products.find((p) => p.id === lightbox) ?? all.find((p) => p.id === lightbox);
        return (
          <div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm grid place-items-center p-4 animate-in fade-in duration-300"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute top-4 right-4 h-12 w-12 grid place-items-center rounded-full bg-white text-[#F97FAF] shadow-lg hover:scale-110 transition-transform"
              onClick={() => setLightbox(null)}
              aria-label="Fechar"
            >
              <X />
            </button>
            <div
              className="w-full max-w-3xl bg-white rounded-[24px] p-4 md:p-6 shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-[20px]">
                {product?.image ? (
                  <img src={product.image} alt={product.name} className="w-full aspect-[4/3] object-cover rounded-[20px]" />
                ) : (
                  <div className="aspect-[4/3] w-full rounded-[20px] grid place-items-center text-8xl md:text-9xl"
                    style={{ background: `linear-gradient(135deg, hsl(${product?.hue ?? 330} 90% 92%), hsl(${((product?.hue ?? 330) + 30) % 360} 90% 85%))` }}>
                    🎁
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <h3 className="text-lg md:text-xl font-extrabold text-[#5b2b48]">{product?.name}</h3>
                <a
                  href={product?.image ?? "#"}
                  download={product?.image ? `${product?.name}.png` : undefined}
                  onClick={(e) => { if (!product?.image) e.preventDefault(); }}
                  aria-label={`Baixar imagem de ${product?.name}`}
                  className="mimo-btn mimo-btn-lilac h-11 w-11 !p-0 grid place-items-center rounded-full shadow-md"
                >
                  <Download className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}