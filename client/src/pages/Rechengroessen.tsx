import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const rechengroessen2026 = [
  { bezeichnung: "Beitragsbemessungsgrenze allg. RV (West)", wert: "7.550 EUR/Monat" },
  { bezeichnung: "Beitragsbemessungsgrenze allg. RV (Ost)", wert: "7.550 EUR/Monat" },
  { bezeichnung: "Beitragsbemessungsgrenze knappschaftl. RV (West)", wert: "9.300 EUR/Monat" },
  { bezeichnung: "Beitragsbemessungsgrenze knappschaftl. RV (Ost)", wert: "9.300 EUR/Monat" },
  { bezeichnung: "Beitragsbemessungsgrenze GKV", wert: "5.512,50 EUR/Monat" },
  { bezeichnung: "Versicherungspflichtgrenze GKV", wert: "6.150 EUR/Monat" },
  { bezeichnung: "Bezugsgröße (West)", wert: "3.745 EUR/Monat" },
  { bezeichnung: "Bezugsgröße (Ost)", wert: "3.745 EUR/Monat" },
];

const steuerlicheWerte2026 = [
  { bezeichnung: "§ 3 Nr. 63 EStG – steuerfreier Höchstbetrag", wert: "604 EUR/Monat (8 % BBG RV)" },
  { bezeichnung: "§ 40b EStG a.F. – Pauschalierungsgrenze", wert: "1.752 EUR/Jahr" },
  { bezeichnung: "Sozialversicherungsfreiheit (§ 1 Abs. 1 Nr. 9 SvEV)", wert: "302 EUR/Monat (4 % BBG RV)" },
];

export default function Rechengroessen() {
  useSEO({
    title: "Rechengrößen der Sozialversicherung 2026",
    description: "Aktuelle Rechengrößen der Sozialversicherung 2026: Beitragsbemessungsgrenzen, Bezugsgrößen und weitere relevante Werte für die betriebliche Altersversorgung.",
    path: "/rechengroessen",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-20">
        <div className="container">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Informationen
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
              Rechengrößen 2026
            </h1>
            <p className="text-muted-foreground text-lg">
              Die wichtigsten Rechengrößen der Sozialversicherung und steuerliche Werte 
              für die betriebliche Altersversorgung.
            </p>
          </div>

          {/* Sozialversicherung */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-border/50 bg-primary/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Sozialversicherungsrechengrößen 2026</h2>
                    <p className="text-sm text-muted-foreground">Beitragsbemessungsgrenzen und Bezugsgrößen</p>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left px-6 md:px-8 py-4 text-sm font-semibold text-foreground">
                        Bezeichnung
                      </th>
                      <th className="text-right px-6 md:px-8 py-4 text-sm font-semibold text-foreground">
                        Wert 2026
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rechengroessen2026.map((row, index) => (
                      <tr key={index} className="border-b border-border/30 last:border-0 hover:bg-secondary/50 transition-colors">
                        <td className="px-6 md:px-8 py-3.5 text-sm text-foreground">
                          {row.bezeichnung}
                        </td>
                        <td className="text-right px-6 md:px-8 py-3.5 text-sm font-mono text-foreground">
                          {row.wert}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Steuerliche Werte */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-border/50 bg-primary/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Steuerliche Werte für die bAV 2026</h2>
                    <p className="text-sm text-muted-foreground">Freibeträge und Pauschalierungsgrenzen</p>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left px-6 md:px-8 py-4 text-sm font-semibold text-foreground">
                        Bezeichnung
                      </th>
                      <th className="text-right px-6 md:px-8 py-4 text-sm font-semibold text-foreground">
                        Wert 2026
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {steuerlicheWerte2026.map((row, index) => (
                      <tr key={index} className="border-b border-border/30 last:border-0 hover:bg-secondary/50 transition-colors">
                        <td className="px-6 md:px-8 py-3.5 text-sm text-foreground">
                          {row.bezeichnung}
                        </td>
                        <td className="text-right px-6 md:px-8 py-3.5 text-sm font-mono text-foreground">
                          {row.wert}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="max-w-4xl mx-auto mt-8">
            <p className="text-xs text-muted-foreground text-center">
              Stand: Januar 2026. Alle Angaben ohne Gewähr. Die Werte können sich durch gesetzliche 
              Änderungen anpassen. Für eine verbindliche Auskunft kontaktieren Sie uns bitte direkt.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
