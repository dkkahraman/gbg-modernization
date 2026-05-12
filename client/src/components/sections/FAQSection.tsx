import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Was ist ein versicherungsmathematisches Gutachten und wann benötige ich eines?",
    answer:
      "Ein versicherungsmathematisches Gutachten bewertet die Pensionsverpflichtungen Ihres Unternehmens nach den Vorschriften des Handelsgesetzbuches (HGB) oder internationaler Standards (IFRS/US-GAAP). Sie benötigen ein solches Gutachten für Ihren Jahresabschluss, wenn Ihr Unternehmen Pensionszusagen, Jubiläumsverpflichtungen oder Altersteilzeitregelungen hat.",
  },
  {
    question: "Wie läuft eine Zusammenarbeit mit GBG Consulting typischerweise ab?",
    answer:
      "Nach einem unverbindlichen Erstgespräch analysieren wir Ihre bestehenden Versorgungsregelungen und erstellen ein individuelles Angebot. Nach Beauftragung benötigen wir die relevanten Personaldaten und Versorgungsunterlagen. Die Erstellung des Gutachtens dauert in der Regel 2–4 Wochen. Anschließend besprechen wir die Ergebnisse persönlich mit Ihnen.",
  },
  {
    question: "Was kostet ein Pensionsgutachten?",
    answer:
      "Die Kosten hängen von der Anzahl der Versorgungsberechtigten, der Komplexität der Zusagen und dem Umfang der gewünschten Leistungen ab. Wir arbeiten ausschließlich auf Honorarbasis – transparent und ohne versteckte Kosten. Gerne erstellen wir Ihnen ein individuelles Angebot nach einem kurzen Erstgespräch.",
  },
  {
    question: "Was bedeutet der BilMoG-Rechnungszins und warum ist er wichtig?",
    answer:
      "Der BilMoG-Rechnungszins ist der Abzinsungssatz, mit dem Pensionsrückstellungen in der Handelsbilanz bewertet werden. Er wird von der Deutschen Bundesbank veröffentlicht und beeinflusst direkt die Höhe Ihrer Pensionsrückstellungen. Ein sinkender Zins führt zu höheren Rückstellungen und belastet das Ergebnis – umso wichtiger ist eine vorausschauende Planung.",
  },
  {
    question: "Können Sie auch bestehende Versorgungswerke optimieren oder umstrukturieren?",
    answer:
      "Ja, das ist einer unserer Schwerpunkte. Wir analysieren Ihre bestehenden Versorgungszusagen auf Risiken, Kosten und Gestaltungsspielräume. Darauf aufbauend entwickeln wir Strategien zur Optimierung – von der Anpassung einzelner Zusagen bis hin zur vollständigen Auslagerung auf externe Versorgungsträger.",
  },
  {
    question: "Für welche Unternehmensgrößen ist GBG Consulting der richtige Partner?",
    answer:
      "Wir betreuen Unternehmen aller Größenordnungen – vom inhabergeführten Mittelstand mit wenigen Pensionszusagen bis hin zu Konzernen mit mehreren tausend Versorgungsberechtigten. Unser Vorteil: Als mittelständisches Beratungsunternehmen bieten wir persönliche Betreuung auf Augenhöhe, kombiniert mit der fachlichen Tiefe großer Beratungshäuser.",
  },
  {
    question: "Bieten Sie auch eine kostenlose Erstberatung an?",
    answer:
      "Ja, wir bieten ein unverbindliches und kostenloses Erstgespräch an. In diesem Gespräch lernen wir Ihre Situation kennen, identifizieren Handlungsbedarf und zeigen Ihnen auf, wie wir Sie unterstützen können. Nutzen Sie dafür unser Kontaktformular oder rufen Sie uns direkt an.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
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

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card rounded-xl border border-border/50 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5 text-sm md:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA nach FAQ */}
          <div className="text-center mt-12 p-8 bg-card rounded-2xl border border-border/50 shadow-sm">
            <p className="text-foreground font-medium mb-2">
              Ihre Frage war nicht dabei?
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              Kontaktieren Sie uns für ein unverbindliches Erstgespräch – wir beraten Sie gerne persönlich.
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
            >
              Kostenlose Erstberatung anfragen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
