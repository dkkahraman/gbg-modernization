import { Quote } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

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
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef, getItemStyle } = useStaggeredAnimation(testimonials.length);

  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
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

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={getItemStyle(index)}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm 
                hover:shadow-lg hover:-translate-y-2 hover:border-accent/30
                transition-all duration-500 ease-out flex flex-col group"
            >
              <Quote className="w-8 h-8 text-accent/40 mb-4 shrink-0 group-hover:text-accent/70 transition-colors duration-300" />
              <blockquote className="text-foreground/80 leading-relaxed flex-1 mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="border-t border-border/50 pt-4 group-hover:border-accent/20 transition-colors duration-300">
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
