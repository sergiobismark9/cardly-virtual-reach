
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Cards from "./pages/Cards";
import CreateCard from "./pages/CreateCard";
import CardViewer from "./pages/CardViewer";
import Contacts from "./pages/Contacts";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cards/new" element={<CreateCard />} />
          <Route path="/cards/edit/:id" element={<CreateCard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/c/:slug" element={<CardViewer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
