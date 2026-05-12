import { TrendingUp, Info } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const bilmogData = [
  { monat: "Veröffentlicht 12.2025", siebenJaehrig: "2,22 %", zehnJaehrig: "2,06 %", isPrognose: false },
  { monat: "Veröffentlicht 04.2026", siebenJaehrig: "2,33 %", zehnJaehrig: "2,13 %", isPrognose: false },
  { monat: "GBG-Prognose 12.2026", siebenJaehrig: "2,64 %", zehnJaehrig: "2,30 %", isPrognose: true },
];

export default function BilMoGSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: tableRef, isVisible: tableVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="bilmog" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
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
              Die aktuellen Rechnungszinssätze nach § 253 Abs. 2 HGB und unsere Prognose für die Entwicklung.
            </p>
          </div>

          {/* Table Card */}
          <div
            ref={tableRef}
            className="bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden
              hover:shadow-xl transition-shadow duration-500"
            style={{
              opacity: tableVisible ? 1 : 0,
              transform: tableVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <div className="p-6 md:p-8 border-b border-border/50 bg-primary/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Rechnungszinssätze nach HGB</h3>
                  <p className="text-sm text-muted-foreground">§ 253 Abs. 2 HGB (BilMoG)</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left px-6 md:px-8 py-4 text-sm font-semibold text-foreground">
                      Zeitraum
                    </th>
                    <th className="text-right px-6 md:px-8 py-4 text-sm font-semibold text-foreground">
                      7-jährig
                    </th>
                    <th className="text-right px-6 md:px-8 py-4 text-sm font-semibold text-foreground">
                      10-jährig
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bilmogData.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-border/30 last:border-0 
                        hover:bg-primary/[0.03] transition-all duration-300
                        ${row.isPrognose ? "bg-accent/5 hover:bg-accent/10" : ""}`}
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
                        {row.siebenJaehrig}
                      </td>
                      <td className={`text-right px-6 md:px-8 py-4 text-sm font-mono ${
                        row.isPrognose ? "font-bold text-primary" : "text-foreground"
                      }`}>
                        {row.zehnJaehrig}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Info Footer */}
            <div className="px-6 md:px-8 py-4 bg-muted/30 border-t border-border/50">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Die GBG-Prognose basiert auf unserer Analyse der aktuellen Zinsentwicklung. 
                  Die veröffentlichten Werte stammen von der Deutschen Bundesbank.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
