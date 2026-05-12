# Project TODO

- [x] Design-System: Elegantes Farbschema (Dunkelblau, Gold-Akzent, Weiß) und Typografie (Inter/Playfair Display)
- [x] Globale Navigation: Sticky Top-Navigation mit Anker-Links zu Sektionen und Links zu Unterseiten
- [x] Hero-Sektion: Claim "Gute Beratung Gewinnt", modernes Layout, prominenter CTA-Button für Angebotsanfrage
- [x] Dienstleistungen-Sektion: Karten-Layout mit allen Services (Gutachten, Pensionszusagen, U-Kassen, etc.)
- [x] BilMoG-Zinstabelle: Prominente Tabelle mit aktuellen Werten (7-jährig, 10-jährig) und GBG-Prognose
- [x] Über-uns-Sektion: Unternehmensprofil, Vertrauenselemente (Erfahrung, Kompetenz, Seriosität)
- [x] Kontaktformular: Formular mit Datenbankanbindung für Angebotsanfragen
- [x] Benachrichtigungssystem: Automatische E-Mail und In-App-Benachrichtigung bei neuer Anfrage
- [x] Stellenangebote-Seite: Eigene Unterseite für aktuelle Stellenangebote
- [x] Rechengrößen-Seite: Eigene Unterseite für Rechengrößen der Altersversorgung
- [x] Datenschutz-Seite: Eigenständige Seite mit Datenschutzerklärung
- [x] Impressum-Seite: Eigenständige Seite mit Impressum (Platzhalter für echte Daten)
- [x] AGB-Seite: Eigenständige Seite mit AGB
- [x] Mobile-first Responsive Design: Vollständig responsives Layout für alle Bildschirmgrößen
- [x] Footer: Professioneller Footer mit Links, Kontaktdaten und rechtlichen Seiten
- [x] Tests: Vitest-Tests für Backend-Logik (Kontaktformular, Benachrichtigungen)
- [x] Vitest-Tests ergänzen: notifyOwner-Aufruf verifizieren bei Inquiry-Submit
- [x] Impressum-Hinweis: Platzhalter-Daten sind bewusst gesetzt, Kunde muss echte Daten einpflegen

## Wettbewerbsanalyse-Optimierungen

- [x] Testimonials-Sektion: 2-3 Kundenstimmen (anonymisiert) als eigene Sektion (Platzhalter-Texte, müssen durch echte Referenzen ersetzt werden)
- [x] Team-Sektion: Persönliche Ansprechpartner mit Foto-Platzhalter, Name und Titel (Platzhalter-Daten, müssen durch echte Teammitglieder ersetzt werden)
- [x] Zertifizierungs-/Mitgliedschafts-Logos: DAV, IVS, aba als Badge-Leiste im Hero-Bereich (Icon+Text-Badges; echte Logos können später ergänzt werden)
- [x] FAQ-Sektion: 7 häufig gestellte Fragen zu Pensionsgutachten, BilMoG, Ablauf
- [x] Sekundärer CTA: "Kostenlose Erstberatung" als alternative niedrigschwellige Kontaktoption

## UX-Verbesserungen: Animationen

- [x] useScrollAnimation Hook: Intersection Observer für Fade-in/Slide-up Animationen
- [x] Hover-Effekte: Verbesserte Karten-Hover mit Scale, Shadow und Border-Transitions
- [x] Scroll-Animationen: Staggered Fade-in für Testimonials, Team, Services, FAQ
- [x] Smooth Transitions: Weiche Übergänge für Karten, Buttons, Formularfelder und Kontakt-Icons in allen neuen Sektionen

## Ladeanimation

- [x] Splash-Screen-Komponente: Elegantes GBG-Logo mit Fade-in Animation
- [x] Übergangseffekt: Sanftes Ausblenden des Splash-Screens in die Hauptseite
- [x] Session-basiert: Animation nur beim ersten Seitenaufruf pro Session anzeigen

## Parallax-Effekt

- [x] useParallax Hook: Scroll-basierter Parallax mit requestAnimationFrame für Performance
- [x] Hero-Integration: Trust-Karten und Hintergrund-Elemente mit unterschiedlicher Scroll-Geschwindigkeit
- [x] Mobile-Deaktivierung: Parallax auf kleinen Bildschirmen deaktivieren für Performance

## Cookie-Consent-Banner

- [x] CookieConsent-Komponente: DSGVO-konformes Banner mit Akzeptieren/Ablehnen/Einstellungen
- [x] Persistente Speicherung: Nutzerentscheidung in localStorage speichern (mit try/catch)
- [x] Link zur Datenschutzerklärung: Direkte Verlinkung aus dem Banner
- [x] Integration in App.tsx: Banner am unteren Bildschirmrand mit Animation

## SEO-Optimierung

- [x] SEO-Hook/Komponente: Dynamische Meta-Tags (title, description, OG, Twitter Cards) pro Seite
- [x] JSON-LD strukturierte Daten: Organization, ProfessionalService, FAQPage, WebSite Schema
- [x] robots.txt mit Sitemap-Verweis und Crawler-Regeln
- [x] Kanonische URLs und theme-color Meta-Tag in index.html

## Back-to-Top-Button

- [x] BackToTop-Komponente: Dezenter Button am unteren rechten Rand mit Fade-in nach Scroll
- [x] Smooth Scroll: Weiches Zurückscrollen nach oben bei Klick
- [x] Integration in App.tsx

## Sitemap

- [x] sitemap.xml: Vollständige XML-Sitemap mit allen öffentlichen Seiten, Prioritäten und changefreq

## Blog/Fachartikel

- [x] Datenbank-Schema: articles-Tabelle (title, slug, excerpt, content, category, publishedAt, author)
- [x] Backend-Router: CRUD-Prozeduren für Artikel (list, getBySlug, create, update, delete)
- [x] Blog-Übersichtsseite: Karten-Layout mit Kategorien-Filter und Suchfunktion
- [x] Einzelartikel-Seite: Vollständige Darstellung mit Markdown-Rendering
- [x] Navigation: Blog-Link in Hauptnavigation integrieren
- [x] SEO: Dynamische Meta-Tags (useSEO) für Blog-Seiten
- [x] Sitemap: Blog-Seite in sitemap.xml aufnehmen
- [x] Beispiel-Artikel: 3 Fachartikel zu bAV-Themen als Seed-Daten
- [x] Blog-Übersichtsseite: Error-State und Retry-UI für fehlgeschlagene Abfragen
- [x] Einzelartikel-Seite: Separater Error-State für API-Fehler (nicht als 404 darstellen)
- [x] Blog-SEO: JSON-LD Article-Schema pro Einzelartikel
- [x] Vitest-Tests für Article-Router (listPublished/getBySlug/create/update/delete)
