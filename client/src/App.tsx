import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import AGB from "./pages/AGB";
import Stellenangebote from "./pages/Stellenangebote";
import Rechengroessen from "./pages/Rechengroessen";
import SplashScreen from "./components/SplashScreen";
import CookieConsent from "./components/CookieConsent";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/datenschutz"} component={Datenschutz} />
      <Route path={"/impressum"} component={Impressum} />
      <Route path={"/agb"} component={AGB} />
      <Route path={"/stellenangebote"} component={Stellenangebote} />
      <Route path={"/rechengroessen"} component={Rechengroessen} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Show splash only once per session
  const [showSplash, setShowSplash] = useState(() => {
    try {
      const hasSeenSplash = sessionStorage.getItem("gbg-splash-seen");
      return !hasSeenSplash;
    } catch {
      // Storage unavailable (e.g. private browsing) – show splash anyway
      return true;
    }
  });

  const handleSplashComplete = useCallback(() => {
    try {
      sessionStorage.setItem("gbg-splash-seen", "true");
    } catch {
      // Storage unavailable – splash will show again on reload, acceptable fallback
    }
    setShowSplash(false);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          <div
            style={{
              opacity: showSplash ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
          >
            <Router />
            <CookieConsent />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
