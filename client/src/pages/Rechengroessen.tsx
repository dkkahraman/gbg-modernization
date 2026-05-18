import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: table1Ref, isVisible: table1Visible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: table2Ref, isVisible: table2Visible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-28 pb-16 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-white/20" />
        </div>
        <div
          ref={headerRef}
          className="container relative"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#d4a853]" />
              <span className="text-sm font-medium tracking-wide text-white/40 uppercase">
                Informationen
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
              Rechengrößen<br />
              <span className="text-[#d4a853]">2026.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Die wichtigsten Rechengrößen der Sozialversicherung und steuerliche Werte
              für die betriebliche Altersversorgung.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-16">
        <div className="container">
          <div className="grid md:grid-cols-12 gap-12">
            {/* Left column — info */}
            <div className="md:col-span-4">
              <div className="sticky top-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#0a1628] flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a1628] text-sm">Stand: Januar 2026</h3>
                    <p className="text-xs text-[#0a1628]/40">Alle Angaben ohne Gewähr</p>
                  </div>
                </div>
                <p className="text-sm text-[#0a1628]/50 leading-relaxed mb-8">
                  Die Werte können sich durch gesetzliche Änderungen anpassen.
                  Für eine verbindliche Auskunft kontaktieren Sie uns bitte direkt.
                </p>
                <a
                  href="/#kontakt"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a1628] text-white text-sm font-medium hover:bg-[#d4a853]"
                >
                  Beratung anfragen
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right column — tables */}
            <div className="md:col-span-8 space-y-12">
              {/* Sozialversicherung */}
              <div
                ref={table1Ref}
                style={{
                  opacity: table1Visible ? 1 : 0,
                  transform: table1Visible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                <div className="border border-[#0a1628]/5">
                  <div className="p-6 border-b border-[#0a1628]/5 bg-[#f8f7f4]">
                    <h2 className="font-serif font-bold text-[#0a1628] text-lg">
                      Sozialversicherungsrechengrößen 2026
                    </h2>
                    <p className="text-sm text-[#0a1628]/40 mt-1">Beitragsbemessungsgrenzen und Bezugsgrößen</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#0a1628]/5">
                          <th className="text-left px-6 py-4 text-xs font-semibold text-[#0a1628]/50 uppercase tracking-wider">
                            Bezeichnung
                          </th>
                          <th className="text-right px-6 py-4 text-xs font-semibold text-[#0a1628]/50 uppercase tracking-wider">
                            Wert 2026
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rechengroessen2026.map((row, index) => (
                          <tr key={index} className="border-b border-[#0a1628]/5 last:border-0">
                            <td className="px-6 py-3.5 text-sm text-[#0a1628]/70">
                              {row.bezeichnung}
                            </td>
                            <td className="text-right px-6 py-3.5 text-sm font-mono text-[#0a1628]">
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
              <div
                ref={table2Ref}
                style={{
                  opacity: table2Visible ? 1 : 0,
                  transform: table2Visible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                }}
              >
                <div className="border border-[#0a1628]/5">
                  <div className="p-6 border-b border-[#0a1628]/5 bg-[#f8f7f4]">
                    <h2 className="font-serif font-bold text-[#0a1628] text-lg">
                      Steuerliche Werte für die bAV 2026
                    </h2>
                    <p className="text-sm text-[#0a1628]/40 mt-1">Freibeträge und Pauschalierungsgrenzen</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#0a1628]/5">
                          <th className="text-left px-6 py-4 text-xs font-semibold text-[#0a1628]/50 uppercase tracking-wider">
                            Bezeichnung
                          </th>
                          <th className="text-right px-6 py-4 text-xs font-semibold text-[#0a1628]/50 uppercase tracking-wider">
                            Wert 2026
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {steuerlicheWerte2026.map((row, index) => (
                          <tr key={index} className="border-b border-[#0a1628]/5 last:border-0">
                            <td className="px-6 py-3.5 text-sm text-[#0a1628]/70">
                              {row.bezeichnung}
                            </td>
                            <td className="text-right px-6 py-3.5 text-sm font-mono text-[#0a1628]">
                              {row.wert}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
