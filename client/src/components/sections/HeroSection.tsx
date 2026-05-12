import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, TrendingUp, Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 md:pt-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50" />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-accent-foreground">
                Seit über 25 Jahren Ihr Partner
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Gute Beratung{" "}
              <span className="text-primary">Gewinnt!</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Alles rund um die betriebliche Altersversorgung – kompetent, zuverlässig und maßgeschneidert für Ihr Unternehmen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="#kontakt">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8">
                  Angebotsanfrage
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#kontakt">
                <Button size="lg" variant="outline" className="gap-2 text-base border-primary/20 hover:bg-primary/5">
                  <Phone className="w-4 h-4" />
                  Kostenlose Erstberatung
                </Button>
              </a>
            </div>

            {/* Zertifizierungs-Logos */}
            <div className="flex items-center gap-6 pt-6 border-t border-border/50">
              <span className="text-xs text-muted-foreground uppercase tracking-wider shrink-0">Mitglied in:</span>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border/50">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">DAV</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border/50">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">IVS</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border/50">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">aba</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Trust Indicators */}
          <div className="hidden lg:grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Expertise</h3>
                <p className="text-sm text-muted-foreground">Versicherungsmathematische Gutachten auf höchstem Niveau</p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <Award className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Erfahrung</h3>
                <p className="text-sm text-muted-foreground">Über 25 Jahre Kompetenz in der bAV-Beratung</p>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <TrendingUp className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Aktuelle BilMoG-Prognose</h3>
              <div className="flex items-baseline gap-4 mt-2">
                <div>
                  <span className="text-2xl font-bold text-primary">2,64%</span>
                  <span className="text-xs text-muted-foreground ml-1">7-jährig</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-accent-foreground">2,30%</span>
                  <span className="text-xs text-muted-foreground ml-1">10-jährig</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">GBG-Prognose 12.2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
