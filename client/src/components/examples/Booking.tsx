import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Booking from '../../pages/Booking';

export default function BookingExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Booking />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
