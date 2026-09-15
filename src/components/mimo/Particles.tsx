const symbols = ["💕", "✨", "🎉", "⭐", "💖", "🎊", "🎈"];

export function Particles({ count = 18 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => {
    const left = (i * 53) % 100;
    const delay = (i * 0.7) % 12;
    const duration = 8 + ((i * 1.3) % 10);
    const size = 14 + ((i * 7) % 22);
    const sym = symbols[i % symbols.length];
    return { left, delay, duration, size, sym, key: i };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.key}
          className="mimo-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.sym}
        </span>
      ))}
    </div>
  );
}
