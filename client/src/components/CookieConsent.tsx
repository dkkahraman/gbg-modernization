import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X, Settings2 } from "lucide-react";

type ConsentState = "pending" | "accepted" | "rejected" | "custom";

interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "gbg-cookie-consent";

function getStoredConsent(): ConsentState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state || null;
    }
  } catch {
    // Storage unavailable
  }
  return null;
}

function storeConsent(state: ConsentState, preferences: CookiePreferences) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        state,
        preferences,
        timestamp: Date.now(),
      })
    );
  } catch {
    // Storage unavailable – consent cannot be persisted
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Only show if no consent has been given yet
    const stored = getStoredConsent();
    if (!stored) {
      // Small delay so it doesn't compete with splash screen
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    storeConsent("accepted", allAccepted);
    setVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    storeConsent("rejected", onlyNecessary);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    storeConsent("custom", preferences);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      style={{
        animation: "slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      }}
    >
      <div className="container max-w-4xl mx-auto">
        <div className="bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
          {/* Main Banner */}
          <div className="p-5 md:p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-base mb-1.5">
                  Cookie-Einstellungen
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                  Einige Cookies sind für den Betrieb der Website notwendig, während andere uns helfen, 
                  die Website zu verbessern und Ihnen relevante Inhalte anzuzeigen.{" "}
                  <a
                    href="/datenschutz"
                    className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                  >
                    Mehr erfahren
                  </a>
                </p>
              </div>
              <button
                onClick={handleRejectAll}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 shrink-0"
                aria-label="Schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Details Section */}
            {showDetails && (
              <div className="mt-5 pt-5 border-t border-border/50 space-y-3">
                {/* Necessary */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">Notwendige Cookies</p>
                    <p className="text-xs text-muted-foreground">
                      Erforderlich für den Betrieb der Website
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    Immer aktiv
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">Analyse-Cookies</p>
                    <p className="text-xs text-muted-foreground">
                      Helfen uns, die Nutzung der Website zu verstehen
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors duration-300 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">Marketing-Cookies</p>
                    <p className="text-xs text-muted-foreground">
                      Ermöglichen personalisierte Werbung
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors duration-300 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
              <Button
                onClick={handleAcceptAll}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-6"
              >
                Alle akzeptieren
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="text-sm border-border hover:bg-muted"
              >
                Ablehnen
              </Button>
              {showDetails ? (
                <Button
                  onClick={handleSavePreferences}
                  variant="outline"
                  className="text-sm border-primary/20 hover:bg-primary/5"
                >
                  Auswahl speichern
                </Button>
              ) : (
                <Button
                  onClick={() => setShowDetails(true)}
                  variant="ghost"
                  className="text-sm text-muted-foreground hover:text-foreground gap-1.5"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  Einstellungen
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-up animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
