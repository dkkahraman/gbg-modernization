import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const typeLabels: Record<string, string> = {
  full_time: "Vollzeit",
  part_time: "Teilzeit",
  internship: "Praktikum",
};

export default function Stellenangebote() {
  useSEO({
    title: "Stellenangebote & Karriere",
    description: "Aktuelle Stellenangebote bei GBG Consulting. Werden Sie Teil unseres Teams im Bereich versicherungsmathematische Beratung und betriebliche Altersversorgung.",
    path: "/stellenangebote",
  });
  const { data: jobs, isLoading, error, refetch } = trpc.jobs.listActive.useQuery();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef, getItemStyle } = useStaggeredAnimation(jobs?.length ?? 3, { threshold: 0.05 });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-28 pb-16 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-white/20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-white/10" />
        </div>
        <div
          ref={headerRef}
          className="container relative"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#d4a853]" />
              <span className="text-sm font-medium tracking-wide text-white/40 uppercase">
                Karriere
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
              Aktuelle<br />
              <span className="text-[#d4a853]">Stellenangebote.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Werden Sie Teil unseres Teams und gestalten Sie die Zukunft der betrieblichen
              Altersversorgung mit.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 py-16">
        <div className="container">
          {/* Job Listings */}
          {error ? (
            <div className="max-w-2xl py-16">
              <h2 className="text-2xl font-serif font-bold text-[#0a1628] mb-4">
                Fehler beim Laden
              </h2>
              <p className="text-[#0a1628]/50 mb-8 leading-relaxed">
                Die Stellenangebote konnten nicht geladen werden. Bitte versuchen Sie es erneut.
              </p>
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a1628] text-white text-sm font-medium hover:bg-[#d4a853]"
              >
                Erneut versuchen
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : isLoading ? (
            <div className="max-w-3xl space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-t-2 border-[#0a1628]/10 pt-6">
                  <div className="h-6 bg-[#0a1628]/5 w-2/3 mb-3" />
                  <div className="h-4 bg-[#0a1628]/5 w-1/3 mb-4" />
                  <div className="h-4 bg-[#0a1628]/5 w-full" />
                </div>
              ))}
            </div>
          ) : jobs && jobs.length > 0 ? (
            <div ref={containerRef} className="max-w-3xl space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  style={getItemStyle(index)}
                  className="group border-t-2 border-[#0a1628]/10 pt-6 hover:border-[#d4a853]"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-[#0a1628] mb-2 group-hover:text-[#d4a853]">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-[#0a1628]/40 mb-3">
                        {job.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {typeLabels[job.type] || job.type}
                        </span>
                      </div>
                      <p className="text-sm text-[#0a1628]/50 leading-relaxed line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <a
                        href="/#kontakt"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a1628] text-white text-sm font-medium hover:bg-[#d4a853]"
                      >
                        Bewerben
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl py-16">
              <div className="w-16 h-16 bg-[#0a1628]/5 flex items-center justify-center mb-8">
                <Briefcase className="w-8 h-8 text-[#0a1628]/30" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#0a1628] mb-4">
                Derzeit keine offenen Stellen
              </h2>
              <p className="text-[#0a1628]/50 mb-8 leading-relaxed">
                Aktuell haben wir keine offenen Positionen. Schauen Sie gerne regelmäßig vorbei
                oder senden Sie uns eine Initiativbewerbung.
              </p>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a1628] text-white text-sm font-medium hover:bg-[#d4a853]"
              >
                Initiativbewerbung senden
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
