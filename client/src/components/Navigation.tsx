import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";

  const navLinks = isHome
    ? [
        { href: "#dienstleistungen", label: "Dienstleistungen" },
        { href: "#bilmog", label: "BilMoG Zins" },
        { href: "#ueber-uns", label: "Über uns" },
        { href: "#kontakt", label: "Kontakt" },
      ]
    : [
        { href: "/#dienstleistungen", label: "Dienstleistungen" },
        { href: "/#bilmog", label: "BilMoG Zins" },
        { href: "/#ueber-uns", label: "Über uns" },
        { href: "/#kontakt", label: "Kontakt" },
      ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(10,22,40,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {isScrolled ? (
              <img
                src="/GBG Logo KO_Finalversion.jpg"
                alt="GBG Consulting für betriebliche Altersversorgung GmbH"
                className="h-12 w-auto"
              />
            ) : (
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold tracking-tight text-white font-serif">GBG</span>
                <span className="text-[10px] md:text-xs text-white/60 leading-tight -mt-1 tracking-wider">Consulting für bAV</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-[#0a1628]/70 hover:text-[#d4a853]"
                    : "text-white/80 hover:text-[#d4a853]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Link href="/blog">
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? "text-[#0a1628]/70 hover:text-[#d4a853]"
                  : "text-white/80 hover:text-[#d4a853]"
              }`}>
                Fachartikel
              </span>
            </Link>
            <Link href="/stellenangebote">
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? "text-[#0a1628]/70 hover:text-[#d4a853]"
                  : "text-white/80 hover:text-[#d4a853]"
              }`}>
                Karriere
              </span>
            </Link>
          </nav>

          {/* CTA + Contact */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+49403257800"
              className={`transition-colors duration-300 ${
                isScrolled ? "text-[#0a1628]/40 hover:text-[#d4a853]" : "text-white/50 hover:text-[#d4a853]"
              }`}
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="mailto:info@gbg-consulting.de"
              className={`transition-colors duration-300 ${
                isScrolled ? "text-[#0a1628]/40 hover:text-[#d4a853]" : "text-white/50 hover:text-[#d4a853]"
              }`}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={isHome ? "#kontakt" : "/#kontakt"}
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  handleNavClick("#kontakt");
                }
              }}
              className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-[#0a1628] text-white hover:bg-[#d4a853]"
                  : "bg-white/10 text-white border border-white/20 hover:bg-[#d4a853] hover:border-[#d4a853]"
              }`}
            >
              Angebotsanfrage
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? "text-[#0a1628]" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü öffnen"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#0a1628]/5">
          <nav className="container py-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                  }
                  handleNavClick(link.href);
                }}
                className="text-base font-medium text-[#0a1628]/70 hover:text-[#d4a853] py-3 border-b border-[#0a1628]/5 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-base font-medium text-[#0a1628]/70 hover:text-[#d4a853] py-3 border-b border-[#0a1628]/5 block">
                Fachartikel
              </span>
            </Link>
            <Link href="/stellenangebote" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-base font-medium text-[#0a1628]/70 hover:text-[#d4a853] py-3 border-b border-[#0a1628]/5 block">
                Karriere
              </span>
            </Link>
            <Link href="/rechengroessen" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-base font-medium text-[#0a1628]/70 hover:text-[#d4a853] py-3 block">
                Rechengrößen
              </span>
            </Link>
            <div className="pt-6 mt-4 border-t border-[#0a1628]/10">
              <a
                href={isHome ? "#kontakt" : "/#kontakt"}
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    handleNavClick("#kontakt");
                  }
                }}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#0a1628] text-white text-sm font-medium hover:bg-[#d4a853]"
              >
                Angebotsanfrage
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
