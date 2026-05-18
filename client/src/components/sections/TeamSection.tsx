import { Mail, Phone } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const team = [
  {
    name: "Dr. Max Mustermann",
    title: "Geschäftsführer & Chefaktuar",
    qualifications: "Aktuar (DAV), Sachverständiger für bAV",
    focus: "Versicherungsmathematische Gutachten, Unternehmensberatung",
    email: "m.mustermann@gbg-consulting.de",
    phone: "+49 69 123456-10",
    initials: "MM",
  },
  {
    name: "Anna Beispiel",
    title: "Leitende Aktuarin",
    qualifications: "Aktuarin (DAV/IVS), Rentenberaterin",
    focus: "Pensionszusagen, Versorgungsausgleich, U-Kassen",
    email: "a.beispiel@gbg-consulting.de",
    phone: "+49 69 123456-20",
    initials: "AB",
  },
  {
    name: "Thomas Muster",
    title: "Senior Consultant",
    qualifications: "Diplom-Mathematiker, Aktuar (DAV)",
    focus: "BilMoG-Bewertungen, Planungsrechnungen, GGF-Versorgung",
    email: "t.muster@gbg-consulting.de",
    phone: "+49 69 123456-30",
    initials: "TM",
  },
];

export default function TeamSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { containerRef, getItemStyle } = useStaggeredAnimation(team.length);

  return (
    <section id="team" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent" />

      <div className="container">
        {/* Header — left-aligned */}
        <div
          ref={headerRef}
          className="max-w-2xl mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[#d4a853]" />
            <span className="text-sm font-medium tracking-wide text-[#0a1628]/50 uppercase">
              Unser Team
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1628] leading-tight">
            Persönliche<br />
            <span className="text-[#d4a853]">Ansprechpartner.</span>
          </h2>
          <p className="text-lg text-[#0a1628]/50 mt-4 max-w-xl">
            Feste Ansprechpartner, die Ihre Situation kennen und Sie langfristig begleiten.
          </p>
        </div>

        {/* Team Grid */}
        <div ref={containerRef} className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              style={getItemStyle(index)}
              className="group relative"
            >
              {/* Avatar area */}
              <div className="aspect-[4/3] bg-[#0a1628]/[0.03] mb-6 flex items-center justify-center
                group-hover:bg-[#0a1628]/[0.06] transition-all duration-500 overflow-hidden">
                <span className="text-5xl font-serif font-bold text-[#0a1628]/10 group-hover:text-[#d4a853]/20 transition-colors duration-500">
                  {member.initials}
                </span>
              </div>

              {/* Info */}
              <h3 className="font-bold text-[#0a1628] text-lg">
                {member.name}
              </h3>
              <p className="text-[#d4a853] font-medium text-sm mt-1">
                {member.title}
              </p>
              <p className="text-xs text-[#0a1628]/40 mt-2">
                {member.qualifications}
              </p>
              <p className="text-xs text-[#0a1628]/40 mt-1">
                {member.focus}
              </p>

              {/* Contact */}
              <div className="flex items-center gap-4 mt-5 pt-5 border-t border-[#0a1628]/5">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 text-xs text-[#0a1628]/40 hover:text-[#d4a853] transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                  E-Mail
                </a>
                <a
                  href={`tel:${member.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-xs text-[#0a1628]/40 hover:text-[#d4a853] transition-colors duration-200"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Anrufen
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Hinweis */}
        <div className="mt-12 py-4 px-6 border-l-2 border-[#d4a853] bg-[#d4a853]/5 max-w-xl">
          <p className="text-xs text-[#0a1628]/50">
            <span className="font-semibold">Hinweis:</span> Platzhalter-Daten. Bitte durch echte Teammitglieder ersetzen.
          </p>
        </div>
      </div>
    </section>
  );
}
