import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
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
                <span className="text-[10px] md:text-xs text-white/70 leading-tight -mt-1">Consulting für bAV</span>
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
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link href="/blog">
              <span className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                Fachartikel
              </span>
            </Link>
            <Link href="/stellenangebote">
              <span className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                Karriere
              </span>
            </Link>
          </nav>

          {/* CTA + Contact */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+49403257800" className="text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
            </a>
            <a href="mailto:info@gbg-consulting.de" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
            </a>
            <a href={isHome ? "#kontakt" : "/#kontakt"} onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                handleNavClick("#kontakt");
              }
            }}>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Angebotsanfrage
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü öffnen"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg">
          <nav className="container py-6 flex flex-col gap-4">
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
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 block">
                Fachartikel
              </span>
            </Link>
            <Link href="/stellenangebote" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 block">
                Karriere
              </span>
            </Link>
            <Link href="/rechengroessen" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 block">
                Rechengrößen
              </span>
            </Link>
            <div className="pt-4 border-t border-border">
              <a href={isHome ? "#kontakt" : "/#kontakt"} onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  handleNavClick("#kontakt");
                }
              }}>
                <Button className="w-full bg-primary text-primary-foreground">
                  Angebotsanfrage
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
