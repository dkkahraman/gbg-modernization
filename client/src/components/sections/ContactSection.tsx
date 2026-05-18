import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin, CheckCircle2, Clock, Star, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
    <section id="kontakt" className="py-24 md:py-32 bg-[#f8f7f4] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0a1628]/10 to-transparent" />

      <div className="container">
        {/* Header */}
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
              Kontakt
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1628] leading-tight">
            Sprechen Sie<br />
            <span className="text-[#d4a853]">mit uns.</span>
          </h2>
          <p className="text-lg text-[#0a1628]/50 mt-4 max-w-xl">
            Senden Sie uns Ihre Anfrage – wir erstellen Ihnen gerne ein individuelles Angebot.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Kontaktdaten & Trust */}
          <div className="lg:col-span-4 space-y-8">
            {/* Kontaktdaten */}
            <div>
              <h3 className="font-bold text-[#0a1628] text-sm uppercase tracking-wide mb-6">Kontaktdaten</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d4a853] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0a1628]">Standorte</p>
                    <p className="text-sm text-[#0a1628]/50">Hamburg &middot; Köln</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#d4a853] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0a1628]">Telefon</p>
                    <a href="tel:+49403257800" className="text-sm text-[#0a1628]/50 hover:text-[#d4a853] transition-colors block">
                      +49 (0) 40 / 325 780-0
                    </a>
                    <a href="tel:+492213409150" className="text-sm text-[#0a1628]/50 hover:text-[#d4a853] transition-colors block">
                      +49 (0) 221 / 340 915-0
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#d4a853] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#0a1628]">E-Mail</p>
                    <a href="mailto:info@gbg-consulting.de" className="text-sm text-[#0a1628]/50 hover:text-[#d4a853] transition-colors">
                      info@gbg-consulting.de
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* CTA zur Team-Sektion */}
            <div className="border-l-2 border-[#d4a853] pl-5 py-2">
              <p className="text-xs text-[#0a1628]/50 mb-3">
                Möchten Sie direkt mit einem bestimmten Ansprechpartner sprechen?
              </p>
              <a
                href="#team"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0a1628] hover:text-[#d4a853] transition-colors"
              >
                Zum Team
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Trust-Signale */}
            <div className="border-l-2 border-[#d4a853] pl-5 py-2">
              <h3 className="font-bold text-[#0a1628] text-xs uppercase tracking-wide mb-4">Warum GBG?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#d4a853] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0a1628]/50">Antwort innerhalb von <strong className="text-[#0a1628]">24 Stunden</strong></p>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-3.5 h-3.5 text-[#d4a853] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0a1628]/50"><strong className="text-[#0a1628]">Kostenlose Erstberatung</strong></p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a853] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0a1628]/50">Über <strong className="text-[#0a1628]">2.000 Mandanten</strong></p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <div
            ref={formRef}
            className="lg:col-span-8"
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 border border-[#0a1628]/5 hover:border-[#d4a853]/20 transition-colors duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">Vorname *</label>
                  <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                    placeholder="Max" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">Nachname *</label>
                  <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                    placeholder="Mustermann" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">E-Mail *</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                    placeholder="max@beispiel.de" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">Telefon</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                    placeholder="+49 40 ..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="company" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">Unternehmen</label>
                  <input id="company" name="company" type="text" value={formData.company} onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                    placeholder="Firma GmbH" />
                </div>
                <div>
                  <label htmlFor="type" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">Art der Anfrage</label>
                  <select id="type" name="type" value={formData.type} onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300">
                    <option value="quote">Angebotsanfrage</option>
                    <option value="contact">Allgemeine Kontaktanfrage</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="subject" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">Betreff *</label>
                <input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 placeholder:text-[#0a1628]/25"
                  placeholder="z.B. Pensionsgutachten für Jahresabschluss" />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-xs font-medium text-[#0a1628] uppercase tracking-wide mb-2">Nachricht *</label>
                <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#0a1628]/10 bg-transparent text-[#0a1628] text-sm focus:outline-none focus:border-[#d4a853] transition-colors duration-300 resize-none placeholder:text-[#0a1628]/25"
                  placeholder="Beschreiben Sie Ihr Anliegen..." />
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
    </section>
  );
}
