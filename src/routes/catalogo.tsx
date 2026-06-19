import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/mimo/Header";
import { Footer } from "@/components/mimo/Footer";
import { FloatingWidgets } from "@/components/mimo/FloatingWidgets";
import { CatalogGrid } from "@/components/mimo/CatalogGrid";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo Completo — MIMÔ Personalizados" },
      { name: "description", content: "Explore o catálogo completo da MIMÔ Personalizados com todos os nossos kits e itens para festas." },
      { property: "og:title", content: "Catálogo Completo — MIMÔ Personalizados" },
      { property: "og:description", content: "Veja todos os mimos personalizados disponíveis para a sua festa." },
    ],
  }),
  component: CatalogoPage,
});

function CatalogoPage() {
  useReveal();
  return (
    <div className="min-h-screen">
      <Header />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-[#7a4a64] hover:text-[#F97FAF] font-bold transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar para a home
          </Link>
        </div>
        <h1 className="mimo-reveal text-3xl md:text-5xl font-black text-center text-[#F97FAF]">Catálogo Completo 🎈</h1>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Todos os nossos mimos em um só lugar
        </p>
        <CatalogGrid />
      </section>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}