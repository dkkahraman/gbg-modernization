import { FileText, Calculator, Users, Scale, Building2, ClipboardCheck, ArrowUpRight, Briefcase, ShieldCheck } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: FileText,
    title: "Versicherungsmathematische Gutachten",
    description: "Professionelle Bewertung Ihrer Pensionsverpflichtungen nach HGB, IFRS und US-GAAP.",
  },
  {
    icon: Calculator,
    title: "Pensionsgutachten",
    description: "Präzise Berechnung und Bewertung von Pensionsrückstellungen für Ihren Jahresabschluss.",
  },
  {
    icon: Users,
    title: "GGF-Versorgung",
    description: "Maßgeschneiderte Versorgungslösungen für Gesellschafter-Geschäftsführer/-innen.",
  },
  {
    icon: Scale,
    title: "Versorgungsausgleich",
    description: "Fachkundige Berechnung und Begleitung bei Versorgungsausgleichsverfahren.",
  },
  {
    icon: Building2,
    title: "U-Kassen Betreuung",
    description: "Umfassende Betreuung und Verwaltung von Unterstützungskassen.",
  },
  {
    icon: ClipboardCheck,
    title: "Planungsrechnung",
    description: "Vorausschauende Planung der Rückstellungsentwicklung für Ihre Bilanz.",
  },
  {
    icon: ArrowUpRight,
    title: "Anpassung von Betriebsrenten",
    description: "Prüfung und Durchführung der gesetzlichen Rentenanpassungspflicht.",
  },
  {
    icon: Briefcase,
    title: "Auslagerung von Pensionszusagen",
    description: "Strategische Beratung zur Auslagerung und Enthaftung von Pensionsverpflichtungen.",
  },
  {
    icon: ShieldCheck,
    title: "Überprüfung der Pensionszusage",
    description: "Rechtliche und versicherungsmathematische Prüfung bestehender Zusagen.",
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
