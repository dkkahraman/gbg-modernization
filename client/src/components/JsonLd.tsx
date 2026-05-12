interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders a JSON-LD script tag for structured data.
 * Used for Schema.org markup to improve search engine understanding.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization schema for GBG Consulting.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GBG Consulting für betriebliche Altersversorgung GmbH",
  alternateName: "GBG Consulting",
  url: "https://gbg-consulting.de",
  // logo: Wird nach Upload des echten Logos ergänzt
  description:
    "Versicherungsmathematische Beratung und Gutachten für betriebliche Altersversorgung. Über 25 Jahre Erfahrung in Pensionsgutachten, BilMoG-Bewertungen und bAV-Beratung.",
  foundingDate: "1998",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frankfurt am Main",
    addressCountry: "DE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@gbg-consulting.de",
    availableLanguage: ["German"],
  },
  // sameAs: Wird nach Verifizierung der Social-Profile ergänzt
  memberOf: [
    {
      "@type": "Organization",
      name: "Deutsche Aktuarvereinigung (DAV)",
    },
    {
      "@type": "Organization",
      name: "Institut der Versicherungsmathematischen Sachverständigen (IVS)",
    },
    {
      "@type": "Organization",
      name: "Arbeitsgemeinschaft für betriebliche Altersversorgung (aba)",
    },
  ],
};

/**
 * ProfessionalService schema for GBG Consulting.
 */
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "GBG Consulting für betriebliche Altersversorgung GmbH",
  url: "https://gbg-consulting.de",
  description:
    "Versicherungsmathematische Gutachten, Pensionsgutachten, BilMoG-Bewertungen, Versorgungsausgleich und umfassende bAV-Beratung.",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frankfurt am Main",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "50.1109",
    longitude: "8.6821",
  },
  areaServed: {
    "@type": "Country",
    name: "Germany",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dienstleistungen",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Versicherungsmathematische Gutachten",
          description: "Erstellung von Gutachten nach HGB, IFRS und US-GAAP",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pensionsgutachten",
          description: "Bewertung von Pensionsverpflichtungen für Handels- und Steuerbilanz",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "BilMoG-Bewertung",
          description: "Bewertung nach dem Bilanzrechtsmodernisierungsgesetz",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Versorgungsausgleich",
          description: "Berechnung des Versorgungsausgleichs bei Ehescheidung",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "U-Kassen Betreuung",
          description: "Laufende versicherungsmathematische Betreuung von Unterstützungskassen",
        },
      },
    ],
  },
};

/**
 * FAQ schema for the FAQ section.
 */
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist ein versicherungsmathematisches Gutachten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein versicherungsmathematisches Gutachten bewertet Pensionsverpflichtungen und andere Versorgungszusagen nach anerkannten aktuariellen Methoden. Es dient als Grundlage für die Bilanzierung nach HGB, IFRS oder US-GAAP.",
      },
    },
    {
      "@type": "Question",
      name: "Wann benötige ich ein Pensionsgutachten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein Pensionsgutachten wird benötigt, wenn Ihr Unternehmen Pensionszusagen erteilt hat und diese in der Handels- oder Steuerbilanz bewerten muss. Es ist jährlich zum Bilanzstichtag zu erstellen.",
      },
    },
    {
      "@type": "Question",
      name: "Was bedeutet BilMoG für mein Unternehmen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Bilanzrechtsmodernisierungsgesetz (BilMoG) verpflichtet Unternehmen, Pensionsrückstellungen nach dem Durchschnittszins der letzten 7 bzw. 10 Jahre zu bewerten. GBG erstellt regelmäßig Prognosen für diese Zinssätze.",
      },
    },
    {
      "@type": "Question",
      name: "Wie läuft eine Zusammenarbeit mit GBG Consulting ab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach einer kostenlosen Erstberatung analysieren wir Ihre bestehenden Versorgungszusagen, erstellen ein maßgeschneidertes Angebot und liefern Ihnen termingerecht die benötigten Gutachten und Berechnungen.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet ein versicherungsmathematisches Gutachten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kosten hängen von der Anzahl der Versorgungsberechtigten, der Komplexität der Zusagen und dem gewünschten Bewertungsstandard ab. Wir erstellen Ihnen gerne ein individuelles Angebot.",
      },
    },
  ],
};

/**
 * WebSite schema for sitelinks search box.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GBG Consulting",
  url: "https://gbg-consulting.de",
  description:
    "Versicherungsmathematische Beratung und Gutachten für betriebliche Altersversorgung",
  inLanguage: "de-DE",
};
