import { Mail, Phone, Linkedin } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const team = [
  {
    name: "Dr. Max Mustermann",
    title: "Geschäftsführer & Chefaktuar",
    qualifications: "Aktuar (DAV), Sachverständiger für bAV",
    focus: "Versicherungsmathematische Gutachten, Unternehmensberatung",
    email: "m.mustermann@gbg-consulting.de",
    phone: "+49 69 123456-10",
  },
  {
    name: "Anna Beispiel",
    title: "Leitende Aktuarin",
    qualifications: "Aktuarin (DAV/IVS), Rentenberaterin",
    focus: "Pensionszusagen, Versorgungsausgleich, U-Kassen",
    email: "a.beispiel@gbg-consulting.de",
    phone: "+49 69 123456-20",
  },
  {
    name: "Thomas Muster",
    title: "Senior Consultant",
    qualifications: "Diplom-Mathematiker, Aktuar (DAV)",
    focus: "BilMoG-Bewertungen, Planungsrechnungen, GGF-Versorgung",
    email: "t.muster@gbg-consulting.de",
    phone: "+49 69 123456-30",
  },
];

export default function TeamSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef, getItemStyle } = useStaggeredAnimation(team.length);

  return (
    <section id="team" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Unser Team
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3">
            Ihre persönlichen Ansprechpartner
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Bei uns haben Sie feste Ansprechpartner, die Ihre Situation kennen und Sie langfristig begleiten.
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              style={getItemStyle(index)}
              className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden
                hover:shadow-xl hover:-translate-y-3 hover:border-primary/20
                transition-all duration-500 ease-out group"
            >
              {/* Avatar placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/10 via-secondary to-accent/10 flex items-center justify-center
                group-hover:from-primary/15 group-hover:to-accent/15 transition-all duration-500">
                <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-card flex items-center justify-center
                  group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-500">
                  <span className="text-2xl font-serif font-bold text-primary">
                    {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-accent font-medium text-sm mt-1">
                  {member.title}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {member.qualifications}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Schwerpunkte:</span> {member.focus}
                </p>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                  <a
                    href={`mailto:${member.email}`}
                    className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center 
                      hover:bg-primary hover:text-primary-foreground hover:scale-110
                      transition-all duration-300"
                    title="E-Mail senden"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${member.phone.replace(/\s/g, "")}`}
                    className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center 
                      hover:bg-primary hover:text-primary-foreground hover:scale-110
                      transition-all duration-300"
                    title="Anrufen"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center 
                      hover:bg-primary hover:text-primary-foreground hover:scale-110
                      transition-all duration-300"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hinweis für den Kunden */}
        <div className="mt-8 p-4 rounded-lg bg-accent/5 border border-accent/20 max-w-2xl mx-auto">
          <p className="text-xs text-muted-foreground text-center">
            <span className="font-medium text-accent">Hinweis:</span> Die dargestellten Teammitglieder sind Platzhalter. 
            Bitte ersetzen Sie die Namen, Titel und Kontaktdaten durch die tatsächlichen Ansprechpartner Ihres Unternehmens.
          </p>
        </div>
      </div>
    </section>
  );
}
