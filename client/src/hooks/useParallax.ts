import { useState, useEffect, useCallback } from "react";

/**
 * Hook for scroll-based parallax effects.
 * Uses requestAnimationFrame for smooth 60fps performance.
 * Automatically disables on mobile (< 768px) for better performance.
 */
export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable parallax on larger screens
    const checkWidth = () => {
      setIsEnabled(window.innerWidth >= 768);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isEnabled]);

  /**
   * Get a transform style for parallax movement.
   * @param speed - Parallax speed factor (0 = no movement, 1 = full scroll speed, negative = opposite direction)
   * @param maxOffset - Maximum pixel offset to prevent elements from moving too far
   */
  const getParallaxStyle = useCallback(
    (speed: number, maxOffset: number = 100) => {
      if (!isEnabled) return {};
      const offset = Math.min(Math.max(scrollY * speed, -maxOffset), maxOffset);
      return {
        transform: `translateY(${offset}px)`,
        willChange: "transform" as const,
      };
    },
    [scrollY, isEnabled]
  );

  /**
   * Get an opacity style that fades based on scroll position.
   * @param fadeStart - Scroll position where fading begins
   * @param fadeEnd - Scroll position where element is fully transparent
   */
  const getFadeStyle = useCallback(
    (fadeStart: number = 0, fadeEnd: number = 400) => {
      if (!isEnabled) return { opacity: 1 };
      const progress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      return { opacity: 1 - progress * 0.6 };
    },
    [scrollY, isEnabled]
  );

  return { scrollY, isEnabled, getParallaxStyle, getFadeStyle };
}
