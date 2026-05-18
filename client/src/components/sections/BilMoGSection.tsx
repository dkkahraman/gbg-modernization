import { TrendingUp, Info, ExternalLink, ArrowUp, Minus } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useBilmogRates } from "@/hooks/useBilmogRates";

type BilmogRow = {
  monat: string;
  siebenJaehrig: string;
  zehnJaehrig: string;
  isPrognose: boolean;
  trend?: "up" | "stable";
};

const FALLBACK_DATA: BilmogRow[] = [
  { monat: "Veröffentlicht 12.2025", siebenJaehrig: "2,22 %", zehnJaehrig: "2,06 %", isPrognose: false, trend: "up" },
  { monat: "Veröffentlicht 04.2026", siebenJaehrig: "2,33 %", zehnJaehrig: "2,13 %", isPrognose: false, trend: "up" },
  { monat: "GBG-Prognose 12.2026", siebenJaehrig: "2,64 %", zehnJaehrig: "2,30 %", isPrognose: true, trend: "up" },
];

function TrendIcon({ trend }: { trend?: "up" | "stable" }) {
  if (trend === "up") return <ArrowUp className="w-3 h-3 text-amber-500 inline ml-1" />;
  if (trend === "stable") return <Minus className="w-3 h-3 text-blue-400 inline ml-1" />;
  return null;
}

export default function BilMoGSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: tableRef, isVisible: tableVisible } = useScrollAnimation({ threshold: 0.2 });

  const { data: liveEntries, isLive } = useBilmogRates();
  const bilmogData: BilmogRow[] = liveEntries.map((row) => ({
    monat: row.period,
    siebenJaehrig: row.sevenYear,
    zehnJaehrig: row.tenYear,
    isPrognose: row.isPrognose,
    trend: "up" as const,
}));

  return (
    <section id="bilmog" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div
            ref={headerRef}
            className="text-center mb-12"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Aktuelle Zinsentwicklung
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
              BilMoG Zins
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Die aktuellen Rechnungszinssätze nach § 253 Abs. 2 HGB und unsere Prognose für die weitere Entwicklung.
            </p>
          </div>

          <div
            ref={tableRef}
            className="bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden hover:shadow-xl transition-shadow duration-500"
            style={{
              opacity: tableVisible ? 1 : 0,
              transform: tableVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <div className="p-6 md:p-8 border-b border-border/50 bg-primary/[0.02]">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Rechnungszinssätze nach HGB</h3>
                    <p className="text-sm text-muted-foreground">§ 253 Abs. 2 HGB (BilMoG)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isLive && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-green-50 text-green-700 border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live-Daten
                    </span>
                  )}
                  <a
                    href="https://www.bundesbank.de/de/statistiken/geld-und-kapitalmaerkte/zinssaetze-und-renditen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Bundesbank <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left px-6 md:px-8 py-4 text-sm font-semibold text-foreground">Zeitraum</th>
                    <th className="text-right px-6 md:px-8 py-4 text-sm font-semibold text-foreground">7-jährig</th>
                    <th className="text-right px-6 md:px-8 py-4 text-sm font-semibold text-foreground">10-jährig</th>
                  </tr>
                </thead>
                <tbody>
                  {bilmogData.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-border/30 last:border-0 hover:bg-primary/[0.03] transition-all duration-300 ${
                        row.isPrognose ? "bg-accent/5 hover:bg-accent/10" : ""
                      }`}
                      style={{
                        opacity: tableVisible ? 1 : 0,
                        transform: tableVisible ? "translateX(0)" : "translateX(-20px)",
                        transition: `opacity 0.5s ease ${0.4 + index * 0.15}s, transform 0.5s ease ${0.4 + index * 0.15}s`,
                      }}
                    >
                      <td className="px-6 md:px-8 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${row.isPrognose ? "font-semibold text-primary" : "text-foreground"}`}>
                            {row.monat}
                          </span>
                          {row.isPrognose && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent-foreground border border-accent/20">
                              Prognose
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={`text-right px-6 md:px-8 py-4 text-sm font-mono ${
                        row.isPrognose ? "font-bold text-primary" : "text-foreground"
                      }`}>
                        {row.siebenJaehrig}<TrendIcon trend={row.trend} />
                      </td>
                      <td className={`text-right px-6 md:px-8 py-4 text-sm font-mono ${
                        row.isPrognose ? "font-bold text-primary" : "text-foreground"
                      }`}>
                        {row.zehnJaehrig}<TrendIcon trend={row.trend} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 md:px-8 py-4 bg-muted/30 border-t border-border/50">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Die <strong>GBG-Prognose</strong> basiert auf unserer Analyse der aktuellen Zinsentwicklung am Kapitalmarkt.
                  Die veröffentlichten Werte stammen von der{" "}
                  <a
                    href="https://www.bundesbank.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground transition-colors"
                  >
                    Deutschen Bundesbank
                  </a>
                  {" "}(§ 253 Abs. 2 HGB).
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Fragen zur Auswirkung des BilMoG-Zinses auf Ihre Bilanz?{" "}
            <a href="#kontakt" className="text-primary font-medium hover:underline transition-colors">
              Jetzt kostenlos beraten lassen
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
