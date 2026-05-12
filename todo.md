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
