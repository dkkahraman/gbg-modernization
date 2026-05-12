import { Link } from "wouter";
import { Phone, Mail, MapPin, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">GBG</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Consulting für betriebliche Altersversorgung GmbH
            </p>
            <p className="text-primary-foreground/70 text-sm mt-4 leading-relaxed">
              Ihr kompetenter Partner für alle Fragen rund um die betriebliche Altersversorgung.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
              Leistungen
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="/#dienstleistungen" className="hover:text-primary-foreground transition-colors">Versicherungsmathematische Gutachten</a></li>
              <li><a href="/#dienstleistungen" className="hover:text-primary-foreground transition-colors">Pensionsgutachten</a></li>
              <li><a href="/#dienstleistungen" className="hover:text-primary-foreground transition-colors">GGF-Versorgung</a></li>
              <li><a href="/#dienstleistungen" className="hover:text-primary-foreground transition-colors">Versorgungsausgleich</a></li>
              <li><a href="/#dienstleistungen" className="hover:text-primary-foreground transition-colors">U-Kassen Betreuung</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
              Unternehmen
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="/#ueber-uns" className="hover:text-primary-foreground transition-colors">Über uns</a></li>
              <li><Link href="/stellenangebote" className="hover:text-primary-foreground transition-colors">Stellenangebote</Link></li>
              <li><Link href="/rechengroessen" className="hover:text-primary-foreground transition-colors">Rechengrößen</Link></li>
              <li><a href="/#bilmog" className="hover:text-primary-foreground transition-colors">BilMoG Zinsentwicklung</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/90">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <span className="block">Hamburg</span>
                  <span className="block">Köln</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+4940000000" className="hover:text-primary-foreground transition-colors">
                  +49 (0) 40 / 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@gbg-consulting.de" className="hover:text-primary-foreground transition-colors">
                  info@gbg-consulting.de
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 shrink-0" />
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/50">
              &copy; {new Date().getFullYear()} GBG Consulting für betriebliche Altersversorgung GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-xs text-primary-foreground/50">
              <Link href="/datenschutz" className="hover:text-primary-foreground transition-colors">
                Datenschutz
              </Link>
              <Link href="/impressum" className="hover:text-primary-foreground transition-colors">
                Impressum
              </Link>
              <Link href="/agb" className="hover:text-primary-foreground transition-colors">
                AGB
              </Link>
              <button
                onClick={() => {
                  try { localStorage.removeItem("gbg-cookie-consent"); } catch {}
                  window.location.reload();
                }}
                className="hover:text-primary-foreground transition-colors cursor-pointer"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
