import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useBilmogRates, BilmogEntry } from "@/hooks/useBilmogRates";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const { data: bilmogData } = useBilmogRates();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prognose = bilmogData.filter((r: BilmogEntry) => r.isPrognose).at(-1);
  const bilmogDisplay = prognose ?? { period: "GBG-Prognose 12.2026", sevenYear: "2,64 %", tenYear: "2,30 %" };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background: Split design - white left, deep navy right */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-0 right-0 w-[45%] h-full bg-[#0a1628] hidden lg:block"
          style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
      </div>

      {/* Floating geometric accents */}
      <div
        className="absolute top-20 right-[30%] w-64 h-64 rounded-full border border-[#d4a853]/20 hidden lg:block"
        style={{ transform: `translateY(${scrollY * 0.04}px)` }}
      />
      <div
        className="absolute bottom-32 right-[20%] w-40 h-40 rounded-full bg-[#d4a853]/5 hidden lg:block"
        style={{ transform: `translateY(${scrollY * -0.06}px)` }}
      />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#d4a853]/40 via-[#d4a853]/20 to-transparent" />

      <div className="container relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left: Bold statement - 7 columns */}
          <div className="lg:col-span-7">
            {/* Overline */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-[#d4a853]" />
              <span className="text-sm font-medium tracking-wide text-[#0a1628]/60 uppercase">
                Versicherungsmathematik & bAV
              </span>
            </div>

            {/* Main headline - dramatically large */}
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-bold text-[#0a1628] leading-[0.95] mb-8 tracking-tight">
              Gute Beratung<br />
              <span className="text-[#d4a853]">Gewinnt.</span>
            </h1>

            {/* Subline - short and punchy */}
            <p className="text-xl md:text-2xl text-[#0a1628]/50 font-light max-w-lg mb-12 leading-relaxed">
              Präzise. Unabhängig. Seit über 30 Jahren.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a href="#kontakt">
                <Button size="lg" className="bg-[#0a1628] text-white hover:bg-[#0a1628]/90 gap-3 text-base px-10 py-6 font-semibold tracking-wide">
                  Angebotsanfrage
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#kontakt">
                <Button size="lg" variant="outline" className="gap-3 text-base border-[#0a1628]/20 text-[#0a1628] hover:bg-[#0a1628]/5 hover:border-[#0a1628]/40 bg-transparent px-8 py-6">
                  <Phone className="w-4 h-4" />
                  Erstberatung
                </Button>
              </a>
            </div>

            {/* Stats - horizontal, minimal */}
            <div className="flex items-center gap-10">
              {[
                { value: "2.000+", label: "Mandanten" },
                { value: "30+", label: "Jahre" },
                { value: "100%", label: "Unabhängig" },
              ].map((stat, i) => (
                <div key={i} className="relative">
                  <div className="text-3xl font-bold text-[#0a1628] tracking-tight">{stat.value}</div>
                  <div className="text-xs text-[#0a1628]/40 mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: BilMoG Live Card - 5 columns */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-end gap-6">
            {/* BilMoG Card - the hero piece */}
            <div
              className="w-full max-w-sm bg-white border border-[#0a1628]/10 p-8 shadow-2xl shadow-[#0a1628]/10"
              style={{ transform: `translateY(${scrollY * -0.03}px)` }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0a1628]/40">GBG-Prognose</span>
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-[#0a1628]/5 pb-4">
                  <span className="text-sm text-[#0a1628]/60">7-Jahres-Durchschnitt</span>
                  <span className="text-3xl font-bold text-[#0a1628] tracking-tight">
                    {bilmogDisplay.sevenYear}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[#0a1628]/60">10-Jahres-Durchschnitt</span>
                  <span className="text-3xl font-bold text-[#d4a853] tracking-tight">
                    {bilmogDisplay.tenYear}
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0a1628]/5">
                <span className="text-xs text-[#0a1628]/30">{bilmogDisplay.period}</span>
              </div>
            </div>

            {/* Membership badges - minimal */}
            <div
              className="flex items-center gap-4"
              style={{ transform: `translateY(${scrollY * -0.05}px)` }}
            >
              <span className="text-[10px] text-white/60 uppercase tracking-widest">Mitglied</span>
              {["DAV", "IVS"].map((label) => (
                <div key={label} className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold tracking-wider">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile BilMoG Card */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-[#0a1628] p-6">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-white/40 uppercase tracking-wider">Prognose 7J</span>
              <div className="text-2xl font-bold text-white">{bilmogDisplay.sevenYear}</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <span className="text-xs text-white/40 uppercase tracking-wider">Prognose 10J</span>
              <div className="text-2xl font-bold text-[#d4a853]">{bilmogDisplay.tenYear}</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
