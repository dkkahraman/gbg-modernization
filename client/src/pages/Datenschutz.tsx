import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function Datenschutz() {
  useSEO({
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung der GBG Consulting für betriebliche Altersversorgung GmbH. Informationen zur Verarbeitung personenbezogener Daten.",
    path: "/datenschutz",
    noindex: true,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-20">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
            Datenschutzerklärung
          </h1>

          <div className="prose prose-sm md:prose-base max-w-none text-foreground/80 space-y-6">
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
              Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen 
              Sie persönlich identifiziert werden können.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Datenerfassung auf dieser Website</h3>
            <p>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
              können Sie dem Impressum dieser Website entnehmen.
            </p>
            <p>
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
              z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch 
              oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">2. Hosting</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter. Die personenbezogenen Daten, 
              die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln 
              Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften 
              sowie dieser Datenschutzerklärung.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
              GBG Consulting für betriebliche Altersversorgung GmbH<br />
              Frankfurt am Main<br /><br />
              E-Mail: info@gbg-consulting.de
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">4. Datenerfassung auf dieser Website</h2>
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben 
              wir nicht ohne Ihre Einwilligung weiter.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">5. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck 
              Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die 
              Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur 
              Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft 
              widerrufen.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
