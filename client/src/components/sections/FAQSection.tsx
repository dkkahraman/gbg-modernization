import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "Was ist ein versicherungsmathematisches Gutachten und wann benötige ich eines?",
    answer:
      "Ein versicherungsmathematisches Gutachten bewertet die Pensionsverpflichtungen Ihres Unternehmens nach anerkannten Standards (HGB, IFRS, US-GAAP). Sie benötigen ein solches Gutachten für den Jahresabschluss, bei Unternehmenstransaktionen, für die Steuerbilanz oder bei der Neugestaltung Ihrer betrieblichen Altersversorgung.",
  },
  {
    question: "Wie läuft eine Zusammenarbeit mit GBG Consulting typischerweise ab?",
    answer:
      "Nach einem unverbindlichen Erstgespräch analysieren wir Ihre aktuelle Situation und erstellen ein individuelles Angebot. Nach Beauftragung erhalten Sie Ihr Gutachten in der Regel innerhalb von 2–4 Wochen. Für Bestandsmandanten bieten wir jährliche Aktualisierungen mit festen Lieferterminen.",
  },
  {
    question: "Was kostet ein Pensionsgutachten?",
    answer:
      "Die Kosten hängen von der Anzahl der Versorgungsberechtigten, der Komplexität der Zusagen und dem gewünschten Bewertungsstandard ab. Wir erstellen Ihnen gerne ein transparentes Festpreisangebot – kontaktieren Sie uns für eine unverbindliche Ersteinschätzung.",
  },
  {
    question: "Was bedeutet der BilMoG-Rechnungszins und warum ist er wichtig?",
    answer:
      "Der BilMoG-Rechnungszins nach § 253 Abs. 2 HGB bestimmt den Abzinsungssatz für Pensionsrückstellungen in der Handelsbilanz. Er wird von der Deutschen Bundesbank veröffentlicht und beeinflusst direkt die Höhe Ihrer bilanziellen Verpflichtungen. Unsere Prognosen helfen Ihnen bei der vorausschauenden Planung.",
  },
  {
    question: "Können Sie auch bestehende Versorgungswerke optimieren oder umstrukturieren?",
    answer:
      "Ja, wir beraten Sie umfassend bei der Optimierung bestehender Versorgungswerke – von der Umstellung auf moderne Zusageformen über die Auslagerung von Pensionsverpflichtungen bis hin zur steuerlich vorteilhaften Gestaltung von GGF-Versorgungen.",
  },
  {
    question: "Für welche Unternehmensgrößen ist GBG Consulting der richtige Partner?",
    answer:
      "Wir betreuen Unternehmen aller Größenordnungen – vom mittelständischen Familienunternehmen mit wenigen Versorgungsberechtigten bis hin zu Konzernen mit mehreren tausend Anwärtern und Rentnern. Unsere Beratung ist immer individuell auf Ihre Bedürfnisse zugeschnitten.",
  },
  {
    question: "Bieten Sie auch eine kostenlose Erstberatung an?",
    answer:
      "Ja, wir bieten ein unverbindliches Erstgespräch an, in dem wir Ihre Situation analysieren und erste Handlungsempfehlungen geben. Kontaktieren Sie uns telefonisch oder über unser Kontaktformular – wir melden uns zeitnah bei Ihnen.",
  },
];

export default function FAQSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef, getItemStyle } = useStaggeredAnimation(faqs.length, { threshold: 0.05 });

  return (
    <section id="faq" className="py-20 md:py-28 bg-secondary/30">
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
            Häufige Fragen
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3">
            Antworten auf Ihre Fragen
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Hier finden Sie Antworten auf die häufigsten Fragen rund um versicherungsmathematische Gutachten und betriebliche Altersversorgung.
          </p>
        </div>

        <div ref={containerRef} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} style={getItemStyle(index)}>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border/50 rounded-xl px-6 shadow-sm
                    hover:shadow-md hover:border-primary/20
                    transition-all duration-300 data-[state=open]:shadow-md data-[state=open]:border-primary/20"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary transition-colors duration-300 py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>

        {/* CTA nach FAQ */}
        <div
          className="text-center mt-12"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
          }}
        >
          <p className="text-muted-foreground mb-4">
            Ihre Frage war nicht dabei?
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Kontaktieren Sie uns für ein unverbindliches Erstgespräch – wir beraten Sie gerne persönlich.
          </p>
          <a href="#kontakt">
            <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300">
              Kostenlose Erstberatung anfragen
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
