import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Simulations from "./pages/Simulations";
import SimulationPlay from "./pages/SimulationPlay";
import Learning from "./pages/Learning";
import GovtResources from "./pages/GovtResources";
import SafetyMap from "./pages/SafetyMap";
import Heatmap from "./pages/Heatmap";
import Chatbot from "./pages/Chatbot";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import SOS from "./pages/sos";
import EmbeddedDemo from "./pages/EmbeddedDemo";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/simulations" element={<Simulations />} />
          <Route path="/simulations/:scenarioId" element={<SimulationPlay />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/govt-resources" element={<GovtResources />} />
          <Route path="/safety-map" element={<SafetyMap />} />
          <Route path="/embed-demo" element={<EmbeddedDemo />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
