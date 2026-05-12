import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
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
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

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
      <section id="kontakt" className="py-20 md:py-28 bg-secondary/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Vielen Dank für Ihre Anfrage!
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Wir haben Ihre Nachricht erhalten und werden uns schnellstmöglich bei Ihnen melden.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline" className="hover:scale-105 transition-transform duration-300">
              Weitere Anfrage senden
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="max-w-2xl mx-auto text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-3 mb-4">
            Angebotsanfrage
          </h2>
          <p className="text-muted-foreground text-lg">
            Senden Sie uns Ihre Anfrage – wir erstellen Ihnen gerne ein individuelles Angebot.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div
            ref={contactRef}
            className="space-y-6"
            style={{
              opacity: contactVisible ? 1 : 0,
              transform: contactVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <div className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-500">
              <h3 className="font-semibold text-foreground mb-4">Kontaktdaten</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Adresse</p>
                    <p className="text-sm text-muted-foreground">Frankfurt am Main</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Telefon</p>
                    <p className="text-sm text-muted-foreground">+49 (0) 69 / 000 000</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="text-sm font-medium text-foreground">E-Mail</p>
                    <p className="text-sm text-muted-foreground">info@gbg-consulting.de</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className="lg:col-span-2"
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 md:p-8 border border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1.5">
                    Vorname *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-300 hover:border-primary/40"
                    placeholder="Max"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1.5">
                    Nachname *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-300 hover:border-primary/40"
                    placeholder="Mustermann"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    E-Mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-300 hover:border-primary/40"
                    placeholder="max@beispiel.de"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-300 hover:border-primary/40"
                    placeholder="+49 69 123456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">
                    Unternehmen
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-300 hover:border-primary/40"
                    placeholder="Firma GmbH"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-foreground mb-1.5">
                    Art der Anfrage
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-300 hover:border-primary/40"
                  >
                    <option value="quote">Angebotsanfrage</option>
                    <option value="contact">Allgemeine Kontaktanfrage</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                  Betreff *
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-300 hover:border-primary/40"
                  placeholder="z.B. Pensionsgutachten für Jahresabschluss"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all duration-300 resize-none hover:border-primary/40"
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 
                  hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
                  transition-all duration-300"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  "Wird gesendet..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Anfrage absenden
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Mit dem Absenden stimmen Sie unserer{" "}
                <a href="/datenschutz" className="underline hover:text-foreground transition-colors duration-200">Datenschutzerklärung</a> zu.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
