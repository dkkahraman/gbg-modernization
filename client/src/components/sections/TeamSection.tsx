import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

// TODO: Echte Teammitglieder einpflegen
const team = [
  {
    name: "[Name einpflegen]",
    title: "Geschäftsführer & Chefaktuar",
    qualifications: "Aktuar (DAV), Sachverständiger für bAV",
    focus: "Versicherungsmathematische Gutachten, Unternehmensberatung",
    location: "Hamburg",
    email: "info@gbg-consulting.de",
    phone: "+49 (0) 40 / 325 780-0",
    initials: "GF",
    isPlaceholder: true,
  },
  {
    name: "[Name einpflegen]",
    title: "Leitende Aktuarin",
    qualifications: "Aktuarin (DAV/IVS), Rentenberaterin",
    focus: "Pensionszusagen, Versorgungsausgleich, U-Kassen",
    location: "Hamburg",
    email: "info@gbg-consulting.de",
    phone: "+49 (0) 40 / 325 780-0",
    initials: "LA",
    isPlaceholder: true,
  },
  {
    name: "[Name einpflegen]",
    title: "Senior Consultant",
    qualifications: "Diplom-Mathematiker, Aktuar (DAV)",
    focus: "BilMoG-Bewertungen, Planungsrechnungen, GGF-Versorgung",
    location: "Köln",
    email: "info@gbg-consulting.de",
    phone: "+49 (0) 221 / 340 915-0",
    initials: "SC",
    isPlaceholder: true,
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
              className="group relative flex flex-col"
            >
              {/* Avatar area */}
              <div className="aspect-[4/3] bg-[#0a1628]/[0.03] mb-6 flex items-center justify-center
                group-hover:bg-[#0a1628]/[0.06] transition-all duration-500 overflow-hidden">
                <span className="text-5xl font-serif font-bold text-[#0a1628]/10 group-hover:text-[#d4a853]/20 transition-colors duration-500">
                  {member.initials}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-[#0a1628] text-lg leading-tight">
                    {member.name}
                  </h3>
                  <span className="shrink-0 flex items-center gap-1 text-xs text-[#0a1628]/30 mt-1">
                    <MapPin className="w-3 h-3" />
                    {member.location}
                  </span>
                </div>
                <p className="text-[#d4a853] font-medium text-sm mt-0.5">
                  {member.title}
                </p>
                <p className="text-xs text-[#0a1628]/40 mt-2">
                  {member.qualifications}
                </p>
                <p className="text-xs text-[#0a1628]/40 mt-1">
                  {member.focus}
                </p>
              </div>

              {/* Direct contact — prominent */}
              <div className="mt-6 pt-5 border-t-2 border-[#0a1628]/5 space-y-2">
                <a
                  href={`tel:${member.phone.replace(/[\s\/\(\)]/g, "")}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0a1628] text-white text-xs font-medium
                    hover:bg-[#d4a853] hover:text-[#0a1628] transition-all duration-300 group/btn"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{member.phone}</span>
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 border border-[#0a1628]/10 text-[#0a1628]/60 text-xs font-medium
                    hover:border-[#d4a853] hover:text-[#d4a853] transition-all duration-300"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>{member.email}</span>
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
