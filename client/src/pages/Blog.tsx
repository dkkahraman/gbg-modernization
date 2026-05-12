import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Calendar, User, Search, Tag, ArrowRight, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  { value: "alle", label: "Alle Beiträge" },
  { value: "bilmog", label: "BilMoG" },
  { value: "pensionsgutachten", label: "Pensionsgutachten" },
  { value: "bav", label: "Betriebliche AV" },
  { value: "recht", label: "Recht & Urteile" },
  { value: "aktuelles", label: "Aktuelles" },
];

function getCategoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label || value;
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    bilmog: "bg-blue-50 text-blue-700 border-blue-200",
    pensionsgutachten: "bg-amber-50 text-amber-700 border-amber-200",
    bav: "bg-emerald-50 text-emerald-700 border-emerald-200",
    recht: "bg-purple-50 text-purple-700 border-purple-200",
    aktuelles: "bg-slate-50 text-slate-700 border-slate-200",
  };
  return colors[category] || colors.aktuelles;
}

export default function Blog() {
  useSEO({
    title: "Fachartikel & Blog",
    description:
      "Aktuelle Fachartikel zu BilMoG, Pensionsgutachten, betrieblicher Altersversorgung und relevanter Rechtsprechung von GBG Consulting.",
    path: "/blog",
  });

  const [activeCategory, setActiveCategory] = useState("alle");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: articles, isLoading, error, refetch } = trpc.articles.listPublished.useQuery({
    category: activeCategory !== "alle" ? activeCategory : undefined,
    search: debouncedSearch || undefined,
  });

  // Debounce search input
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    clearTimeout((window as any).__searchTimeout);
    (window as any).__searchTimeout = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);
  };

  const headerAnim = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div
          ref={headerAnim.ref}
          className={`container max-w-5xl transition-all duration-700 ${headerAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Fachwissen & Aktuelles
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Fachartikel & Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Aktuelle Beiträge zu BilMoG-Zinsentwicklung, Pensionsgutachten,
            betrieblicher Altersversorgung und relevanter Rechtsprechung.
          </p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="pb-8">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Artikel suchen..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 flex-1">
        <div className="container max-w-5xl">
          {error ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Fehler beim Laden
              </h3>
              <p className="text-muted-foreground mb-4">
                Die Artikel konnten nicht geladen werden. Bitte versuchen Sie es erneut.
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Erneut versuchen
              </button>
            </div>
          ) : isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 animate-pulse"
                >
                  <div className="h-4 w-20 bg-muted rounded mb-4" />
                  <div className="h-6 w-3/4 bg-muted rounded mb-3" />
                  <div className="h-4 w-full bg-muted rounded mb-2" />
                  <div className="h-4 w-2/3 bg-muted rounded mb-6" />
                  <div className="h-4 w-1/3 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Keine Artikel gefunden
              </h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Versuchen Sie einen anderen Suchbegriff."
                  : "In dieser Kategorie sind noch keine Artikel vorhanden."}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ArticleCard({ article, index }: { article: any; index: number }) {
  const anim = useScrollAnimation();

  return (
    <article
      ref={anim.ref}
      className={`transition-all duration-700 group ${anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/blog/${article.slug}`}>
        <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 cursor-pointer">
          {/* Category Badge */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getCategoryColor(
                article.category
              )}`}
            >
              <Tag className="w-3 h-3" />
              {getCategoryLabel(article.category)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}
