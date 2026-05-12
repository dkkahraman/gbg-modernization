import { FileText, Calculator, Users, Scale, Building2, ClipboardCheck, ArrowUpRight, Briefcase, ShieldCheck } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: FileText,
    title: "Versicherungsmathematische Gutachten",
    description: "Jahresabschluss-sichere Bewertung Ihrer Pensionsverpflichtungen nach HGB, IFRS und US-GAAP – präzise, termingerecht und prüfungsfest.",
  },
  {
    icon: Calculator,
    title: "Pensionsgutachten",
    description: "Individuelle Gutachten für Direktzusagen, Gesamtversorgungssysteme und GGF-Pensionszusagen – handels- und steuerrechtlich korrekt dokumentiert.",
  },
  {
    icon: Users,
    title: "GGF-Versorgung",
    description: "Analyse, Neugestaltung und Bewertung von Versorgungszusagen für Gesellschafter-Geschäftsführer – mit Blick auf steuerliche Anerkennung und wirtschaftliche Tragfähigkeit.",
  },
  {
    icon: Scale,
    title: "Versorgungsausgleich",
    description: "Interne und externe Teilung von Betriebsrentenanwartschaften bei Scheidungsverfahren – gerichtsfest berechnet und termingerecht geliefert.",
  },
  {
    icon: Building2,
    title: "U-Kassen Betreuung",
    description: "Laufende Betreuung von Unterstützungskassen: Beitragskalkulation, Jahresabschluss, Leistungsfallbearbeitung und Anpassungsprüfung aus einer Hand.",
  },
  {
    icon: ClipboardCheck,
    title: "Planungsrechnung",
    description: "Mehrjährige Prognose der Pensionsrückstellungen für Ihre Unternehmensplanung, M&A-Prozesse und Liquiditätssteuerung.",
  },
  {
    icon: ArrowUpRight,
    title: "Anpassung von Betriebsrenten",
    description: "Überprüfung der Anpassungspflicht nach § 16 BetrAVG und rechtssichere Dokumentation der wirtschaftlichen Lage Ihres Unternehmens.",
  },
  {
    icon: Briefcase,
    title: "Auslagerung von Pensionszusagen",
    description: "Beratung und Umsetzung bei der Übertragung auf Pensionskassen, Pensionsfonds oder Lebensversicherungen – inklusive Liquiditätsplanung und Enthaftungsstruktur.",
  },
  {
    icon: ShieldCheck,
    title: "Überprüfung der Pensionszusage",
    description: "Systematischer Check bestehender Zusagen auf Fehler, Unklarheiten und Optimierungspotenziale – damit Probleme erkannt werden, bevor sie zum Streitfall werden.",
  },
];

export default function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef, getItemStyle } = useStaggeredAnimation(services.length, { threshold: 0.05 });

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

        {/* Services Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              style={getItemStyle(index)}
              className="group bg-card rounded-xl p-6 border border-border/50 
                hover:border-primary/20 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
                transition-all duration-500 ease-out cursor-default"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 
                group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-lg group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
