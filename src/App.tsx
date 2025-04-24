
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EmailJSConfig from "./components/EmailJSConfig";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Tools from "./pages/Tools";
import SoundController from "./components/SoundController";

const queryClient = new QueryClient();

// EmailJS User ID (Public Key)
const EMAILJS_USER_ID = "dAleMz5wOFOUtTV7j";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <EmailJSConfig userId={EMAILJS_USER_ID} />
      <SoundController />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
