import { useEffect, useState } from "react";
import { Download, X, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { useProducts, useProductsLoading, CATEGORIES, type Product } from "@/lib/products-store";
import { PromoBanner } from "./PromoBanner";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Usa o endpoint de transformação de imagem do Supabase para entregar
// versões redimensionadas e em WebP, reduzindo drasticamente o peso.
function optimizeImage(url: string | undefined, width: number): string | undefined {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (!u.pathname.includes("/storage/v1/object/public/")) return url;
    u.pathname = u.pathname.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/");
    u.searchParams.set("width", String(width));
    u.searchParams.set("quality", "70");
    u.searchParams.set("resize", "cover");
    return u.toString();
  } catch {
    return url;
  }
}

function ProductPlaceholder({ hue, image, name }: { hue: number; image?: string; name?: string }) {
  if (image) {
    const small = optimizeImage(image, 400);
    const medium = optimizeImage(image, 700);
    return (
      <img
        src={small}
        srcSet={small && medium ? `${small} 400w, ${medium} 800w` : undefined}
        sizes="(min-width:1024px) 280px, (min-width:640px) 33vw, 50vw"
        alt={name ?? "Produto"}
        loading="lazy"
        decoding="async"
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

export function CatalogGrid({ limit, groupByCategory }: { limit?: number; groupByCategory?: boolean }) {
  const all = useProducts();
  const loading = useProductsLoading();
  const visible = all.filter((p) => p.active !== false);
  const products: Product[] = limit ? visible.slice(0, limit) : visible;

  const groups = groupByCategory
    ? (() => {
        const list: { key: string; items: Product[]; promo?: boolean }[] = [];
        const promo = products.filter((p) => p.isPromo);
        if (promo.length > 0) list.push({ key: "__promo__", items: promo, promo: true });
        for (const cat of CATEGORIES) {
          const items = products.filter((p) => p.category === cat);
          if (items.length > 0) list.push({ key: cat, items });
        }
        const uncategorized = products.filter((p) => !p.category);
        if (uncategorized.length > 0) list.push({ key: "Outros", items: uncategorized });
        return list;
      })()
    : null;

  const renderCard = (p: Product, i: number) => (
    <article key={p.id} className="mimo-reveal mimo-card relative" style={{ animationDelay: `${0.1 * i}s` }}>
      {p.isNew && (
        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-black text-[#3a1a2f]" style={{ backgroundColor: "#D5DB1F" }}>
          NOVIDADE!
        </span>
      )}
      {p.isKit && (
        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-black text-white bg-[#F97FAF] inline-flex items-center gap-1" style={p.isNew ? { top: "2.6rem" } : undefined}>
          <Package className="h-3 w-3" /> KIT
        </span>
      )}
      {p.isPromo && (
        <span
          className="absolute z-10 px-3 py-1 rounded-full text-xs font-black text-white inline-flex items-center gap-1 shadow-md"
          style={{
            top: p.isNew && p.isKit ? "4.2rem" : (p.isNew || p.isKit) ? "2.6rem" : "0.75rem",
            left: "0.75rem",
            background: "linear-gradient(135deg,#F97FAF,#d95a8d)",
          }}
        >
          🎉 PROMO
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
            <ProductPlaceholder hue={p.hue} image={p.images?.[0] ?? p.image} name={p.name} />
          </div>
        </button>
        {((p.images?.length ?? 0) > 1) && (
          <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full text-[11px] font-bold text-white bg-black/55">
            +{p.images!.length - 1}
          </span>
        )}
        <a
          href={(p.images?.[0] ?? p.image) ?? "#"}
          download={(p.images?.[0] ?? p.image) ? `${p.name}.png` : undefined}
          onClick={(e) => { if (!(p.images?.[0] ?? p.image)) e.preventDefault(); }}
          aria-label={`Baixar imagem de ${p.name}`}
          className="mimo-btn mimo-btn-lilac absolute bottom-2 right-2 h-9 w-9 !p-0 grid place-items-center rounded-full shadow-md z-10"
        >
          <Download className="h-4 w-4" />
        </a>
      </div>
      <h3 className="mt-4 font-bold text-[#5b2b48]">{p.name}</h3>
      {typeof p.price === "number" && (
        typeof p.originalPrice === "number" && p.originalPrice > p.price ? (
          <div className="mt-1 flex items-baseline gap-2 flex-wrap">
            <span className="text-xs text-[#9b7585] line-through">{brl(p.originalPrice)}</span>
            <span className="text-[#F97FAF] font-extrabold">{brl(p.price)}</span>
            <span className="text-[10px] font-black text-[#3a1a2f] bg-[#D5DB1F] px-1.5 py-0.5 rounded-full">
              -{Math.round((1 - p.price / p.originalPrice) * 100)}%
            </span>
          </div>
        ) : (
          <p className="mt-1 text-[#F97FAF] font-extrabold">{brl(p.price)}</p>
        )
      )}
      {p.isKit && (p.kitItems?.length ?? 0) > 0 && (
        <p className="mt-1 text-xs text-[#7a4a64]">
          Inclui {p.kitItems!.length} {p.kitItems!.length === 1 ? "item" : "itens"}
        </p>
      )}
    </article>
  );
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (lightbox !== null) {
      setSlideIdx(0);
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [lightbox]);

  return (
    <>
      {loading && products.length === 0 && (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: limit ?? 8 }).map((_, i) => (
            <div key={`sk-${i}`} className="mimo-card">
              <div className="aspect-square sm:aspect-[4/3] w-full rounded-[20px] bg-[#fbe9f0] animate-pulse" />
              <div className="mt-4 h-4 w-3/4 rounded bg-[#fbe9f0] animate-pulse" />
              <div className="mt-2 h-4 w-1/3 rounded bg-[#fbe9f0] animate-pulse" />
            </div>
          ))}
        </div>
      )}
      {!loading && products.length === 0 && (
        <p className="mt-10 text-center text-[#7a4a64] py-10">
          Nenhum produto disponível no momento.
        </p>
      )}
      {groups ? (
        <div className="mt-10 space-y-14">
          {groups.map((g) => (
            <section key={g.key} className={g.promo ? "mimo-reveal" : undefined}>
              {g.promo ? (
                <PromoBanner />
              ) : (
                <h2 className="text-2xl md:text-3xl font-black text-[#5b2b48] inline-flex items-center gap-3">
                  {g.key}
                  <span className="text-xs font-bold text-[#F97FAF] bg-[#fff0f5] px-2.5 py-1 rounded-full">{g.items.length}</span>
                </h2>
              )}
              <div className={`${g.promo ? "mt-6" : "mt-5"} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5`}>
                {g.items.map((p, i) => renderCard(p, i))}
              </div>
            </section>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p, i) => renderCard(p, i))}
        </div>
      ) : null}

      {/* lightbox */}

      {lightbox !== null && (() => {
        const product = products.find((p) => p.id === lightbox) ?? all.find((p) => p.id === lightbox);
        const gallery = product?.images && product.images.length > 0
          ? product.images
          : product?.image ? [product.image] : [];
        const current = gallery[slideIdx];
        const total = gallery.length;
        const next = () => setSlideIdx((i) => (i + 1) % total);
        const prev = () => setSlideIdx((i) => (i - 1 + total) % total);
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
              <div className="relative overflow-hidden rounded-[20px]">
                {current ? (
                  <img src={current} alt={product?.name} className="w-full aspect-[4/3] object-cover rounded-[20px]" />
                ) : (
                  <div className="aspect-[4/3] w-full rounded-[20px] grid place-items-center text-8xl md:text-9xl"
                    style={{ background: `linear-gradient(135deg, hsl(${product?.hue ?? 330} 90% 92%), hsl(${((product?.hue ?? 330) + 30) % 360} 90% 85%))` }}>
                    🎁
                  </div>
                )}
                {total > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Anterior"
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-white/90 text-[#5b2b48] shadow hover:scale-110 transition-transform"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Próxima"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-white/90 text-[#5b2b48] shadow hover:scale-110 transition-transform"
                    >
                      <ChevronRight />
                    </button>
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-black/55">
                      {slideIdx + 1} / {total}
                    </span>
                  </>
                )}
              </div>
              {total > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {gallery.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlideIdx(idx)}
                      className={`shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-colors ${idx === slideIdx ? "border-[#F97FAF]" : "border-transparent"}`}
                      aria-label={`Imagem ${idx + 1}`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#5b2b48] truncate">{product?.name}</h3>
                  {typeof product?.price === "number" && (
                    typeof product.originalPrice === "number" && product.originalPrice > product.price ? (
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm text-[#9b7585] line-through">{brl(product.originalPrice)}</span>
                        <span className="text-[#F97FAF] font-extrabold text-base md:text-lg">{brl(product.price)}</span>
                        <span className="text-[10px] font-black text-[#3a1a2f] bg-[#D5DB1F] px-1.5 py-0.5 rounded-full">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      </div>
                    ) : (
                      <p className="text-[#F97FAF] font-extrabold text-base md:text-lg">{brl(product.price)}</p>
                    )
                  )}
                </div>
                <a
                  href={current ?? "#"}
                  download={current ? `${product?.name}-${slideIdx + 1}.png` : undefined}
                  onClick={(e) => { if (!current) e.preventDefault(); }}
                  aria-label={`Baixar imagem de ${product?.name}`}
                  className="mimo-btn mimo-btn-lilac h-11 w-11 !p-0 grid place-items-center rounded-full shadow-md"
                >
                  <Download className="h-5 w-5" />
                </a>
              </div>
              {product?.isKit && (product.kitItems?.length ?? 0) > 0 && (
                <div className="mt-4 rounded-2xl bg-[#fff5f8] border border-[#f3dfe7] p-4">
                  <p className="text-sm font-black text-[#F97FAF] inline-flex items-center gap-1.5">
                    <Package className="h-4 w-4" /> O que vem neste kit
                  </p>
                  <ul className="mt-2 space-y-1">
                    {product.kitItems!.map((it, idx) => (
                      <li key={idx} className="text-sm text-[#5b2b48] flex items-baseline gap-2">
                        <span className="font-bold text-[#F97FAF] min-w-[2rem]">{it.qty}x</span>
                        <span>{it.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </>
  );
}