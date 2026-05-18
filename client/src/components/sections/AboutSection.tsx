import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const facts = [
  { value: "30+", label: "Jahre Erfahrung", detail: "Seit 1994 im Markt" },
  { value: "2.000+", label: "Mandanten", detail: "Industrie & Mittelstand" },
  { value: "100%", label: "Unabhängig", detail: "Keine Produktbindung" },
];

export default function AboutSection() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { containerRef: factsRef, getItemStyle: getFactStyle } = useStaggeredAnimation(facts.length, { threshold: 0.3 });

  return (
    <section id="ueber-uns" className="relative overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a1628]" />
        <div className="absolute top-0 left-0 w-[55%] h-full bg-[#0f1f38] hidden lg:block"
          style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)" }}
        />
      </div>

      <div className="container relative z-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left: Statement */}
          <div
            ref={leftRef}
            className="lg:col-span-7"
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-[#d4a853]" />
              <span className="text-sm font-medium tracking-wide text-white/40 uppercase">
                Über GBG
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-8">
              Unabhängig beraten.<br />
              <span className="text-[#d4a853]">Präzise bewerten.</span>
            </h2>

            <p className="text-lg text-white/50 leading-relaxed mb-8 max-w-xl">
              Die GBG Consulting ist ein unabhängiges Beratungsunternehmen mit Standorten 
              in Hamburg und Köln. Wir unterstützen Unternehmen aller Größenordnungen bei 
              der Gestaltung, Bewertung und Verwaltung ihrer betrieblichen Altersversorgung.
            </p>

            <p className="text-white/40 leading-relaxed mb-12 max-w-xl">
              Unser Team aus erfahrenen Aktuaren verbindet tiefgreifendes Fachwissen mit 
              praxisnaher Beratung. Wir stehen für Präzision, Zuverlässigkeit und individuelle 
              Lösungen.
            </p>

            {/* Differentiators — horizontal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { title: "Präzision", desc: "Exakte Berechnungen nach höchsten Standards" },
                { title: "Partnerschaft", desc: "Langfristige, vertrauensvolle Zusammenarbeit" },
                { title: "Kompetenz", desc: "Zertifizierte Aktuare (DAV/IVS)" },
              ].map((item, i) => (
                <div key={i} className="group">
                  <h3 className="text-sm font-bold text-white mb-1 tracking-wide">{item.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="lg:col-span-5">
            <div ref={factsRef} className="space-y-6">
              {facts.map((fact, index) => (
                <div
                  key={index}
                  style={getFactStyle(index)}
                  className="group p-8 bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm
                    hover:bg-white/[0.06] hover:border-[#d4a853]/20
                    transition-all duration-500"
                >
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">{fact.value}</div>
                      <div className="text-sm text-white/50 mt-2 font-medium">{fact.label}</div>
                    </div>
                    <span className="text-xs text-white/20 uppercase tracking-wider">{fact.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
