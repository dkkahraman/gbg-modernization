import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // Phase 1: Enter animation (logo fades in)
    const holdTimer = setTimeout(() => {
      setPhase("hold");
    }, 600);

    // Phase 2: Hold briefly then exit
    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 1400);

    // Phase 3: Complete and unmount
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              currentColor 40px,
              currentColor 41px
            )`,
          }}
        />
      </div>

      {/* Center content */}
      <div
        className="relative flex flex-col items-center gap-6"
        style={{
          opacity: phase === "enter" ? 0 : 1,
          transform: phase === "enter" ? "translateY(12px) scale(0.97)" : "translateY(0) scale(1)",
          transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Logo Mark */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center"
            style={{
              opacity: phase === "enter" ? 0 : 1,
              transform: phase === "enter" ? "scale(0.8)" : "scale(1)",
              transition: "opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s",
            }}
          >
            <span className="text-3xl font-serif font-bold text-primary tracking-tight">
              GBG
            </span>
          </div>

          {/* Accent dot */}
          <div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent"
            style={{
              opacity: phase === "enter" ? 0 : 1,
              transform: phase === "enter" ? "scale(0)" : "scale(1)",
              transition: "opacity 0.3s ease 0.4s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s",
            }}
          />
        </div>

        {/* Company name */}
        <div
          className="text-center"
          style={{
            opacity: phase === "enter" ? 0 : 1,
            transform: phase === "enter" ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s",
          }}
        >
          <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            Consulting für bAV
          </p>
        </div>

        {/* Loading indicator */}
        <div
          className="flex items-center gap-1.5 mt-2"
          style={{
            opacity: phase === "enter" ? 0 : 1,
            transition: "opacity 0.4s ease 0.5s",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/40"
              style={{
                animation: `splashPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes splashPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
