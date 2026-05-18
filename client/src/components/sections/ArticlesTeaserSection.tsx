import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const CATEGORY_COLORS: Record<string, string> = {
  bilmog: "bg-[#0a1628] text-white",
  pensionsgutachten: "bg-[#d4a853] text-white",
  bav: "bg-[#0a1628]/70 text-white",
  recht: "bg-[#0a1628]/50 text-white",
  aktuelles: "bg-[#0a1628]/30 text-white",
};

const CATEGORY_LABELS: Record<string, string> = {
  bilmog: "BilMoG",
  pensionsgutachten: "Pensionsgutachten",
  bav: "Betriebliche AV",
  recht: "Recht & Urteile",
  aktuelles: "Aktuelles",
};

export default function ArticlesTeaserSection() {
  const { data: articles, isLoading } = trpc.articles.listPublished.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef, getItemStyle } = useStaggeredAnimation(3, { threshold: 0.05 });

  const latest = articles?.slice(0, 3) ?? [];

  // Kein Render wenn keine Artikel vorhanden und nicht am Laden
  if (!isLoading && latest.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent" />

      <div className="container">
        {/* Header — left-aligned */}
        <div
          ref={headerRef}
          className="mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-[#d4a853]" />
                <span className="text-sm font-medium tracking-wide text-[#0a1628]/50 uppercase">
                  Fachwissen & Aktuelles
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1628] leading-tight">
                Aktuelle<br />
                <span className="text-[#d4a853]">Fachartikel.</span>
              </h2>
              <p className="text-[#0a1628]/60 leading-relaxed mt-4 max-w-lg">
                Unsere Experten berichten über aktuelle Entwicklungen in der betrieblichen
                Altersversorgung, BilMoG-Zinssätze und relevante Rechtsprechung.
              </p>
            </div>
            <Link href="/blog">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a1628] text-white text-sm font-medium hover:bg-[#0a1628]/90 cursor-pointer">
                <BookOpen className="w-4 h-4" />
                Alle Fachartikel
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-t-2 border-[#0a1628]/10 pt-6">
                <div className="h-4 w-20 bg-[#0a1628]/5 mb-4" />
                <div className="h-6 w-3/4 bg-[#0a1628]/5 mb-3" />
                <div className="h-4 w-full bg-[#0a1628]/5 mb-2" />
                <div className="h-4 w-2/3 bg-[#0a1628]/5" />
              </div>
            ))}
          </div>
        ) : (
          <div ref={containerRef} className="grid md:grid-cols-3 gap-8">
            {latest.map((article, index) => (
              <div key={article.id} style={getItemStyle(index)}>
                <Link href={`/blog/${article.slug}`}>
                  <article className="group h-full border-t-2 border-[#0a1628]/10 pt-6
                    hover:border-[#d4a853] cursor-pointer flex flex-col">

                    {/* Category badge */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
                        CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.aktuelles
                      }`}>
                        {CATEGORY_LABELS[article.category] ?? article.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-[#0a1628] text-lg mb-3 line-clamp-2
                      group-hover:text-[#d4a853]">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-[#0a1628]/50 leading-relaxed mb-6 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#0a1628]/5 mt-auto">
                      <div className="flex items-center gap-3 text-xs text-[#0a1628]/40">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {article.author}
                        </span>
                        {article.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(article.publishedAt).toLocaleDateString("de-DE", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#d4a853] opacity-0 group-hover:opacity-100" />
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
