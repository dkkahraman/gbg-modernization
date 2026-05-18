import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <section id="faq" className="py-24 md:py-32 bg-[#f8f7f4] relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent" />

      <div className="container">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left column — header */}
          <div
            ref={headerRef}
            className="md:col-span-4"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#d4a853]" />
              <span className="text-sm font-medium tracking-wide text-[#0a1628]/50 uppercase">
                Häufige Fragen
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1628] leading-tight mb-6">
              Antworten auf<br />
              <span className="text-[#d4a853]">Ihre Fragen.</span>
            </h2>
            <p className="text-[#0a1628]/60 leading-relaxed mb-10">
              Hier finden Sie Antworten auf die häufigsten Fragen rund um versicherungsmathematische
              Gutachten und betriebliche Altersversorgung.
            </p>

            {/* CTA */}
            <div className="border-t border-[#0a1628]/10 pt-8">
              <p className="text-sm text-[#0a1628]/40 mb-4">
                Ihre Frage war nicht dabei?
              </p>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a1628] text-white text-sm font-medium hover:bg-[#0a1628]/90"
              >
                Kostenlose Erstberatung anfragen
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right column — accordion */}
          <div ref={containerRef} className="md:col-span-8">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} style={getItemStyle(index)}>
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-white border border-[#0a1628]/5 px-6
                      data-[state=open]:border-[#d4a853]/30"
                  >
                    <AccordionTrigger className="text-left font-medium text-[#0a1628] hover:text-[#d4a853] py-5 text-sm">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#0a1628]/60 leading-relaxed pb-5 text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
