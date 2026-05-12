import { publicProcedure, router } from "./_core/trpc";

// Bundesbank SDMX-JSON API – § 253 Abs. 2 HGB (BilMoG) Rechnungszinssätze
// Zeitreihen-IDs prüfen unter: https://www.bundesbank.de/dynamic/action/de/statistiken/zeitreihen-datenbanken/
// BBK01.ST0304 = 7-jähriger Durchschnittszins | BBK01.ST0305 = 10-jähriger Durchschnittszins
const BUNDESBANK_BASE = "https://api.bundesbank.de/service/data/BBK";
const SERIES_7Y = "BBK01.ST0304";
const SERIES_10Y = "BBK01.ST0305";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 Stunden – Daten werden monatlich veröffentlicht

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

const FALLBACK: BilmogEntry[] = [
  { period: "Veröffentlicht 12.2025", sevenYear: "2,22 %", tenYear: "2,06 %", isPrognose: false },
  { period: "Veröffentlicht 04.2026", sevenYear: "2,33 %", tenYear: "2,13 %", isPrognose: false },
  GBG_FORECAST,
];

type CacheEntry = { data: BilmogEntry[]; fetchedAt: number };
let cache: CacheEntry | null = null;

function formatGerman(value: number): string {
  return value.toFixed(2).replace(".", ",") + " %";
}

function parseSdmxJson(json: unknown): Record<string, number> {
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
  } catch {
    // Malformed response – Fallback greift
  }
  return result;
}

async function fetchSeries(seriesId: string): Promise<Record<string, number>> {
  const url = `${BUNDESBANK_BASE}/${seriesId}?detail=dataonly&startPeriod=2024-01&format=json`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) throw new Error(`Bundesbank API ${res.status} für ${seriesId}`);
  return parseSdmxJson(await res.json());
}

async function fetchLiveRates(): Promise<BilmogEntry[]> {
  const [s7, s10] = await Promise.all([fetchSeries(SERIES_7Y), fetchSeries(SERIES_10Y)]);
  const sharedPeriods = Object.keys(s7)
    .filter((p) => s10[p] != null)
    .sort()
    .slice(-5);
  if (sharedPeriods.length === 0) throw new Error("Keine gemeinsamen Perioden");
  const rows: BilmogEntry[] = sharedPeriods.map((period) => {
    const [year, month] = period.split("-");
    return {
      period: `Veröffentlicht ${month}.${year}`,
      sevenYear: formatGerman(s7[period]),
      tenYear: formatGerman(s10[period]),
      isPrognose: false,
    };
  });
  return [...rows, GBG_FORECAST];
}

export const bilmogRouter = router({
  getRates: publicProcedure.query(async () => {
    if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
      return { data: cache.data, source: "live" as const };
    }
    try {
      const data = await fetchLiveRates();
      cache = { data, fetchedAt: Date.now() };
      return { data, source: "live" as const };
    } catch {
      return { data: FALLBACK, source: "fallback" as const };
    }
  }),
});

// ── In server/routers.ts einbinden ────────────────────────────────────────────
// 1. import { bilmogRouter } from "./bilmog";
// 2. In appRouter ergänzen: bilmog: bilmogRouter,
// Der Client ruft bereits trpc.bilmog.getRates.useQuery() auf (BilMoGSection.tsx).
// ─────────────────────────────────────────────────────────────────────────────
