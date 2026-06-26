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
          className="relative p-2 rounded-[14px] text-[#F97FAF] hover:bg-white/60 transition-colors shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="relative block h-7 w-7">
            <Menu
              className={`absolute inset-0 h-7 w-7 transition-all duration-300 ease-out ${open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
            />
            <X
              className={`absolute inset-0 h-7 w-7 transition-all duration-300 ease-out ${open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
            />
          </span>
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0 transition-transform duration-300 hover:scale-105">
          <img src={logoAsset.url} alt="Mimô Personalizados" className="h-20 md:h-24 w-auto rounded-[20px]" />
        </Link>
      </div>
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        aria-hidden={!open}
      >
        <div className="min-h-0">
          <div
            className={`px-4 pb-4 pt-1 flex flex-col gap-1 font-bold text-[#5b2b48] transition-opacity duration-300 ${open ? "opacity-100 delay-100" : "opacity-0"}`}
          >
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.hash ? l.hash : l.to}
                className="mimo-menu-link transform transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                style={{
                  transitionDelay: open ? `${120 + i * 50}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(-8px)",
                }}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}