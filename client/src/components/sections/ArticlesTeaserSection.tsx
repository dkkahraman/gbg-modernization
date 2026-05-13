import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Calendar, User, ArrowRight, BookOpen, Tag } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const CATEGORY_COLORS: Record<string, string> = {
  bilmog: "bg-blue-50 text-blue-700 border-blue-200",
  pensionsgutachten: "bg-amber-50 text-amber-700 border-amber-200",
  bav: "bg-emerald-50 text-emerald-700 border-emerald-200",
  recht: "bg-purple-50 text-purple-700 border-purple-200",
  aktuelles: "bg-slate-50 text-slate-700 border-slate-200",
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
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div
          ref={headerRef}
          className="max-w-2xl mx-auto text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Fachwissen &amp; Aktuelles
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
            Aktuelle Fachartikel
          </h2>
          <p className="text-muted-foreground text-lg">
            Unsere Experten berichten über aktuelle Entwicklungen in der betrieblichen Altersversorgung,
            BilMoG-Zinssätze und relevante Rechtsprechung.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 animate-pulse">
                <div className="h-4 w-20 bg-muted rounded mb-4" />
                <div className="h-6 w-3/4 bg-muted rounded mb-3" />
                <div className="h-4 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-2/3 bg-muted rounded mb-6" />
                <div className="h-4 w-1/3 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((article, index) => (
              <div key={article.id} style={getItemStyle(index)}>
                <Link href={`/blog/${article.slug}`}>
                  <article className="group h-full bg-card rounded-xl border border-border/50 p-6
                    hover:shadow-xl hover:-translate-y-2 hover:border-primary/20
                    transition-all duration-500 ease-out cursor-pointer flex flex-col">

                    <div className="mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${
                        CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.aktuelles
                      }`}>
                        <Tag className="w-3 h-3" />
                        {CATEGORY_LABELS[article.category] ?? article.category}
                      </span>
                    </div>

                    <h3 className="font-semibold text-foreground text-lg mb-3 line-clamp-2
                      group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100
                        group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
              border border-primary/20 text-primary font-medium text-sm
              hover:bg-primary/5 hover:border-primary/40
              transition-all duration-300 cursor-pointer">
              <BookOpen className="w-4 h-4" />
              Alle Fachartikel ansehen
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
