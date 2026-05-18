import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    quote:
      "Die GBG Consulting hat unsere betriebliche Altersversorgung komplett neu strukturiert. Die Zusammenarbeit war von Anfang an professionell, transparent und auf unsere individuellen Bedürfnisse zugeschnitten.",
    author: "Geschäftsführer",
    company: "Mittelständisches Industrieunternehmen",
    detail: "450 Mitarbeiter · Rhein-Main",
  },
  {
    quote:
      "Besonders beeindruckt hat uns die Präzision der versicherungsmathematischen Gutachten und die verständliche Aufbereitung komplexer Sachverhalte. GBG ist seit über 10 Jahren unser verlässlicher Partner.",
    author: "Leiter Finanzen & Controlling",
    company: "Technologieunternehmen",
    detail: "200 Mitarbeiter · Hessen",
  },
  {
    quote:
      "Bei der Auslagerung unserer Pensionsverpflichtungen hat GBG uns mit fundierter Expertise und pragmatischen Lösungen überzeugt. Die Beratung war stets auf Augenhöhe.",
    author: "Vorstand Personal",
    company: "Familienunternehmen",
    detail: "1.200 Mitarbeiter · Süddeutschland",
  },
];

export default function TestimonialsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef, getItemStyle } = useStaggeredAnimation(testimonials.length);

  return (
    <section className="py-24 md:py-32 bg-[#f8f7f4] relative overflow-hidden">
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent" />

      <div className="container">
        {/* Header — left-aligned */}
        <div
          ref={headerRef}
          className="max-w-2xl mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[#d4a853]" />
            <span className="text-sm font-medium tracking-wide text-[#0a1628]/50 uppercase">
              Referenzen
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1628] leading-tight">
            Vertrauen entsteht<br />
            <span className="text-[#d4a853]">durch Ergebnisse.</span>
          </h2>
        </div>

        {/* Testimonials — asymmetric grid */}
        <div ref={containerRef} className="grid md:grid-cols-12 gap-6">
          {/* First testimonial — large */}
          <div
            style={getItemStyle(0)}
            className="md:col-span-7 group relative p-10 bg-white border border-[#0a1628]/5
              hover:border-[#d4a853]/20 transition-all duration-500"
          >
            <span className="absolute top-8 right-10 text-8xl font-serif text-[#0a1628]/[0.03] leading-none select-none">&ldquo;</span>
            <blockquote className="text-[#0a1628]/70 text-lg leading-relaxed mb-8 relative z-10">
              {testimonials[0].quote}
            </blockquote>
            <div className="flex items-center gap-4 pt-6 border-t border-[#0a1628]/5">
              <div className="w-10 h-10 bg-[#0a1628] flex items-center justify-center">
                <span className="text-white text-sm font-bold">{testimonials[0].author[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-[#0a1628] text-sm">{testimonials[0].author}</p>
                <p className="text-xs text-[#0a1628]/40">{testimonials[0].company} · {testimonials[0].detail}</p>
              </div>
            </div>
          </div>

          {/* Second + Third — stacked right */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {testimonials.slice(1).map((t, index) => (
              <div
                key={index}
                style={getItemStyle(index + 1)}
                className="group relative p-8 bg-white border border-[#0a1628]/5 flex-1
                  hover:border-[#d4a853]/20 transition-all duration-500"
              >
                <blockquote className="text-[#0a1628]/70 text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-[#0a1628]/5">
                  <div className="w-8 h-8 bg-[#0a1628]/5 flex items-center justify-center">
                    <span className="text-[#0a1628] text-xs font-bold">{t.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a1628] text-xs">{t.author}</p>
                    <p className="text-[10px] text-[#0a1628]/40">{t.company} · {t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
