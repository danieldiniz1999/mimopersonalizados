import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, LogOut, RotateCcw, Save, X, Upload } from "lucide-react";
import { productsStore, useProducts, type Product } from "@/lib/products-store";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — MIMÔ" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const AUTH_KEY = "mimo:admin-auth";
const USER = "admin";
const PASS = "admin123";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} />;
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (user === USER && pass === PASS) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onLogin();
    } else {
      setErr("Usuário ou senha inválidos.");
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-[#fff5f8] px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-[24px] p-8 shadow-xl border border-[#f3dfe7]">
        <img src={logoAsset.url} alt="MIMÔ" className="mx-auto h-16 w-auto mb-3" />
        <h1 className="text-2xl font-black text-[#F97FAF] text-center">Painel MIMÔ</h1>
        <p className="text-sm text-[#7a4a64] text-center mt-1">Faça login para gerenciar o catálogo</p>
        <label className="block mt-6 text-sm font-bold text-[#5b2b48]">Usuário</label>
        <input value={user} onChange={(e) => setUser(e.target.value)} className="mt-1 w-full rounded-xl border border-[#f3dfe7] px-3 py-2 outline-none focus:border-[#F97FAF]" autoFocus />
        <label className="block mt-4 text-sm font-bold text-[#5b2b48]">Senha</label>
        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="mt-1 w-full rounded-xl border border-[#f3dfe7] px-3 py-2 outline-none focus:border-[#F97FAF]" />
        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        <button type="submit" className="mimo-btn mimo-btn-pink mt-6 w-full justify-center">Entrar</button>
      </form>
    </div>
  );
}

const EMPTY: Omit<Product, "id"> = { name: "", isNew: false, hue: 330, image: undefined };

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const products = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="min-h-screen bg-[#fff5f8]">
      <header className="bg-white border-b border-[#f3dfe7]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black text-[#F97FAF]">Painel MIMÔ — Catálogo</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (confirm("Restaurar produtos padrão? Isso apaga suas alterações.")) productsStore.reset(); }}
              className="mimo-btn mimo-btn-lilac !py-2 !px-3 text-sm"
              title="Restaurar padrão"
            >
              <RotateCcw className="h-4 w-4" /> Restaurar
            </button>
            <button onClick={onLogout} className="mimo-btn !py-2 !px-3 text-sm bg-white border border-[#f3dfe7] text-[#5b2b48]">
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#7a4a64]">{products.length} produto(s) no catálogo</p>
          <button onClick={() => setCreating(true)} className="mimo-btn mimo-btn-pink">
            <Plus className="h-4 w-4" /> Novo produto
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-[20px] p-4 border border-[#f3dfe7] shadow-sm">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-5xl"
                    style={{ background: `linear-gradient(135deg, hsl(${p.hue} 90% 92%), hsl(${(p.hue + 30) % 360} 90% 85%))` }}>
                    🎁
                  </div>
                )}
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-[#5b2b48]">{p.name}</h3>
                  {p.isNew && <span className="text-xs font-bold text-[#3a1a2f] bg-[#D5DB1F] px-2 py-0.5 rounded-full">NOVIDADE</span>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(p)} className="h-8 w-8 grid place-items-center rounded-lg bg-[#fff0f5] text-[#F97FAF] hover:bg-[#ffe3ee]" title="Editar">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => { if (confirm(`Excluir "${p.name}"?`)) productsStore.remove(p.id); }}
                    className="h-8 w-8 grid place-items-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {creating && (
        <ProductModal
          initial={EMPTY}
          title="Novo produto"
          onClose={() => setCreating(false)}
          onSave={(data) => { productsStore.add(data); setCreating(false); }}
        />
      )}
      {editing && (
        <ProductModal
          initial={editing}
          title="Editar produto"
          onClose={() => setEditing(null)}
          onSave={(data) => { productsStore.update(editing.id, data); setEditing(null); }}
        />
      )}
    </div>
  );
}

function ProductModal({
  initial, title, onClose, onSave,
}: {
  initial: Omit<Product, "id"> | Product;
  title: string;
  onClose: () => void;
  onSave: (data: Omit<Product, "id">) => void;
}) {
  const [name, setName] = useState(initial.name);
  const [isNew, setIsNew] = useState(initial.isNew);
  const [hue, setHue] = useState(initial.hue);
  const [image, setImage] = useState<string | undefined>(initial.image);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) {
      alert("Imagem muito grande. Use até 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(f);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), isNew, hue, image });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-[24px] p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-[#F97FAF]">{title}</h2>
          <button type="button" onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-[#fff0f5]">
            <X className="h-5 w-5 text-[#5b2b48]" />
          </button>
        </div>

        <label className="block text-sm font-bold text-[#5b2b48]">Nome do produto</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-xl border border-[#f3dfe7] px-3 py-2 outline-none focus:border-[#F97FAF]" />

        <label className="block mt-4 text-sm font-bold text-[#5b2b48]">Imagem</label>
        <div className="mt-1 flex items-center gap-3">
          <div className="h-20 w-20 rounded-xl overflow-hidden border border-[#f3dfe7] grid place-items-center bg-[#fff5f8]">
            {image ? <img src={image} alt="" className="w-full h-full object-cover" /> : <span className="text-2xl">🎁</span>}
          </div>
          <label className="mimo-btn mimo-btn-lilac cursor-pointer !py-2 text-sm">
            <Upload className="h-4 w-4" /> Escolher arquivo
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          </label>
          {image && (
            <button type="button" onClick={() => setImage(undefined)} className="text-sm text-red-600 hover:underline">Remover</button>
          )}
        </div>
        <p className="text-xs text-[#7a4a64] mt-1">PNG/JPG até 2MB. Sem imagem, usamos um fundo colorido.</p>

        <label className="block mt-4 text-sm font-bold text-[#5b2b48]">Cor de fundo (matiz: {hue}°)</label>
        <input type="range" min={0} max={360} value={hue} onChange={(e) => setHue(Number(e.target.value))} className="w-full" />
        <div className="h-6 rounded-lg mt-1" style={{ background: `linear-gradient(135deg, hsl(${hue} 90% 92%), hsl(${(hue + 30) % 360} 90% 85%))` }} />

        <label className="mt-4 flex items-center gap-2 text-[#5b2b48]">
          <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
          Marcar como <strong>NOVIDADE</strong>
        </label>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="mimo-btn !py-2 bg-white border border-[#f3dfe7] text-[#5b2b48]">Cancelar</button>
          <button type="submit" className="mimo-btn mimo-btn-pink !py-2">
            <Save className="h-4 w-4" /> Salvar
          </button>
        </div>
      </form>
    </div>
  );
}