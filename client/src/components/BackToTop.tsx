import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Dezenter Back-to-Top-Button, der nach 400px Scroll-Tiefe
 * sanft eingeblendet wird und den Nutzer weich nach oben scrollt.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Zurück nach oben"
      className={`
        fixed bottom-6 right-6 z-40
        w-11 h-11 rounded-full
        bg-primary/90 text-primary-foreground
        shadow-lg shadow-primary/20
        flex items-center justify-center
        transition-all duration-300 ease-out
        hover:bg-primary hover:shadow-xl hover:shadow-primary/30 hover:scale-110
        active:scale-95
        cursor-pointer
        ${visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
    </button>
  );
}
