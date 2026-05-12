import { CheckCircle2, Target, Handshake, GraduationCap } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const values = [
  {
    icon: Target,
    title: "Präzision",
    description: "Exakte versicherungsmathematische Berechnungen nach höchsten Standards.",
  },
  {
    icon: Handshake,
    title: "Partnerschaft",
    description: "Langfristige, vertrauensvolle Zusammenarbeit mit unseren Mandanten.",
  },
  {
    icon: GraduationCap,
    title: "Kompetenz",
    description: "Hochqualifizierte Aktuare und Berater mit jahrzehntelanger Erfahrung.",
  },
];

const facts = [
  "Über 25 Jahre Erfahrung in der bAV-Beratung",
  "Über 2.000 zufriedene Mandanten aus Industrie und Mittelstand",
  "Zertifizierte Aktuare (DAV / IVS)",
  "Unabhängige und neutrale Beratung",
  "Individuelle Lösungen für jede Unternehmensgröße",
];

export default function AboutSection() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { containerRef: valuesRef, getItemStyle: getValueStyle } = useStaggeredAnimation(values.length);
  const { containerRef: statsRef, getItemStyle: getStatStyle } = useStaggeredAnimation(3, { threshold: 0.3 });

  return (
    <section id="ueber-uns" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Über uns
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-6">
              Ihr Partner für betriebliche Altersversorgung
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Die GBG Consulting für betriebliche Altersversorgung GmbH ist ein unabhängiges 
              Beratungsunternehmen mit Standorten in Hamburg und Köln. Seit über 25 Jahren unterstützen
              wir Unternehmen aller Größenordnungen bei der Gestaltung, Bewertung und Verwaltung 
              ihrer betrieblichen Altersversorgung.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Unser Team aus erfahrenen Aktuaren und Beratern verbindet tiefgreifendes 
              Fachwissen mit praxisnaher Beratung. Wir stehen für Präzision, Zuverlässigkeit 
              und individuelle Lösungen, die den spezifischen Anforderungen unserer Mandanten 
              gerecht werden.
            </p>

            {/* Facts */}
            <ul className="space-y-3">
              {facts.map((fact, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                  style={{
                    opacity: leftVisible ? 1 : 0,
                    transform: leftVisible ? "translateX(0)" : "translateX(-15px)",
                    transition: `opacity 0.5s ease ${0.3 + index * 0.1}s, transform 0.5s ease ${0.3 + index * 0.1}s`,
                  }}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Values Cards */}
          <div>
            <div ref={valuesRef} className="space-y-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  style={getValueStyle(index)}
                  className="bg-card rounded-xl p-6 border border-border/50 
                    hover:shadow-lg hover:-translate-x-2 hover:border-primary/20
                    transition-all duration-500 ease-out group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0
                      group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                      <value.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: "25+", label: "Jahre Erfahrung" },
                { value: "2.000+", label: "Mandanten" },
                { value: "100%", label: "Unabhängig" },
              ].map((stat, index) => (
                <div
                  key={index}
                  style={getStatStyle(index)}
                  className="text-center p-4 bg-secondary rounded-xl
                    hover:bg-primary/5 hover:scale-105 hover:shadow-md
                    transition-all duration-300 cursor-default"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
