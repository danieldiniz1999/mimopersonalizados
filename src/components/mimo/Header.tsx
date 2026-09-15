import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoAsset from "@/assets/logo.png.asset.json";

const links = [
  { label: "Home", to: "/", hash: "" },
  { label: "Quem Somos", to: "/", hash: "#quem-somos" },
  { label: "Catálogo", to: "/catalogo", hash: "" },
  { label: "Combinados", to: "/politicas", hash: "" },
  { label: "Contato", to: "/", hash: "#contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentHash = typeof window !== "undefined" ? window.location.hash : "";

  const isActive = (l: (typeof links)[number]) => {
    if (l.hash) return pathname === l.to && currentHash === l.hash;
    return pathname === l.to && !currentHash;
  };

  return (
    <header className="w-full bg-[#FEF5F6] border-b border-[#f7dde6]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 rounded-[14px] text-[#F97FAF] hover:bg-white/60 transition-colors shrink-0"
              aria-label="Abrir menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#FEF5F6] border-[#f7dde6] p-0 flex flex-col">
            <div className="px-6 pt-6 pb-4 border-b border-[#f7dde6]">
              <img
                src={logoAsset.url}
                alt="Mimô Personalizados"
                className="h-20 w-auto rounded-[20px]"
              />
            </div>
            <nav className="flex flex-col gap-1 p-4 font-bold text-[#5b2b48]">
              {links.map((l) => {
                const active = isActive(l);
                return (
                  <a
                    key={l.label}
                    href={l.hash ? l.hash : l.to}
                    onClick={() => setOpen(false)}
                    className={`mimo-menu-link px-3 py-2 rounded-[12px] transition-colors ${
                      active ? "bg-[#F97FAF] text-white" : "hover:bg-white/60"
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <img
            src={logoAsset.url}
            alt="Mimô Personalizados"
            className="h-20 md:h-24 w-auto rounded-[20px]"
          />
        </Link>
      </div>
    </header>
  );
}
