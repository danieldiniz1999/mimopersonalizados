import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/mimo/Header";
import { Footer } from "@/components/mimo/Footer";
import { FloatingWidgets } from "@/components/mimo/FloatingWidgets";
import { CatalogGrid } from "@/components/mimo/CatalogGrid";
import { SectionTitle } from "@/components/mimo/SectionTitle";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo Completo — Mimô Personalizados" },
      { name: "description", content: "Explore o catálogo completo da Mimô Personalizados com todos os nossos kits e itens para festas." },
      { property: "og:title", content: "Catálogo Completo — Mimô Personalizados" },
      { property: "og:description", content: "Veja todos os mimos personalizados disponíveis para a sua festa." },
      { property: "og:url", content: "https://mimopersonalizados.lovable.app/catalogo" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Catálogo Completo — Mimô Personalizados" },
      { name: "twitter:description", content: "Veja todos os mimos personalizados disponíveis para a sua festa." },
    ],
    links: [{ rel: "canonical", href: "https://mimopersonalizados.lovable.app/catalogo" }],
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
        <SectionTitle as="h1">Catálogo Completo</SectionTitle>
        <p className="mimo-reveal text-center text-[#7a4a64] mt-3" style={{ animationDelay: ".2s" }}>
          Todos os nossos mimos em um só lugar
        </p>
        <CatalogGrid groupByCategory />
      </section>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}