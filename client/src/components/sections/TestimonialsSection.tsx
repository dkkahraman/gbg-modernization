import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Die GBG Consulting hat unsere betriebliche Altersversorgung komplett neu strukturiert. Die Zusammenarbeit war von Anfang an professionell, transparent und auf unsere individuellen Bedürfnisse zugeschnitten.",
    author: "Geschäftsführer",
    company: "Mittelständisches Industrieunternehmen, 450 Mitarbeiter",
    region: "Rhein-Main-Gebiet",
  },
  {
    quote:
      "Besonders beeindruckt hat uns die Präzision der versicherungsmathematischen Gutachten und die verständliche Aufbereitung komplexer Sachverhalte. GBG ist seit über 10 Jahren unser verlässlicher Partner.",
    author: "Leiter Finanzen & Controlling",
    company: "Technologieunternehmen, 200 Mitarbeiter",
    region: "Hessen",
  },
  {
    quote:
      "Bei der Auslagerung unserer Pensionsverpflichtungen hat GBG uns mit fundierter Expertise und pragmatischen Lösungen überzeugt. Die Beratung war stets auf Augenhöhe und ergebnisorientiert.",
    author: "Vorstand Personal",
    company: "Familienunternehmen, 1.200 Mitarbeiter",
    region: "Süddeutschland",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Referenzen
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3">
            Was unsere Mandanten sagen
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Vertrauen entsteht durch Ergebnisse. Hier berichten Mandanten von ihrer Zusammenarbeit mit GBG Consulting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <Quote className="w-8 h-8 text-accent/40 mb-4 shrink-0" />
              <blockquote className="text-foreground/80 leading-relaxed flex-1 mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="border-t border-border/50 pt-4">
                <p className="font-semibold text-foreground text-sm">
                  {testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {testimonial.company}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.region}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
