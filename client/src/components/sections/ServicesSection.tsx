import { FileText, Calculator, Users, Scale, Building2, ClipboardCheck, ArrowRight, Briefcase, ShieldCheck } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const featuredServices = [
  {
    icon: FileText,
    number: "01",
    title: "Versicherungsmathematische Gutachten",
    description: "Bewertung Ihrer Pensionsverpflichtungen nach HGB, IFRS und US-GAAP – präzise, termingerecht und prüfungsfest.",
  },
  {
    icon: Calculator,
    number: "02",
    title: "Pensionsgutachten",
    description: "Individuelle Gutachten für Direktzusagen, Gesamtversorgungssysteme und GGF-Pensionszusagen.",
  },
  {
    icon: Users,
    number: "03",
    title: "GGF-Versorgung",
    description: "Analyse und Bewertung von Versorgungszusagen für Gesellschafter-Geschäftsführer.",
  },
];

const secondaryServices = [
  {
    icon: Scale,
    title: "Versorgungsausgleich",
    description: "Interne und externe Teilung von Betriebsrentenanwartschaften bei Scheidungsverfahren.",
  },
  {
    icon: Building2,
    title: "U-Kassen Betreuung",
    description: "Beitragskalkulation, Jahresabschluss und Leistungsfallbearbeitung aus einer Hand.",
  },
  {
    icon: ClipboardCheck,
    title: "Planungsrechnung",
    description: "Mehrjährige Prognose der Pensionsrückstellungen für Unternehmensplanung.",
  },
  {
    icon: Briefcase,
    title: "Auslagerung",
    description: "Übertragung auf Pensionskassen oder Pensionsfonds inkl. Enthaftungsstruktur.",
  },
  {
    icon: ShieldCheck,
    title: "Überprüfung",
    description: "Systematischer Check auf Fehler und Optimierungspotenziale Ihrer Zusagen.",
  },
];

export default function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef: featuredRef, getItemStyle: getFeaturedStyle } = useStaggeredAnimation(featuredServices.length, { threshold: 0.05 });
  const { containerRef: secondaryRef, getItemStyle: getSecondaryStyle } = useStaggeredAnimation(secondaryServices.length, { threshold: 0.05 });

  return (
    <section id="dienstleistungen" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent" />
      
      <div className="container">
        {/* Section Header — left-aligned, consulting style */}
        <div
          ref={headerRef}
          className="max-w-3xl mb-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[#d4a853]" />
            <span className="text-sm font-medium tracking-wide text-[#0a1628]/50 uppercase">
              Unsere Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1628] leading-tight mb-4">
            Leistungen, die<br />
            <span className="text-[#d4a853]">Sicherheit schaffen.</span>
          </h2>
          <p className="text-lg text-[#0a1628]/50 max-w-xl">
            Umfassende Beratung in allen Bereichen der betrieblichen Altersversorgung.
          </p>
        </div>

        {/* Featured Services — large cards with number accent */}
        <div ref={featuredRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredServices.map((service, index) => (
            <div
              key={index}
              style={getFeaturedStyle(index)}
              className="group relative p-8 border-t-2 border-[#0a1628]/10 hover:border-[#d4a853]
                transition-all duration-500 ease-out cursor-default"
            >
              {/* Number */}
              <span className="text-7xl font-bold text-[#0a1628]/[0.03] absolute top-4 right-4 leading-none select-none group-hover:text-[#d4a853]/10 transition-colors duration-500">
                {service.number}
              </span>
              
              <div className="w-11 h-11 flex items-center justify-center mb-6 bg-[#0a1628]/[0.03] group-hover:bg-[#0a1628] transition-all duration-400">
                <service.icon className="w-5 h-5 text-[#0a1628] group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="font-semibold text-[#0a1628] text-lg mb-3 leading-snug group-hover:text-[#0a1628] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-[#0a1628]/50 leading-relaxed mb-6">
                {service.description}
              </p>
              <a href="#kontakt" className="inline-flex items-center gap-2 text-xs font-semibold text-[#0a1628]/40 uppercase tracking-wider hover:text-[#d4a853] transition-colors duration-200 group-hover:text-[#d4a853]">
                Anfragen <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* Secondary Services — minimal list style */}
        <div className="border-t border-[#0a1628]/10 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0a1628]/30">Weitere Leistungen</span>
          </div>
          <div ref={secondaryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            {secondaryServices.map((service, index) => (
              <div
                key={index}
                style={getSecondaryStyle(index)}
                className="group flex items-start gap-4 py-4 border-b border-[#0a1628]/5 last:border-0
                  hover:border-[#d4a853]/30 transition-all duration-300 cursor-default"
              >
                <service.icon className="w-4 h-4 text-[#0a1628]/30 mt-0.5 shrink-0 group-hover:text-[#d4a853] transition-colors duration-300" />
                <div>
                  <h3 className="font-semibold text-[#0a1628] text-sm mb-0.5 group-hover:text-[#0a1628] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#0a1628]/40 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
