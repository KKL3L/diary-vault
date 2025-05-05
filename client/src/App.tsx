import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { setupBackButtonHandler } from "./capacitor-utils";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Setup Capacitor-specific behaviors when running as a native app
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      console.log("Running as native app");
      // Setup Android back button behavior
      setupBackButtonHandler();
      
      // Add any other Capacitor-specific initialization here
      document.body.classList.add("capacitor-app");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
