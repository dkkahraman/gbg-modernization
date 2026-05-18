import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin, CheckCircle2, Clock, Star, ArrowRight, User } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// TODO: Echte Kontaktdaten einpflegen
const CONTACT_PERSONS = [
  {
    name: "[Name einpflegen]",
    title: "Versicherungsmathematiker – Hamburg",
    location: "Hamburg",
    phone: "+49 (0) 40 / 325 780-0",
    email: "info@gbg-consulting.de",
    availability: "Mo–Fr, 9–18 Uhr",
    isPlaceholder: true,
  },
  {
    name: "[Name einpflegen]",
    title: "Versicherungsmathematiker – Köln",
    location: "Köln",
    phone: "+49 (0) 221 / 340 915-0",
    email: "info@gbg-consulting.de",
    availability: "Mo–Fr, 9–18 Uhr",
    isPlaceholder: true,
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    type: "quote" as "contact" | "quote",
  });
  const [submitted, setSubmitted] = useState(false);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: personsRef, isVisible: personsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.05 });

  const submitMutation = trpc.inquiry.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Ihre Anfrage wurde erfolgreich gesendet!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        type: "quote",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <section id="kontakt" className="py-24 md:py-32 bg-[#f8f7f4]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#d4a853]/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#d4a853]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0a1628] mb-4">
              Vielen Dank für Ihre Anfrage.
            </h2>
            <p className="text-[#0a1628]/50 text-lg mb-8">
              Wir haben Ihre Nachricht erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="inline-flex items-center gap-2 px-8 py-3 border border-[#0a1628] text-[#0a1628] text-sm font-medium uppercase tracking-wide
                hover:bg-[#0a1628] hover:text-white transition-all duration-300"
            >
              Weitere Anfrage senden
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="bg-[#f8f7f4] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent" />

      {/* ── Ansprechpartner-Block (volle Breite, Navy-Hintergrund) ── */}
      <div className="bg-[#0a1628] py-16 md:py-20">
        <div className="container">
          <div
            ref={headerRef}
            className="mb-12"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#d4a853]" />
              <span className="text-sm font-medium tracking-wide text-white/40 uppercase">
                Direktkontakt
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              Ihre Ansprechpartner.<br />
              <span className="text-[#d4a853]">Persönlich. Direkt.</span>
            </h2>
            <p className="text-white/40 mt-3 max-w-xl">
              Keine Warteschleifen, kein Callcenter. Sie erreichen uns direkt.
            </p>
          </div>

          {/* Ansprechpartner-Karten */}
          <div
            ref={personsRef}
            className="grid md:grid-cols-2 gap-6"
            style={{
              opacity: personsVisible ? 1 : 0,
              transform: personsVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {CONTACT_PERSONS.map((person, index) => (
              <div
                key={index}
                className="flex gap-5 p-6 border border-white/10 hover:border-[#d4a853]/40 transition-colors duration-300"
              >
                {/* Foto-Placeholder */}
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                    <User className="w-7 h-7 text-white/20" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="mb-1">
                    <p className="font-serif font-bold text-white text-base">{person.name}</p>
                    <p className="text-xs text-[#d4a853] uppercase tracking-wide">{person.title}</p>
                  </div>
                  <p className="text-xs text-white/30 mb-4 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {person.location}
                  </p>

                  <div className="space-y-2">
                    <a
                      href={`tel:${person.phone.replace(/[\s\/\(\)]/g, "")}`}
                      className="flex items-center gap-2 text-sm text-white/60 hover:text-[#d4a853] transition-colors group"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0 group-hover:text-[#d4a853]" />
                      <span>{person.phone}</span>
                    </a>
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center gap-2 text-sm text-white/60 hover:text-[#d4a853] transition-colors group"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0 group-hover:text-[#d4a853]" />
                      <span>{person.email}</span>
                    </a>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-white/25 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {person.availability}
                    </span>
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#d4a853] hover:text-white transition-colors"
                    >
                      E-Mail schreiben
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust-Signale */}
          <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Clock, label: "Antwort innerhalb 24h" },
              { icon: Star, label: "Kostenlose Erstberatung" },
              { icon: CheckCircle2, label: "Über 2.000 Mandanten" },
              { icon: MapPin, label: "Hamburg & Köln" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#d4a853] shrink-0" />
                <span className="text-xs text-white/40">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Kontaktformular ── */}
      <div className="py-16 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Adresse + Hinweis */}
            <div className="lg:col-span-4">
              <h3 className="font-serif font-bold text-[#0a1628] text-xl mb-6">
                Oder schreiben Sie uns.
              </h3>
              <p className="text-sm text-[#0a1628]/50 leading-relaxed mb-8">
                Nutzen Sie das Formular für detailliertere Anfragen. Wir melden uns
                innerhalb eines Werktages persönlich bei Ihnen.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d4a853] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0a1628]">Hamburg</p>
                    <p className="text-xs text-[#0a1628]/40">Hauptsitz</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d4a853] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0a1628]">Köln</p>
                    <p className="text-xs text-[#0a1628]/40">Zweigstelle</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: Form */}
            <div
              ref={formRef}
              className="lg:col-span-8"
              style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? "translateX(0)" : "translateX(30px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              }}
            >
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 border border-[#0a1628]/5 hover:border-[#d4a853]/20 transition-colors duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">
                      Vorname *
                    </label>
                    <input
                      id="firstName" name="firstName" type="text" required
                      value={formData.firstName} onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">
                      Nachname *
                    </label>
                    <input
                      id="lastName" name="lastName" type="text" required
                      value={formData.lastName} onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                      placeholder="Mustermann"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">
                      E-Mail *
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                      placeholder="max@beispiel.de"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">
                      Telefon
                    </label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                      placeholder="+49 40 ..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="company" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">
                      Unternehmen
                    </label>
                    <input
                      id="company" name="company" type="text"
                      value={formData.company} onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                      placeholder="Firma GmbH"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">
                      Art der Anfrage
                    </label>
                    <select
                      id="type" name="type"
                      value={formData.type} onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300"
                    >
                      <option value="quote">Angebotsanfrage</option>
                      <option value="contact">Allgemeine Kontaktanfrage</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="subject" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">
                    Betreff *
                  </label>
                  <input
                    id="subject" name="subject" type="text" required
                    value={formData.subject} onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                    placeholder="z.B. Pensionsgutachten für Jahresabschluss"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={formData.message} onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 resize-none placeholder:text-[#0a1628]/25"
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full py-4 bg-[#0a1628] text-white text-sm font-medium uppercase tracking-wide
                    hover:bg-[#d4a853] hover:text-[#0a1628] transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2"
                >
                  {submitMutation.isPending ? (
                    "Wird gesendet..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Anfrage absenden
                    </>
                  )}
                </button>

                <p className="text-xs text-[#0a1628]/40 mt-4 text-center">
                  Mit dem Absenden stimmen Sie unserer{" "}
                  <a href="/datenschutz" className="underline hover:text-[#d4a853] transition-colors duration-200">Datenschutzerklärung</a> zu.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
