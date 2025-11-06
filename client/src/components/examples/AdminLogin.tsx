import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import AdminLogin from '../../pages/AdminLogin';

export default function AdminLoginExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminLogin />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
