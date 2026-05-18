import { useState, useEffect } from "react";

export type BilmogEntry = {
  period: string;
  sevenYear: string;
  tenYear: string;
  isPrognose: boolean;
};

const GBG_FORECAST: BilmogEntry = {
  period: "GBG-Prognose 12.2026",
  sevenYear: "2,64 %",
  tenYear: "2,30 %",
  isPrognose: true,
};

export const BILMOG_FALLBACK: BilmogEntry[] = [
  { period: "Veröffentlicht 12.2025", sevenYear: "2,22 %", tenYear: "2,06 %", isPrognose: false },
  { period: "Veröffentlicht 04.2026", sevenYear: "2,33 %", tenYear: "2,13 %", isPrognose: false },
  GBG_FORECAST,
];

const BASE = "https://api.bundesbank.de/service/data/BBK";

function formatGerman(value: number): string {
  return value.toFixed(2).replace(".", ",") + " %";
}

function parseSdmx(json: unknown): Record<string, number> {
  const result: Record<string, number> = {};
  try {
    const ds = (json as any)?.data?.dataSets?.[0];
    const seriesMap = ds?.series ?? ds?.Series ?? {};
    const firstKey = Object.keys(seriesMap)[0];
    if (!firstKey) return result;
    const observations: Record<string, number[]> = seriesMap[firstKey]?.observations ?? {};
    const periods: Array<{ id: string }> =
      (json as any)?.data?.structure?.dimensions?.observation?.[0]?.values ?? [];
    for (const [idx, values] of Object.entries(observations)) {
      const period = periods[Number(idx)]?.id;
      const rate = Array.isArray(values) ? values[0] : null;
      if (period && typeof rate === "number" && !isNaN(rate)) result[period] = rate;
    }
  } catch {}
  return result;
}

async function fetchSeries(seriesId: string): Promise<Record<string, number>> {
  const url = `${BASE}/${seriesId}?detail=dataonly&startPeriod=2024-01&format=json`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status}`);
  return parseSdmx(await res.json());
}

export function useBilmogRates() {
  const [data, setData] = useState<BilmogEntry[]>(BILMOG_FALLBACK);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [s7, s10] = await Promise.all([
          fetchSeries("BBK01.ST0304"),
          fetchSeries("BBK01.ST0305"),
        ]);
        const shared = Object.keys(s7).filter((p) => s10[p] != null).sort().slice(-5);
        if (shared.length === 0 || cancelled) return;
        const rows: BilmogEntry[] = shared.map((period) => {
          const [year, month] = period.split("-");
          return {
            period: `Veröffentlicht ${month}.${year}`,
            sevenYear: formatGerman(s7[period]),
            tenYear: formatGerman(s10[period]),
            isPrognose: false,
          };
        });
        if (!cancelled) {
          setData([...rows, GBG_FORECAST]);
          setIsLive(true);
        }
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, isLive };
}
