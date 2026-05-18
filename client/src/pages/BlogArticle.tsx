import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ShareButtons from "@/components/ShareButtons";
import RelatedArticles from "@/components/RelatedArticles";
import { Link, useParams } from "wouter";
import { Calendar, User, Tag, ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { Streamdown } from "streamdown";

const CATEGORY_LABELS: Record<string, string> = {
  bilmog: "BilMoG",
  pensionsgutachten: "Pensionsgutachten",
  bav: "Betriebliche AV",
  recht: "Recht & Urteile",
  aktuelles: "Aktuelles",
};

const CATEGORY_COLORS: Record<string, string> = {
  bilmog: "bg-[#0a1628] text-white",
  pensionsgutachten: "bg-[#d4a853] text-white",
  bav: "bg-[#0a1628]/70 text-white",
  recht: "bg-[#0a1628]/50 text-white",
  aktuelles: "bg-[#0a1628]/30 text-white",
};

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
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <div className="flex-1 pt-28 pb-20">
          <div className="container max-w-3xl">
            <div className="space-y-4">
              <div className="h-3 w-24 bg-[#0a1628]/5" />
              <div className="h-8 w-3/4 bg-[#0a1628]/5" />
              <div className="h-4 w-1/2 bg-[#0a1628]/5" />
              <div className="h-px w-full bg-[#0a1628]/5 my-8" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-[#0a1628]/5" />
                <div className="h-4 w-full bg-[#0a1628]/5" />
                <div className="h-4 w-2/3 bg-[#0a1628]/5" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <div className="flex-1 pt-28 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold text-[#0a1628] mb-4">
              {error ? "Fehler beim Laden" : "Artikel nicht gefunden"}
            </h1>
            <p className="text-[#0a1628]/50 mb-8">
              {error
                ? "Der Artikel konnte nicht geladen werden. Bitte versuchen Sie es später erneut."
                : "Der angeforderte Artikel existiert nicht oder wurde entfernt."}
            </p>
            <Link href="/blog">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a1628] text-white text-sm font-medium hover:bg-[#d4a853] cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Übersicht
              </span>
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
    <div className="min-h-screen flex flex-col bg-white">
      <JsonLd data={articleJsonLd} />
      <Navigation />

      {/* Article Header */}
      <section className="pt-28 pb-16 bg-[#f8f7f4] relative">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent" />
        <div
          ref={headerAnim.ref}
          className="container max-w-4xl"
          style={{
            opacity: headerAnim.isVisible ? 1 : 0,
            transform: headerAnim.isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Back Link */}
          <Link href="/blog">
            <span className="inline-flex items-center gap-1.5 text-sm text-[#0a1628]/40 hover:text-[#d4a853] mb-8 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Alle Fachartikel
            </span>
          </Link>

          {/* Category */}
          <div className="mb-5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
              CATEGORY_COLORS[article.category] || CATEGORY_COLORS.aktuelles
            }`}>
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#0a1628] mb-8 leading-tight max-w-3xl">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#0a1628]/40">
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
      <section className="py-16 flex-1">
        <div
          ref={contentAnim.ref}
          className="container max-w-3xl"
          style={{
            opacity: contentAnim.isVisible ? 1 : 0,
            transform: contentAnim.isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          <div className="prose prose-slate max-w-none
            prose-headings:font-serif prose-headings:text-[#0a1628]
            prose-p:text-[#0a1628]/70 prose-p:leading-relaxed
            prose-strong:text-[#0a1628]
            prose-a:text-[#d4a853] prose-a:no-underline hover:prose-a:underline
            prose-li:text-[#0a1628]/70
            prose-blockquote:border-l-[#d4a853] prose-blockquote:text-[#0a1628]/60">
            <Streamdown>{article.content}</Streamdown>
          </div>

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t border-[#0a1628]/5">
            <ShareButtons
              title={article.title}
              description={article.excerpt}
            />
          </div>

          {/* Related Articles */}
          <RelatedArticles currentSlug={article.slug} category={article.category} />

          {/* CTA */}
          <div className="mt-12 p-8 bg-[#0a1628] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4a853]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Individuelle Beratung gewünscht?
              </h3>
              <p className="text-white/60 text-sm mb-6 max-w-lg">
                Unsere Experten stehen Ihnen für eine persönliche Beratung zur
                Verfügung. Kontaktieren Sie uns für ein unverbindliches Erstgespräch.
              </p>
              <Link href="/#kontakt">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d4a853] text-white text-sm font-medium hover:bg-[#d4a853]/90 cursor-pointer">
                  Kontakt aufnehmen
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-8 pt-6 border-t border-[#0a1628]/5">
            <Link href="/blog">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#0a1628]/40 hover:text-[#d4a853] cursor-pointer">
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
