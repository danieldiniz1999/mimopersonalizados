import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(".mimo-reveal:not(.is-visible)").forEach((el) => {
        io.observe(el);
      });
    };

    observeAll();

    // Observa elementos adicionados depois (ex.: cards que chegam após o fetch)
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}