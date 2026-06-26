import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
  return (
    <header className="w-full bg-[#FEF5F6] border-b border-[#f7dde6]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
        <button
          className="p-2 rounded-[14px] text-[#F97FAF] hover:bg-white/60 transition-colors shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0 transition-transform duration-300 hover:scale-105">
          <img src={logoAsset.url} alt="Mimô Personalizados" className="h-20 md:h-24 w-auto rounded-[20px]" />
        </Link>
      </div>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3 font-bold text-[#5b2b48]">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.hash ? l.hash : l.to}
              className="mimo-menu-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}