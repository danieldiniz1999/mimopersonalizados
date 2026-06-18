import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const WA_URL = "https://wa.me/?text=" + encodeURIComponent("Olá MIMÔ! Vi o site e quero um orçamento");

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.46h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.94 2.96 4.7 4.15 2.76 1.19 2.76.8 3.25.75.49-.04 1.6-.65 1.83-1.28.23-.63.23-1.18.16-1.29-.07-.11-.25-.18-.52-.32zM16.02 5.33c-5.89 0-10.67 4.78-10.67 10.67 0 1.88.49 3.71 1.43 5.32L5 27l5.85-1.53a10.62 10.62 0 0 0 5.17 1.32h.01c5.89 0 10.67-4.78 10.67-10.67 0-2.85-1.11-5.53-3.12-7.54a10.6 10.6 0 0 0-7.56-3.25zm0 19.46h-.01a8.85 8.85 0 0 1-4.5-1.23l-.32-.19-3.47.91.93-3.38-.21-.35a8.84 8.84 0 0 1-1.35-4.7c0-4.89 3.98-8.87 8.88-8.87 2.37 0 4.6.92 6.27 2.6a8.83 8.83 0 0 1 2.59 6.27c0 4.89-3.98 8.87-8.87 8.87z"/>
    </svg>
  );
}

export function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    const text = encodeURIComponent("Olá MIMÔ! " + msg);
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setMsg("");
  }

  return (
    <>
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener"
        className="mimo-wa-pulse fixed bottom-6 right-6 z-50 grid place-items-center h-14 w-14 rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>

      <div className="fixed bottom-6 left-6 z-50">
        {open && (
          <div className="mb-3 w-72 bg-white rounded-[20px] shadow-2xl p-4 border-2 border-[#C77FC2] animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-[#F97FAF]">MIMÔ Chat</strong>
              <button onClick={() => setOpen(false)} aria-label="Fechar"><X className="h-4 w-4" /></button>
            </div>
            <div className="bg-[#FEF5F6] rounded-[14px] p-3 text-sm text-[#5b2b48] mb-3">
              Olá! Como podemos ajudar você hoje? 💕
            </div>
            <form onSubmit={send} className="flex gap-2">
              <input value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={300} placeholder="Sua mensagem..." className="mimo-input !py-2 text-sm" />
              <button className="mimo-btn mimo-btn-pink !px-3 !py-2" aria-label="Enviar"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid place-items-center h-14 w-14 rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110"
          style={{ backgroundColor: "#C77FC2" }}
          aria-label="Chat"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      </div>
    </>
  );
}