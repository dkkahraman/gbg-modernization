import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function Impressum() {
  useSEO({
    title: "Impressum",
    description: "Impressum der GBG Consulting für betriebliche Altersversorgung GmbH. Angaben gemäß § 5 TMG.",
    path: "/impressum",
    noindex: true,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-20">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
            Impressum
          </h1>

          {/* Hinweis für den Betreiber */}
          <div className="mb-8 p-4 rounded-lg bg-accent/10 border border-accent/30">
            <p className="text-sm text-accent-foreground font-medium">
              Hinweis: Die nachfolgenden Angaben enthalten Platzhalter (gekennzeichnet mit [...] oder XXX). 
              Diese müssen vor der Veröffentlichung durch die tatsächlichen Unternehmensdaten ersetzt werden.
            </p>
          </div>

          <div className="prose prose-sm md:prose-base max-w-none text-foreground/80 space-y-6">
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Angaben gemäß § 5 TMG</h2>
            <p>
              GBG Consulting für betriebliche Altersversorgung GmbH<br />
              Frankfurt am Main<br />
              Deutschland
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Kontakt</h2>
            <p>
              Telefon: +49 (0) 69 / 000 000<br />
              E-Mail: info@gbg-consulting.de<br />
              Website: www.gbg-consulting.de
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Registereintrag</h2>
            <p>
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Frankfurt am Main<br />
              Registernummer: HRB XXXXX
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Geschäftsführung</h2>
            <p>
              Geschäftsführer: [Name des Geschäftsführers]
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE XXXXXXXXX
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p>
              Berufsbezeichnung: Versicherungsmathematische Beratung<br />
              Zuständige Aufsichtsbehörde: IHK Frankfurt am Main
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Haftungsausschluss</h2>
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
              Tätigkeit hinweisen.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
              Seiten verantwortlich.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
