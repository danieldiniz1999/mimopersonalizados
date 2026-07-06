import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";

type Buyer = { name: string; city: string; state: string; product: string };

const BUYERS: Buyer[] = [
  { name: "Ana Beatriz", city: "Fortaleza", state: "CE", product: "Sacolinhas Personalizadas" },
  { name: "Camila Souza", city: "São Paulo", state: "SP", product: "Tubolatas" },
  { name: "Juliana Alves", city: "Rio de Janeiro", state: "RJ", product: "Convites" },
  { name: "Patrícia Lima", city: "Belo Horizonte", state: "MG", product: "Cofres" },
  { name: "Renata Martins", city: "Recife", state: "PE", product: "Pipoca Gourmet" },
  { name: "Larissa Oliveira", city: "Caucaia", state: "CE", product: "Acrílico" },
  { name: "Fernanda Costa", city: "Salvador", state: "BA", product: "Sacolinhas Personalizadas" },
  { name: "Bruna Ribeiro", city: "Curitiba", state: "PR", product: "Convites" },
  { name: "Mariana Duarte", city: "Natal", state: "RN", product: "Tubolatas" },
  { name: "Priscila Ramos", city: "Brasília", state: "DF", product: "Pipoca Gourmet" },
  { name: "Tainá Silva", city: "Manaus", state: "AM", product: "Cofres" },
  { name: "Vanessa Nunes", city: "Porto Alegre", state: "RS", product: "Acrílico" },
];

const MINUTES = [2, 3, 4, 5, 7, 8, 10, 12, 15, 18, 22, 27];

export function BuyersPopup() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let timer: ReturnType<typeof setTimeout>;

    const show = () => {
      setVisible(true);
      timer = setTimeout(() => {
        setVisible(false);
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % BUYERS.length);
          show();
        }, 4000);
      }, 5500);
    };

    const first = setTimeout(show, 3500);
    return () => {
      clearTimeout(first);
      clearTimeout(timer);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const buyer = BUYERS[index];
  const minutes = MINUTES[index % MINUTES.length];

  return (
    <div
      className={`fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-40 w-[calc(100vw-2rem)] max-w-[320px] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="bg-white rounded-[18px] shadow-2xl border-2 border-[#f7dde6] p-3 pr-8 flex items-center gap-3 relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-1.5 right-1.5 text-[#7a4a64] hover:text-[#F97FAF] transition-colors"
          aria-label="Fechar"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        <div
          className="h-11 w-11 shrink-0 rounded-full grid place-items-center text-white"
          style={{ background: "linear-gradient(135deg, #F97FAF, #C77FC2)" }}
        >
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#5b2b48] truncate">{buyer.name}</p>
          <p className="text-xs text-[#7a4a64] leading-tight">
            comprou <span className="font-semibold text-[#C77FC2]">{buyer.product}</span>
          </p>
          <p className="text-[11px] text-[#a97a8f] mt-0.5">
            {buyer.city} - {buyer.state} · há {minutes} min
          </p>
        </div>
      </div>
    </div>
  );
}