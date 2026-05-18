import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, TrendingUp, Phone } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

export default function HeroSection() {
  const { getParallaxStyle, getFadeStyle } = useParallax();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 md:pt-32 overflow-hidden bg-primary">
      {/* Decorative circles — top right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-accent/15 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-accent/10 pointer-events-none" />
      {/* Subtle gold glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      {/* Grid pattern */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04] pointer-events-none"
        style={getParallaxStyle(-0.05, 30)}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      {/* Gold bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div
            className="max-w-xl"
            style={{
              ...getParallaxStyle(-0.03, 20),
              ...getFadeStyle(200, 600),
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-white/90">
                Seit über 30 Jahren Ihr Partner
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Gute Beratung{" "}
              <span className="text-accent">Gewinnt!</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8">
              Alles rund um die betriebliche Altersversorgung – kompetent, zuverlässig und maßgeschneidert für Ihr Unternehmen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="#kontakt">
                <Button size="lg" className="bg-accent text-foreground hover:bg-accent/90 gap-2 text-base px-8 font-semibold shadow-lg shadow-accent/20">
                  Angebotsanfrage
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#kontakt">
                <Button size="lg" variant="outline" className="gap-2 text-base border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent">
                  <Phone className="w-4 h-4" />
                  Kostenlose Erstberatung
                </Button>
              </a>
            </div>

            {/* Stats Strip */}
            <div className="flex items-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2.000+</div>
                <div className="text-xs text-white/50 mt-0.5">Mandanten</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">30+</div>
                <div className="text-xs text-white/50 mt-0.5">Jahre Erfahrung</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-white/50 mt-0.5">Unabhängig</div>
              </div>
            </div>

            {/* Zertifizierungs-Badges */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/10">
              <span className="text-xs text-white/40 uppercase tracking-wider shrink-0">Mitglied in:</span>
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { label: "DAV", Icon: Shield },
                  { label: "IVS", Icon: Award },
                ].map(({ label, Icon }) => (
                  <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 border border-white/15 hover:bg-white/15 transition-colors duration-300">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-semibold text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Trust Indicators */}
          <div className="hidden lg:grid grid-cols-1 gap-4">
            <div
              className="grid grid-cols-2 gap-4"
              style={getParallaxStyle(-0.08, 50)}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/15 hover:bg-white/15 hover:-translate-y-1 transition-all duration-500">
                <Shield className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-semibold text-white mb-1">Expertise</h3>
                <p className="text-sm text-white/60">Versicherungsmathematische Gutachten auf höchstem Niveau</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/15 hover:bg-white/15 hover:-translate-y-1 transition-all duration-500">
                <Award className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-semibold text-white mb-1">Erfahrung</h3>
                <p className="text-sm text-white/60">Über 30 Jahre Kompetenz in der bAV-Beratung</p>
              </div>
            </div>
            <div style={getParallaxStyle(-0.12, 60)}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/15 hover:bg-white/15 hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-accent" />
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Live
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-1">Aktuelle BilMoG-Prognose</h3>
                <div className="flex items-baseline gap-6 mt-3">
                  <div>
                    <span className="text-2xl font-bold text-white">2,64%</span>
                    <span className="text-xs text-white/50 ml-1">7-jährig</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-accent">2,30%</span>
                    <span className="text-xs text-white/50 ml-1">10-jährig</span>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-2">GBG-Prognose 12.2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
