import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { useProducts, useProductsLoading, CATEGORIES, type Product } from "@/lib/products-store";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function selectCarouselItems(all: Product[], max = 12): Product[] {
  const visible = all.filter((p) => p.active !== false);
  const picked: Product[] = [];
  const usedIds = new Set<number>();

  // 1) Todas as promoções primeiro
  for (const p of visible) {
    if (p.isPromo && !usedIds.has(p.id) && picked.length < max) {
      picked.push(p);
      usedIds.add(p.id);
    }
  }

  // 2) Ao menos 1 item de cada categoria (incluindo as categorias de kit)
  for (const cat of CATEGORIES) {
    if (picked.length >= max) break;
    const already = picked.some((p) => p.category === cat);
    if (already) continue;
    const candidate = visible.find((p) => p.category === cat && !usedIds.has(p.id));
    if (candidate) {
      picked.push(candidate);
      usedIds.add(candidate.id);
    }
  }

  // 3) Completar com quaisquer outros até 12
  if (picked.length < max) {
    for (const p of visible) {
      if (picked.length >= max) break;
      if (!usedIds.has(p.id)) {
        picked.push(p);
        usedIds.add(p.id);
      }
    }
  }

  return picked.slice(0, max);
}

function Card({ p }: { p: Product }) {
  const img = p.thumbnails?.[0] ?? p.images?.[0] ?? p.image;
  return (
    <Link
      to="/catalogo"
      className="mimo-card relative block w-[260px] sm:w-[280px] shrink-0 transition-transform duration-300 hover:-translate-y-1"
    >
      {p.isNew && (
        <span
          className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-black text-[#3a1a2f]"
          style={{ backgroundColor: "#D5DB1F" }}
        >
          NOVIDADE!
        </span>
      )}
      {p.isKit && (
        <span
          className="absolute left-3 z-10 px-3 py-1 rounded-full text-xs font-black text-white bg-[#F97FAF] inline-flex items-center gap-1"
          style={{ top: p.isNew ? "2.6rem" : "0.75rem" }}
        >
          <Package className="h-3 w-3" /> KIT
        </span>
      )}
      {p.isPromo && (
        <span
          className="absolute z-10 px-3 py-1 rounded-full text-xs font-black text-white inline-flex items-center gap-1 shadow-md"
          style={{
            top: p.isNew && p.isKit ? "4.2rem" : p.isNew || p.isKit ? "2.6rem" : "0.75rem",
            left: "0.75rem",
            background: "linear-gradient(135deg,#F97FAF,#d95a8d)",
          }}
        >
          🎉 PROMO
        </span>
      )}
      <div className="overflow-hidden rounded-[20px]">
        {img ? (
          <img
            src={img}
            alt={p.name}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full object-cover"
          />
        ) : (
          <div
            className="aspect-square w-full grid place-items-center text-4xl"
            style={{
              background: `linear-gradient(135deg, hsl(${p.hue} 90% 92%), hsl(${(p.hue + 30) % 360} 90% 85%))`,
            }}
          >
            🎁
          </div>
        )}
      </div>
      <h3 className="mt-4 font-bold text-[#5b2b48] truncate">{p.name}</h3>
      {typeof p.price === "number" &&
        (typeof p.originalPrice === "number" && p.originalPrice > p.price ? (
          <div className="mt-1 flex items-baseline gap-2 flex-wrap">
            <span className="text-xs text-[#9b7585] line-through">{brl(p.originalPrice)}</span>
            <span className="text-[#F97FAF] font-extrabold">{brl(p.price)}</span>
          </div>
        ) : (
          <p className="mt-1 text-[#F97FAF] font-extrabold">{brl(p.price)}</p>
        ))}
    </Link>
  );
}

export function CatalogCarousel() {
  const all = useProducts();
  const loading = useProductsLoading();
  const items = useMemo(() => selectCarouselItems(all, 12), [all]);

  if (loading && items.length === 0) {
    return (
      <div className="mt-10 flex gap-5 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mimo-card w-[280px] shrink-0">
            <div className="aspect-square w-full rounded-[20px] bg-[#fbe9f0] animate-pulse" />
            <div className="mt-4 h-4 w-3/4 rounded bg-[#fbe9f0] animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="mt-10 text-center text-[#7a4a64] py-10">
        Nenhum produto disponível no momento.
      </p>
    );
  }

  return <SteppedCarousel items={items} />;
}

function SteppedCarousel({ items }: { items: Product[] }) {
  // duplicamos a lista para o loop ser contínuo
  const loop = [...items, ...items];
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  // avança 1 item a cada 2,8s (sem pausar)
  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => i + 1);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  // quando chega na metade (lista duplicada), reseta para 0 sem animação
  useEffect(() => {
    if (index < items.length) return;
    const node = trackRef.current;
    if (!node) return;
    const onEnd = () => {
      setAnimate(false);
      setIndex(0);
      // re-habilita a animação no próximo frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    };
    node.addEventListener("transitionend", onEnd, { once: true });
    return () => node.removeEventListener("transitionend", onEnd);
  }, [index, items.length]);

  // calcula deslocamento em pixels conforme largura real do primeiro card + gap
  const [step, setStep] = useState(300);
  const [cardWidth, setCardWidth] = useState(280);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const measure = () => {
      const node = trackRef.current;
      const container = containerRef.current;
      if (!node || !container) return;
      const first = node.firstElementChild as HTMLElement | null;
      if (!first) return;
      const style = window.getComputedStyle(node);
      const gap = parseFloat(style.columnGap || style.gap || "20") || 20;
      setStep(first.offsetWidth + gap);
      setCardWidth(first.offsetWidth);
      setContainerWidth(container.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  // centraliza o card atual na tela
  const centerOffset = Math.max(0, (containerWidth - cardWidth) / 2);

  return (
    <div
      ref={containerRef}
      className="mt-10 relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-5 w-max"
        style={{
          transform: `translateX(${centerOffset - index * step}px)`,
          transition: animate ? "transform 1700ms cubic-bezier(0.45, 0, 0.2, 1)" : "none",
        }}
      >
        {loop.map((p, i) => (
          <Card key={`${p.id}-${i}`} p={p} />
        ))}
      </div>
    </div>
  );
}