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
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import CookieConsent from "./components/CookieConsent";
import BackToTop from "./components/BackToTop";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/datenschutz"} component={Datenschutz} />
      <Route path={"/impressum"} component={Impressum} />
      <Route path={"/agb"} component={AGB} />
      <Route path={"/stellenangebote"} component={Stellenangebote} />
      <Route path={"/rechengroessen"} component={Rechengroessen} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogArticle} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieConsent />
          <BackToTop />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
