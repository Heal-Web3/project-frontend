import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import {  Toast } from "../src/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Web3Provider, useWeb3 } from "@/context/Web3Context";
import { AppProvider, useApp } from "@/context/AppContext";
import type { UserRole } from "@/context/AppContext";
import LandingPage from "./pages/LandingPage";
import DoctorPage from "./pages/DoctorPage";
import PharmacyPage from "./pages/PharmacyPage";
import RegulatorPage from "./pages/RegulatorPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: UserRole[] }) => {
  const { account } = useWeb3();
  const { role } = useApp();

  if (!account) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/doctor" element={
      <ProtectedRoute allowedRoles={['doctor']}>
        <DoctorPage />
      </ProtectedRoute>
    } />
    <Route path="/pharmacy" element={
      <ProtectedRoute allowedRoles={['pharmacy']}>
        <PharmacyPage />
      </ProtectedRoute>
    } />
    <Route path="/regulator" element={
      <ProtectedRoute allowedRoles={['regulator']}>
        <RegulatorPage />
      </ProtectedRoute>
    } />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

import { Toaster } from "sonner";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Web3Provider>
        <AppProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppProvider>
      </Web3Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
