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

function TrendIcon({ trend }: { trend?: "up" | "stable" }) {
  if (trend === "up") return <ArrowUp className="w-3 h-3 text-[#d4a853] inline ml-1" />;
  if (trend === "stable") return <Minus className="w-3 h-3 text-[#0a1628]/40 inline ml-1" />;
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
    <section id="bilmog" className="py-24 md:py-32 bg-white relative overflow-hidden">
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
                Zinsentwicklung
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1628] leading-tight mb-6">
              BilMoG<br />
              <span className="text-[#d4a853]">Rechnungszins.</span>
            </h2>
            <p className="text-[#0a1628]/60 leading-relaxed mb-8">
              Die aktuellen Rechnungszinssätze nach § 253 Abs. 2 HGB und unsere
              Prognose für die weitere Entwicklung.
            </p>

            <div className="flex items-center gap-3 mb-6">
              {isLive && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-[#0a1628] text-white">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Live-Daten
                </span>
              )}
              <a
                href="https://www.bundesbank.de/de/statistiken/geld-und-kapitalmaerkte/zinssaetze-und-renditen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#0a1628]/40 hover:text-[#d4a853]"
              >
                Bundesbank <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-[#0a1628]/35 leading-relaxed">
              Fragen zur Auswirkung des BilMoG-Zinses auf Ihre Bilanz?{" "}
              <a href="#kontakt" className="text-[#d4a853] font-medium hover:underline">
                Jetzt kostenlos beraten lassen
              </a>
            </p>
          </div>

          {/* Right column — table */}
          <div
            ref={tableRef}
            className="md:col-span-8"
            style={{
              opacity: tableVisible ? 1 : 0,
              transform: tableVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <div className="border border-[#0a1628]/5 bg-white">
              {/* Table header */}
              <div className="p-6 md:p-8 border-b border-[#0a1628]/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0a1628] flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0a1628] text-sm">Rechnungszinssätze nach HGB</h3>
                      <p className="text-xs text-[#0a1628]/40">§ 253 Abs. 2 HGB (BilMoG)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#0a1628]/5">
                      <th className="text-left px-6 md:px-8 py-4 text-xs font-semibold text-[#0a1628]/50 uppercase tracking-wider">Zeitraum</th>
                      <th className="text-right px-6 md:px-8 py-4 text-xs font-semibold text-[#0a1628]/50 uppercase tracking-wider">7-jährig</th>
                      <th className="text-right px-6 md:px-8 py-4 text-xs font-semibold text-[#0a1628]/50 uppercase tracking-wider">10-jährig</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bilmogData.map((row, index) => (
                      <tr
                        key={index}
                        className={`border-b border-[#0a1628]/5 last:border-0 ${
                          row.isPrognose ? "bg-[#d4a853]/[0.03]" : ""
                        }`}
                        style={{
                          opacity: tableVisible ? 1 : 0,
                          transform: tableVisible ? "translateX(0)" : "translateX(-20px)",
                          transition: `opacity 0.5s ease ${0.4 + index * 0.15}s, transform 0.5s ease ${0.4 + index * 0.15}s`,
                        }}
                      >
                        <td className="px-6 md:px-8 py-5">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${row.isPrognose ? "font-semibold text-[#0a1628]" : "text-[#0a1628]/70"}`}>
                              {row.monat}
                            </span>
                            {row.isPrognose && (
                              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium bg-[#d4a853]/10 text-[#d4a853] border border-[#d4a853]/20">
                                Prognose
                              </span>
                            )}
                          </div>
                        </td>
                        <td className={`text-right px-6 md:px-8 py-5 font-mono ${
                          row.isPrognose ? "text-lg font-bold text-[#0a1628]" : "text-sm text-[#0a1628]/70"
                        }`}>
                          {row.siebenJaehrig}<TrendIcon trend={row.trend} />
                        </td>
                        <td className={`text-right px-6 md:px-8 py-5 font-mono ${
                          row.isPrognose ? "text-lg font-bold text-[#d4a853]" : "text-sm text-[#0a1628]/70"
                        }`}>
                          {row.zehnJaehrig}<TrendIcon trend={row.trend} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer note */}
              <div className="px-6 md:px-8 py-4 border-t border-[#0a1628]/5 bg-[#f8f7f4]">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#0a1628]/30 mt-0.5 shrink-0" />
                  <p className="text-xs text-[#0a1628]/50">
                    Die <strong className="text-[#0a1628]/70">GBG-Prognose</strong> basiert auf unserer Analyse der aktuellen Zinsentwicklung am Kapitalmarkt.
                    Die veröffentlichten Werte stammen von der{" "}
                    <a
                      href="https://www.bundesbank.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#d4a853]"
                    >
                      Deutschen Bundesbank
                    </a>
                    {" "}(§ 253 Abs. 2 HGB).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
