import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Company Info — wider column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-[2px] bg-[#d4a853]" />
              <h3 className="text-xl font-serif font-bold tracking-tight">GBG</h3>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Consulting für betriebliche<br />
              Altersversorgung GmbH
            </p>
            <p className="text-white/30 text-xs mt-4 leading-relaxed max-w-xs">
              Ihr kompetenter Partner für alle Fragen rund um die betriebliche Altersversorgung – seit über 30 Jahren.
            </p>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-wide text-white/60 mb-5">
              Leistungen
            </h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li><a href="/#dienstleistungen" className="hover:text-[#d4a853] transition-colors duration-200">Versicherungsmathematische Gutachten</a></li>
              <li><a href="/#dienstleistungen" className="hover:text-[#d4a853] transition-colors duration-200">Pensionsgutachten</a></li>
              <li><a href="/#dienstleistungen" className="hover:text-[#d4a853] transition-colors duration-200">GGF-Versorgung</a></li>
              <li><a href="/#dienstleistungen" className="hover:text-[#d4a853] transition-colors duration-200">Versorgungsausgleich</a></li>
              <li><a href="/#dienstleistungen" className="hover:text-[#d4a853] transition-colors duration-200">U-Kassen Betreuung</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-wide text-white/60 mb-5">
              Unternehmen
            </h4>
            <ul className="space-y-2.5 text-sm text-white/40">
              <li><a href="/#ueber-uns" className="hover:text-[#d4a853] transition-colors duration-200">Über uns</a></li>
              <li><Link href="/stellenangebote" className="hover:text-[#d4a853] transition-colors duration-200">Stellenangebote</Link></li>
              <li><Link href="/rechengroessen" className="hover:text-[#d4a853] transition-colors duration-200">Rechengrößen</Link></li>
              <li><a href="/#bilmog" className="hover:text-[#d4a853] transition-colors duration-200">BilMoG Zinsen</a></li>
              <li><Link href="/blog" className="hover:text-[#d4a853] transition-colors duration-200">Fachartikel</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-wide text-white/60 mb-5">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#d4a853]" />
                <span>Hamburg &middot; Köln</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 shrink-0 text-[#d4a853]" />
                <a href="tel:+49403257800" className="hover:text-[#d4a853] transition-colors duration-200">
                  +49 (0) 40 / 325 780-0
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 shrink-0 text-[#d4a853]" />
                <a href="mailto:info@gbg-consulting.de" className="hover:text-[#d4a853] transition-colors duration-200">
                  info@gbg-consulting.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} GBG Consulting für betriebliche Altersversorgung GmbH
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-white/30">
              <Link href="/datenschutz" className="hover:text-[#d4a853] transition-colors duration-200">
                Datenschutz
              </Link>
              <Link href="/impressum" className="hover:text-[#d4a853] transition-colors duration-200">
                Impressum
              </Link>
              <Link href="/agb" className="hover:text-[#d4a853] transition-colors duration-200">
                AGB
              </Link>
              <button
                onClick={() => {
                  try { localStorage.removeItem("gbg-cookie-consent"); } catch {}
                  window.location.reload();
                }}
                className="hover:text-[#d4a853] transition-colors duration-200 cursor-pointer"
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
