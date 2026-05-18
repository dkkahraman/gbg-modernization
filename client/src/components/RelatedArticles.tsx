import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowRight, Tag, Calendar } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  bilmog: "BilMoG",
  pensionsgutachten: "Pensionsgutachten",
  bav: "Betriebliche AV",
  recht: "Recht & Regulierung",
  aktuelles: "Aktuelles",
};

const CATEGORY_COLORS: Record<string, string> = {
  bilmog: "bg-blue-50 text-blue-700 border-blue-200",
  pensionsgutachten: "bg-amber-50 text-amber-700 border-amber-200",
  bav: "bg-emerald-50 text-emerald-700 border-emerald-200",
  recht: "bg-purple-50 text-purple-700 border-purple-200",
  aktuelles: "bg-slate-50 text-slate-700 border-slate-200",
};

interface RelatedArticlesProps {
  currentSlug: string;
  category: string;
}

export default function RelatedArticles({ currentSlug, category }: RelatedArticlesProps) {
  const { data: articles, isLoading, isError, refetch } = trpc.articles.getRelated.useQuery(
    { slug: currentSlug, category, limit: 3 },
    { enabled: !!currentSlug && !!category }
  );

  // Error state - silently hide, don't break the page
  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mt-12 pt-8 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-6">Weitere Fachartikel</h3>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-lg border border-border animate-pulse">
              <div className="h-3 w-16 bg-muted rounded mb-3" />
              <div className="h-5 w-3/4 bg-muted rounded mb-2" />
              <div className="h-3 w-full bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Weitere Fachartikel
      </h3>
      <div className="grid gap-4">
        {articles.map((article) => (
          <Link key={article.id} href={`/blog/${article.slug}`}>
            <div className="group p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${CATEGORY_COLORS[article.category] || CATEGORY_COLORS.aktuelles}`}
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {CATEGORY_LABELS[article.category] || article.category}
                    </span>
                    {article.publishedAt && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.publishedAt).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {article.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {article.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 mt-3">
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
