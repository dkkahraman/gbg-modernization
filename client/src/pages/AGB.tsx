import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function AGB() {
  useSEO({
    title: "Allgemeine Geschäftsbedingungen",
    description: "AGB der GBG Consulting für betriebliche Altersversorgung GmbH.",
    path: "/agb",
    noindex: true,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-20">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
            Allgemeine Geschäftsbedingungen
          </h1>

          <div className="prose prose-sm md:prose-base max-w-none text-foreground/80 space-y-6">
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">§ 1 Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der GBG Consulting 
              für betriebliche Altersversorgung GmbH (nachfolgend „GBG") und ihren Auftraggebern 
              (nachfolgend „Mandant") über versicherungsmathematische Beratungsleistungen und Gutachten.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">§ 2 Leistungsumfang</h2>
            <p>
              Der Umfang der von GBG zu erbringenden Leistungen ergibt sich aus der jeweiligen 
              Auftragsbestätigung. Änderungen und Ergänzungen des Auftrags bedürfen der Schriftform.
            </p>
            <p>
              GBG erbringt ihre Leistungen nach den anerkannten Grundsätzen der Versicherungsmathematik 
              und den jeweils geltenden gesetzlichen Bestimmungen.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">§ 3 Mitwirkungspflichten des Mandanten</h2>
            <p>
              Der Mandant stellt GBG alle für die Durchführung des Auftrags erforderlichen Unterlagen 
              und Informationen rechtzeitig und vollständig zur Verfügung. Der Mandant steht für die 
              Richtigkeit und Vollständigkeit der übermittelten Daten ein.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">§ 4 Vergütung</h2>
            <p>
              Die Vergütung richtet sich nach der individuellen Vereinbarung im Angebot bzw. in der 
              Auftragsbestätigung. Sofern keine abweichende Vereinbarung getroffen wurde, erfolgt die 
              Abrechnung nach Zeitaufwand.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">§ 5 Vertraulichkeit</h2>
            <p>
              GBG verpflichtet sich, alle im Rahmen der Auftragsausführung erlangten Informationen 
              vertraulich zu behandeln. Diese Verpflichtung besteht auch nach Beendigung des 
              Vertragsverhältnisses fort.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">§ 6 Haftung</h2>
            <p>
              GBG haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit. Bei leichter 
              Fahrlässigkeit haftet GBG nur bei Verletzung wesentlicher Vertragspflichten. Die 
              Haftung ist in diesem Fall auf den vorhersehbaren, vertragstypischen Schaden begrenzt.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">§ 7 Laufzeit und Kündigung</h2>
            <p>
              Einzelaufträge enden mit der Erbringung der vereinbarten Leistung. Dauerschuldverhältnisse 
              können von beiden Seiten mit einer Frist von drei Monaten zum Quartalsende gekündigt werden.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">§ 8 Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Frankfurt am Main, 
              sofern der Mandant Kaufmann ist. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, 
              bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
