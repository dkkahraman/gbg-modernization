import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Link, useParams } from "wouter";
import { Calendar, User, Tag, ArrowLeft, Clock } from "lucide-react";
import { Streamdown } from "streamdown";
import { Button } from "@/components/ui/button";

const CATEGORY_LABELS: Record<string, string> = {
  bilmog: "BilMoG",
  pensionsgutachten: "Pensionsgutachten",
  bav: "Betriebliche AV",
  recht: "Recht & Urteile",
  aktuelles: "Aktuelles",
};

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

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogArticle() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";

  const { data: article, isLoading, error } = trpc.articles.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  useSEO({
    title: article?.title || "Artikel laden...",
    description: article?.excerpt || "",
    path: `/blog/${slug}`,
    type: "article",
  });

  const headerAnim = useScrollAnimation();
  const contentAnim = useScrollAnimation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <div className="flex-1 pt-28 pb-20">
          <div className="container max-w-3xl">
            <div className="animate-pulse">
              <div className="h-4 w-24 bg-muted rounded mb-6" />
              <div className="h-8 w-3/4 bg-muted rounded mb-4" />
              <div className="h-4 w-1/2 bg-muted rounded mb-8" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-2/3 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <div className="flex-1 pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Fehler beim Laden
            </h1>
            <p className="text-muted-foreground mb-6">
              Der Artikel konnte nicht geladen werden. Bitte versuchen Sie es später erneut.
            </p>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Übersicht
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <div className="flex-1 pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Artikel nicht gefunden
            </h1>
            <p className="text-muted-foreground mb-6">
              Der angeforderte Artikel existiert nicht oder wurde entfernt.
            </p>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück zur Übersicht
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const readTime = estimateReadTime(article.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "GBG Consulting",
    },
    datePublished: article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gbg-consulting.de/blog/${article.slug}`,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={articleJsonLd} />
      <Navigation />

      {/* Article Header */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
        <div
          ref={headerAnim.ref}
          className={`container max-w-3xl transition-all duration-700 ${headerAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Back Link */}
          <Link href="/blog">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Alle Fachartikel
            </span>
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getCategoryColor(article.category)}`}
            >
              <Tag className="w-3 h-3" />
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            {article.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(article.publishedAt).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime} Min. Lesezeit
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20 flex-1">
        <div
          ref={contentAnim.ref}
          className={`container max-w-3xl transition-all duration-700 delay-200 ${contentAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-li:text-muted-foreground">
            <Streamdown>{article.content}</Streamdown>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Individuelle Beratung gewünscht?
            </h3>
            <p className="text-muted-foreground mb-4">
              Unsere Experten stehen Ihnen für eine persönliche Beratung zur
              Verfügung. Kontaktieren Sie uns für ein unverbindliches Erstgespräch.
            </p>
            <Link href="/#kontakt">
              <Button>Kontakt aufnehmen</Button>
            </Link>
          </div>

          {/* Back to blog */}
          <div className="mt-8 pt-6 border-t border-border">
            <Link href="/blog">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Artikelübersicht
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
