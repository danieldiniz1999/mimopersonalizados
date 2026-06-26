import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, LogOut, Save, X, Eye, EyeOff, ImagePlus, Package } from "lucide-react";
import { productsStore, useProducts, CATEGORIES, type Product, type KitItem, type Category } from "@/lib/products-store";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Mimô" }, { name: "robots", content: "noindex" }] }),
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
        <img src={logoAsset.url} alt="Mimô" className="mx-auto h-16 w-auto mb-3" />
        <h1 className="text-2xl font-black text-[#F97FAF] text-center">Painel Mimô</h1>
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

const MAX_IMAGES = 5;
const EMPTY: Omit<Product, "id"> = { name: "", isNew: false, hue: 330, image: undefined, images: [], active: true, price: undefined, originalPrice: undefined, isKit: false, kitItems: [], category: undefined };

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const products = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="min-h-screen bg-[#fff5f8]">
      <header className="bg-white border-b border-[#f3dfe7]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={logoAsset.url}
              alt="Mimô"
              className="h-10 w-10 rounded-full object-cover border border-[#f3dfe7] shrink-0"
            />
            <h1 className="text-lg md:text-xl font-black text-[#5b2b48] truncate">Painel Mimô</h1>
          </div>
          <button
            onClick={onLogout}
            className="mimo-btn !py-2 !px-3 text-sm bg-white border border-[#f3dfe7] text-[#5b2b48] shrink-0"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5 gap-2 flex-wrap">
          <p className="text-sm text-[#7a4a64]">{products.length} produto(s)</p>
          <button onClick={() => setCreating(true)} className="mimo-btn mimo-btn-pink !py-2 !px-3 text-sm">
            <Plus className="h-4 w-4" /> Novo produto
          </button>
        </div>

        {products.length === 0 ? (
          <div className="mt-10 bg-white rounded-2xl border border-dashed border-[#f3c6d5] p-10 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-[#fff0f5] grid place-items-center text-3xl mb-4">
              🎁
            </div>
            <h2 className="text-lg font-black text-[#5b2b48]">Nenhum produto cadastrado</h2>
            <p className="text-sm text-[#7a4a64] mt-2 max-w-md mx-auto">
              Comece adicionando seu primeiro produto ao catálogo. Você pode incluir nome, imagem,
              marcar como novidade e ativar ou desativar a qualquer momento.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button onClick={() => setCreating(true)} className="mimo-btn mimo-btn-pink !py-2 !px-4 text-sm">
                <Plus className="h-4 w-4" /> Cadastrar primeiro produto
              </button>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto">
              <div className="rounded-xl bg-[#fff5f8] p-4">
                <p className="text-xs font-black text-[#F97FAF]">1. Cadastrar</p>
                <p className="text-xs text-[#7a4a64] mt-1">Clique em "Novo produto" e preencha as informações.</p>
              </div>
              <div className="rounded-xl bg-[#fff5f8] p-4">
                <p className="text-xs font-black text-[#F97FAF]">2. Organizar</p>
                <p className="text-xs text-[#7a4a64] mt-1">Marque novidades e ative ou desative quando quiser.</p>
              </div>
              <div className="rounded-xl bg-[#fff5f8] p-4">
                <p className="text-xs font-black text-[#F97FAF]">3. Publicar</p>
                <p className="text-xs text-[#7a4a64] mt-1">Os produtos ativos aparecem automaticamente no site.</p>
              </div>
            </div>
          </div>
        ) : (
        <div className="space-y-8">
          {(() => {
            const groups: { key: string; items: Product[] }[] = [];
            for (const cat of CATEGORIES) {
              const items = products.filter((p) => p.category === cat);
              if (items.length > 0) groups.push({ key: cat, items });
            }
            const uncategorized = products.filter((p) => !p.category);
            if (uncategorized.length > 0) groups.push({ key: "Sem categoria", items: uncategorized });
            return groups.map((g) => (
              <section key={g.key}>
                <h2 className="text-base md:text-lg font-black text-[#5b2b48] mb-3 inline-flex items-center gap-2">
                  {g.key}
                  <span className="text-xs font-bold text-[#F97FAF] bg-[#fff0f5] px-2 py-0.5 rounded-full">{g.items.length}</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {g.items.map((p) => {
                    const inactive = p.active === false;
                    return (
                      <div key={p.id} className={`bg-white rounded-xl p-2 border border-[#f3dfe7] shadow-sm ${inactive ? "opacity-60" : ""}`}>
                        <div className="aspect-square rounded-lg overflow-hidden mb-2 relative">
                          {(() => {
                            const cover = p.images?.[0] ?? p.image;
                            return cover ? (
                              <img src={cover} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full grid place-items-center text-3xl"
                                style={{ background: `linear-gradient(135deg, hsl(${p.hue} 90% 92%), hsl(${(p.hue + 30) % 360} 90% 85%))` }}>
                                🎁
                              </div>
                            );
                          })()}
                          {((p.images?.length ?? 0) > 1) && (
                            <span className="absolute top-1 right-1 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded-full">
                              {p.images!.length} fotos
                            </span>
                          )}
                          {p.isNew && (
                            <span className="absolute top-1 left-1 text-[10px] font-black text-[#3a1a2f] bg-[#D5DB1F] px-1.5 py-0.5 rounded-full">NOVO</span>
                          )}
                          {inactive && (
                            <span className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-[#5b2b48]/80 px-1.5 py-0.5 rounded-full">INATIVO</span>
                          )}
                        </div>
                        <h3 className="font-bold text-[#5b2b48] text-xs leading-tight line-clamp-2 min-h-[2rem]">{p.name}</h3>
                        <div className="mt-2 flex items-center justify-between gap-1">
                          <button
                            onClick={() => productsStore.update(p.id, { active: inactive ? true : false })}
                            className={`h-7 w-7 grid place-items-center rounded-md ${inactive ? "bg-[#f3eaf0] text-[#5b2b48]" : "bg-[#eaf7ec] text-emerald-700"} hover:opacity-80`}
                            title={inactive ? "Ativar" : "Desativar"}
                          >
                            {inactive ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                          <div className="flex gap-1">
                            <button onClick={() => setEditing(p)} className="h-7 w-7 grid place-items-center rounded-md bg-[#fff0f5] text-[#F97FAF] hover:bg-[#ffe3ee]" title="Editar">
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => { if (confirm(`Excluir "${p.name}"?`)) productsStore.remove(p.id); }}
                              className="h-7 w-7 grid place-items-center rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                              title="Excluir"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ));
          })()}
        </div>
        )}
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
  const [images, setImages] = useState<string[]>(
    initial.images && initial.images.length > 0
      ? initial.images.slice(0, MAX_IMAGES)
      : initial.image
        ? [initial.image]
        : []
  );
  const [active, setActive] = useState(initial.active !== false);
  const [priceStr, setPriceStr] = useState<string>(
    typeof initial.price === "number" ? initial.price.toFixed(2).replace(".", ",") : ""
  );
  const [originalPriceStr, setOriginalPriceStr] = useState<string>(
    typeof initial.originalPrice === "number" ? initial.originalPrice.toFixed(2).replace(".", ",") : ""
  );
  const [isKit, setIsKit] = useState<boolean>(initial.isKit ?? false);
  const [kitItems, setKitItems] = useState<KitItem[]>(
    initial.kitItems && initial.kitItems.length > 0 ? initial.kitItems : []
  );
  const [category, setCategory] = useState<Category | "">(initial.category ?? "");
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(files: FileList | File[] | null | undefined) {
    if (!files) return;
    const arr = Array.from(files);
    if (arr.length === 0) return;
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      alert(`Você já adicionou o máximo de ${MAX_IMAGES} imagens.`);
      return;
    }
    const toRead = arr.slice(0, remaining);
    if (arr.length > remaining) {
      alert(`Apenas ${remaining} imagem(ns) adicionada(s). Limite de ${MAX_IMAGES}.`);
    }
    toRead.forEach(async (f) => {
      if (!f.type.startsWith("image/")) {
        alert(`"${f.name}" não é uma imagem.`);
        return;
      }
      if (f.size > 5 * 1024 * 1024) {
        alert(`"${f.name}" é maior que 5MB.`);
        return;
      }
      const ext = (f.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("produtos").upload(path, f, {
        contentType: f.type,
        upsert: false,
      });
      if (error) {
        console.error("[storage] upload falhou:", error);
        alert(`Falha ao enviar "${f.name}": ${error.message}`);
        return;
      }
      const { data } = supabase.storage.from("produtos").getPublicUrl(path);
      setImages((prev) => (prev.length >= MAX_IMAGES ? prev : [...prev, data.publicUrl]));
    });
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(e.target.files);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const normalized = priceStr.trim().replace(/\./g, "").replace(",", ".");
    const priceNum = normalized === "" ? undefined : Number(normalized);
    if (priceNum !== undefined && (Number.isNaN(priceNum) || priceNum < 0)) {
      alert("Preço inválido. Use por exemplo: 49,90");
      return;
    }
    const normalizedOrig = originalPriceStr.trim().replace(/\./g, "").replace(",", ".");
    const originalPriceNum = normalizedOrig === "" ? undefined : Number(normalizedOrig);
    if (originalPriceNum !== undefined && (Number.isNaN(originalPriceNum) || originalPriceNum < 0)) {
      alert("Preço original inválido. Use por exemplo: 79,90");
      return;
    }
    if (originalPriceNum !== undefined && priceNum !== undefined && originalPriceNum <= priceNum) {
      alert("O preço original (de) deve ser maior que o preço com desconto (por).");
      return;
    }
    const cleanedItems = kitItems
      .map((k) => ({ name: k.name.trim(), qty: Number(k.qty) || 1 }))
      .filter((k) => k.name !== "");
    onSave({
      name: name.trim(),
      isNew,
      hue,
      image: images[0],
      images,
      active,
      price: priceNum,
      originalPrice: originalPriceNum,
      isKit,
      kitItems: isKit ? cleanedItems : [],
      category: category === "" ? undefined : category,
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#fff5f8] overflow-y-auto">
      <header className="sticky top-0 bg-white border-b border-[#f3dfe7] z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <h2 className="text-lg md:text-xl font-black text-[#5b2b48] truncate">{title}</h2>
          <button type="button" onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-[#fff0f5]" aria-label="Fechar">
            <X className="h-5 w-5 text-[#5b2b48]" />
          </button>
        </div>
      </header>
      <form onSubmit={submit} className="max-w-3xl mx-auto px-4 py-6">

        <label className="block text-sm font-bold text-[#5b2b48]">Nome do produto</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-xl border border-[#f3dfe7] px-3 py-2 outline-none focus:border-[#F97FAF]" />

        <label className="block mt-4 text-sm font-bold text-[#5b2b48]">Categoria</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "")}
          className="mt-1 w-full rounded-xl border border-[#f3dfe7] px-3 py-2 outline-none focus:border-[#F97FAF] bg-white"
        >
          <option value="">Sem categoria</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold text-[#5b2b48]">Preço original (de) <span className="font-normal text-[#7a4a64]">, opcional</span></label>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a4a64] font-bold">R$</span>
              <input
                value={originalPriceStr}
                onChange={(e) => setOriginalPriceStr(e.target.value)}
                inputMode="decimal"
                placeholder="79,90"
                className="w-full rounded-xl border border-[#f3dfe7] pl-10 pr-3 py-2 outline-none focus:border-[#F97FAF]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#5b2b48]">Preço com desconto (por) <span className="font-normal text-[#7a4a64]">, opcional</span></label>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a4a64] font-bold">R$</span>
              <input
                value={priceStr}
                onChange={(e) => setPriceStr(e.target.value)}
                inputMode="decimal"
                placeholder="49,90"
                className="w-full rounded-xl border border-[#f3dfe7] pl-10 pr-3 py-2 outline-none focus:border-[#F97FAF]"
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-[#7a4a64] mt-1">Use vírgula para os centavos. Preencha só o "por" para mostrar um preço simples, ou os dois para destacar o desconto.</p>

        <label className="block mt-4 text-sm font-bold text-[#5b2b48]">
          Imagens <span className="font-normal text-[#7a4a64]">({images.length}/{MAX_IMAGES})</span>
        </label>
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`mt-1 flex flex-col items-center justify-center gap-2 cursor-pointer rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
            dragOver ? "border-[#F97FAF] bg-[#fff0f5]" : "border-[#f3c6d5] bg-white hover:bg-[#fff5f8]"
          } ${images.length >= MAX_IMAGES ? "opacity-60 pointer-events-none" : ""}`}
        >
          <div className="h-12 w-12 rounded-full bg-[#fff0f5] grid place-items-center text-[#F97FAF]">
            <ImagePlus className="h-6 w-6" />
          </div>
          <p className="text-sm font-bold text-[#5b2b48]">
            {images.length >= MAX_IMAGES
              ? `Limite de ${MAX_IMAGES} imagens atingido`
              : <>Arraste as imagens aqui ou <span className="text-[#F97FAF] underline">clique para escolher</span></>}
          </p>
          <p className="text-xs text-[#7a4a64]">PNG ou JPG até 5MB cada — até {MAX_IMAGES} imagens</p>
          <input type="file" accept="image/*" multiple onChange={onFile} className="hidden" disabled={images.length >= MAX_IMAGES} />
        </label>
        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
            {images.map((src, idx) => (
              <div key={idx} className="relative group">
                <img src={src} alt={`Imagem ${idx + 1}`} className="aspect-square w-full object-cover rounded-lg border border-[#f3dfe7]" />
                {idx === 0 && (
                  <span className="absolute top-1 left-1 text-[10px] font-black text-[#3a1a2f] bg-[#D5DB1F] px-1.5 py-0.5 rounded-full">
                    CAPA
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute -top-1 -right-1 h-6 w-6 grid place-items-center rounded-full bg-red-600 text-white shadow"
                  aria-label="Remover"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-[#7a4a64] mt-2">A primeira imagem é usada como capa. Sem imagens, usamos um fundo colorido.</p>

        <label className="block mt-4 text-sm font-bold text-[#5b2b48]">Cor de fundo (matiz: {hue}°)</label>
        <input type="range" min={0} max={360} value={hue} onChange={(e) => setHue(Number(e.target.value))} className="w-full" />
        <div className="h-6 rounded-lg mt-1" style={{ background: `linear-gradient(135deg, hsl(${hue} 90% 92%), hsl(${(hue + 30) % 360} 90% 85%))` }} />

        <label className="mt-4 flex items-center gap-2 text-[#5b2b48]">
          <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
          Marcar como <strong>NOVIDADE</strong>
        </label>

        <div className="mt-5 rounded-xl border border-[#f3dfe7] bg-white p-4">
          <label className="flex items-center gap-2 text-[#5b2b48]">
            <input type="checkbox" checked={isKit} onChange={(e) => setIsKit(e.target.checked)} />
            <Package className="h-4 w-4 text-[#F97FAF]" />
            Este produto é um <strong>KIT</strong> (contém vários itens)
          </label>

          {isKit && (
            <div className="mt-4">
              <p className="text-sm font-bold text-[#5b2b48]">Itens inclusos no kit</p>
              <p className="text-xs text-[#7a4a64] mt-0.5">Liste o que vem dentro do kit. Aparecerá ao abrir o produto no site.</p>

              <div className="mt-3 space-y-2">
                {kitItems.length === 0 && (
                  <p className="text-xs text-[#7a4a64] italic">Nenhum item ainda. Clique em "Adicionar item" abaixo.</p>
                )}
                {kitItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => {
                        const v = Number(e.target.value) || 1;
                        setKitItems((prev) => prev.map((it, i) => (i === idx ? { ...it, qty: v } : it)));
                      }}
                      className="w-16 rounded-xl border border-[#f3dfe7] px-2 py-2 outline-none focus:border-[#F97FAF] text-center"
                      aria-label="Quantidade"
                    />
                    <input
                      value={item.name}
                      onChange={(e) => {
                        const v = e.target.value;
                        setKitItems((prev) => prev.map((it, i) => (i === idx ? { ...it, name: v } : it)));
                      }}
                      placeholder="Nome do item (ex: Caneca personalizada)"
                      className="flex-1 min-w-0 rounded-xl border border-[#f3dfe7] px-3 py-2 outline-none focus:border-[#F97FAF]"
                    />
                    <button
                      type="button"
                      onClick={() => setKitItems((prev) => prev.filter((_, i) => i !== idx))}
                      className="h-9 w-9 grid place-items-center rounded-md bg-red-50 text-red-600 hover:bg-red-100 shrink-0"
                      aria-label="Remover item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setKitItems((prev) => [...prev, { name: "", qty: 1 }])}
                className="mt-3 mimo-btn !py-2 !px-3 text-sm bg-[#fff0f5] text-[#F97FAF] border border-[#f3c6d5]"
              >
                <Plus className="h-4 w-4" /> Adicionar item
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-[#f3dfe7] bg-white px-4 py-3">
          <div>
            <p className="text-sm font-bold text-[#5b2b48]">Produto ativo</p>
            <p className="text-xs text-[#7a4a64]">Quando ligado, aparece no site.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={active}
            onClick={() => setActive((v) => !v)}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${active ? "bg-[#F97FAF]" : "bg-[#e5d4dd]"}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${active ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="mimo-btn !py-2 bg-white border border-[#f3dfe7] text-[#5b2b48]">Cancelar</button>
          <button type="submit" className="mimo-btn mimo-btn-pink !py-2">
            <Save className="h-4 w-4" /> Salvar
          </button>
        </div>
      </form>
    </div>
  );
}