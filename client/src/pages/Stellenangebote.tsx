import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const typeLabels: Record<string, string> = {
  full_time: "Vollzeit",
  part_time: "Teilzeit",
  internship: "Praktikum",
};

export default function Stellenangebote() {
  const { data: jobs, isLoading } = trpc.jobs.listActive.useQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-20">
        <div className="container">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Karriere
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
              Aktuelle Stellenangebote
            </h1>
            <p className="text-muted-foreground text-lg">
              Werden Sie Teil unseres Teams und gestalten Sie die Zukunft der betrieblichen 
              Altersversorgung mit.
            </p>
          </div>

          {/* Job Listings */}
          {isLoading ? (
            <div className="max-w-3xl mx-auto space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border/50 animate-pulse">
                  <div className="h-6 bg-muted rounded w-2/3 mb-3" />
                  <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              ))}
            </div>
          ) : jobs && jobs.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-2">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {typeLabels[job.type] || job.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <a href="/#kontakt">
                        <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                          Bewerben
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Derzeit keine offenen Stellen
              </h2>
              <p className="text-muted-foreground mb-6">
                Aktuell haben wir keine offenen Positionen. Schauen Sie gerne regelmäßig vorbei 
                oder senden Sie uns eine Initiativbewerbung.
              </p>
              <a href="/#kontakt">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Initiativbewerbung senden
                </Button>
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
