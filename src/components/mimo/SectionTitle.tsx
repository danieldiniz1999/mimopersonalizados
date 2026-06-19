import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2";
  className?: string;
  size?: "md" | "lg";
};

export function SectionTitle({ children, as = "h2", className = "", size = "lg" }: Props) {
  const Tag = as;
  const text =
    size === "lg"
      ? "text-xl md:text-3xl"
      : "text-lg md:text-2xl";
  const pad = size === "lg" ? "px-7 md:px-10 py-3 md:py-4" : "px-6 py-2.5";
  const icon = size === "lg" ? "h-5 w-5 md:h-6 md:w-6" : "h-4 w-4 md:h-5 md:w-5";

  return (
    <div className={`mimo-reveal flex justify-center ${className}`}>
      <Tag
        className={`inline-flex items-center gap-3 ${pad} rounded-full font-black uppercase tracking-wide text-white ${text} text-center`}
        style={{
          background:
            "linear-gradient(90deg, #FFB199 0%, #F97FAF 45%, #C77FC2 100%)",
          boxShadow:
            "0 10px 24px -10px rgba(199,127,194,.55), 0 6px 14px -8px rgba(249,127,175,.55), inset 0 1px 0 rgba(255,255,255,.35)",
        }}
      >
        <Sparkles className={`${icon} shrink-0`} strokeWidth={2.4} aria-hidden />
        <span className="leading-none">{children}</span>
        <Sparkles className={`${icon} shrink-0`} strokeWidth={2.4} aria-hidden />
      </Tag>
    </div>
  );
}