
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import UserDashboard from "./pages/UserDashboard";
import StatusCheck from "./pages/StatusCheck";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardNew from "./pages/AdminDashboardNew";
import AdminLogin from "./pages/AdminLogin";
import AdminApplicationView from "./pages/AdminApplicationView";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/kyc-form" element={<UserDashboard />} />
            <Route path="/status-check" element={<StatusCheck />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminDashboardNew />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute>
                  <AdminDashboardNew />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/view/:id" 
              element={
                <PrivateRoute>
                  <AdminApplicationView />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
