import { FileText, Calculator, Users, Scale, Building2, ClipboardCheck, ArrowUpRight, Briefcase, ShieldCheck, ArrowRight } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const featuredServices = [
  {
    icon: FileText,
    number: "01",
    title: "Versicherungsmathematische Gutachten",
    description: "Jahresabschluss-sichere Bewertung Ihrer Pensionsverpflichtungen nach HGB, IFRS und US-GAAP – präzise, termingerecht und prüfungsfest.",
    tag: "Kernleistung",
  },
  {
    icon: Calculator,
    number: "02",
    title: "Pensionsgutachten",
    description: "Individuelle Gutachten für Direktzusagen, Gesamtversorgungssysteme und GGF-Pensionszusagen – handels- und steuerrechtlich korrekt dokumentiert.",
    tag: "Kernleistung",
  },
  {
    icon: Users,
    number: "03",
    title: "GGF-Versorgung",
    description: "Analyse, Neugestaltung und Bewertung von Versorgungszusagen für Gesellschafter-Geschäftsführer – mit Blick auf steuerliche Anerkennung und wirtschaftliche Tragfähigkeit.",
    tag: "Kernleistung",
  },
];

const secondaryServices = [
  {
    icon: Scale,
    title: "Versorgungsausgleich",
    description: "Interne und externe Teilung von Betriebsrentenanwartschaften bei Scheidungsverfahren – gerichtsfest berechnet.",
  },
  {
    icon: Building2,
    title: "U-Kassen Betreuung",
    description: "Laufende Betreuung: Beitragskalkulation, Jahresabschluss, Leistungsfallbearbeitung aus einer Hand.",
  },
  {
    icon: ClipboardCheck,
    title: "Planungsrechnung",
    description: "Mehrjährige Prognose der Pensionsrückstellungen für Unternehmensplanung und M&A-Prozesse.",
  },
  {
    icon: ArrowUpRight,
    title: "Anpassung von Betriebsrenten",
    description: "Überprüfung der Anpassungspflicht nach § 16 BetrAVG und rechtssichere Dokumentation.",
  },
  {
    icon: Briefcase,
    title: "Auslagerung von Pensionszusagen",
    description: "Übertragung auf Pensionskassen, Pensionsfonds oder Lebensversicherungen inkl. Enthaftungsstruktur.",
  },
  {
    icon: ShieldCheck,
    title: "Überprüfung der Pensionszusage",
    description: "Systematischer Check auf Fehler und Optimierungspotenziale – bevor Probleme zum Streitfall werden.",
  },
];

export default function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef: featuredRef, getItemStyle: getFeaturedStyle } = useStaggeredAnimation(featuredServices.length, { threshold: 0.05 });
  const { containerRef: secondaryRef, getItemStyle: getSecondaryStyle } = useStaggeredAnimation(secondaryServices.length, { threshold: 0.05 });

  return (
    <section id="dienstleistungen" className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="max-w-2xl mx-auto text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Unsere Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
            Dienstleistungen
          </h2>
          <p className="text-muted-foreground text-lg">
            Umfassende Beratung und Betreuung in allen Bereichen der betrieblichen Altersversorgung.
          </p>
        </div>

        {/* Featured Services — prominent top row */}
        <div ref={featuredRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {featuredServices.map((service, index) => (
            <div
              key={index}
              style={getFeaturedStyle(index)}
              className="group relative bg-card rounded-2xl p-7 border border-border/50 overflow-hidden
                hover:border-primary/30 hover:shadow-2xl hover:-translate-y-2
                transition-all duration-500 ease-out cursor-default"
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-6xl font-bold text-primary/5 select-none leading-none group-hover:text-primary/10 transition-colors duration-500">
                {service.number}
              </span>
              {/* Tag */}
              <span className="inline-flex items-center text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-full px-2.5 py-0.5 mb-4">
                {service.tag}
              </span>
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4
                group-hover:bg-primary group-hover:scale-110 transition-all duration-400">
                <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-3 text-lg leading-snug group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <a href="#kontakt" className="inline-flex items-center gap-1 text-xs font-medium text-primary/60 hover:text-primary transition-colors duration-200 group-hover:gap-2">
                Mehr erfahren <ArrowRight className="w-3 h-3 transition-all duration-200" />
              </a>
            </div>
          ))}
        </div>

        {/* Secondary Services — compact grid */}
        <div ref={secondaryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondaryServices.map((service, index) => (
            <div
              key={index}
              style={getSecondaryStyle(index)}
              className="group flex items-start gap-4 bg-secondary/40 rounded-xl p-5 border border-border/30
                hover:bg-card hover:border-primary/15 hover:shadow-md
                transition-all duration-300 ease-out cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0
                group-hover:bg-primary/10 transition-colors duration-300">
                <service.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
