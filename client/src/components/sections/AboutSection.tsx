import { CheckCircle2, Target, Handshake, GraduationCap } from "lucide-react";

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
  "Hunderte zufriedene Mandanten aus Industrie und Mittelstand",
  "Zertifizierte Aktuare (DAV / IVS)",
  "Unabhängige und neutrale Beratung",
  "Individuelle Lösungen für jede Unternehmensgröße",
];

export default function AboutSection() {
  return (
    <section id="ueber-uns" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Über uns
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-6">
              Ihr Partner für betriebliche Altersversorgung
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Die GBG Consulting für betriebliche Altersversorgung GmbH ist ein unabhängiges 
              Beratungsunternehmen mit Sitz in Frankfurt am Main. Seit über 25 Jahren unterstützen 
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
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Values Cards */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-primary">25+</div>
                <div className="text-xs text-muted-foreground mt-1">Jahre Erfahrung</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                <div className="text-xs text-muted-foreground mt-1">Mandanten</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground mt-1">Unabhängig</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
