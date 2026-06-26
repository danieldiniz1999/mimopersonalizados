import { Instagram, Mail } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="mimo-reveal mt-20 bg-white/60 border-t border-[#f7dde6]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 items-center">
        <div className="flex justify-center md:justify-start">
          <img src={logoAsset.url} alt="Mimô" className="h-16 rounded-[20px]" />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-3 md:gap-6 text-center font-bold text-[#5b2b48]">
          {["Home","Quem Somos","Catálogo","Combinados","Contato"].map((l, i) => (
            <a key={l} href={i === 3 ? "/politicas" : "/"} className="transition-colors duration-300 hover:text-[#F97FAF]">{l}</a>
          ))}
        </nav>
        <div className="flex justify-center md:justify-end gap-4">
          <a href="https://www.instagram.com/mimopersonalizadoos" target="_blank" rel="noopener" className="text-[#F97FAF] transition-transform duration-300 hover:scale-125"><Instagram /></a>
          <a href="mailto:mimopersonalizados@gmail.com" className="text-[#F97FAF] transition-transform duration-300 hover:scale-125"><Mail /></a>
        </div>
      </div>
      <p className="text-center pb-6 text-sm text-[#7a4a64]">© 2026 Mimô, Feito com amor, família e alegria 💕✨ | Todos os direitos reservados</p>
    </footer>
  );
}