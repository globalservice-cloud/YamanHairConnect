import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Navbar from '../Navbar';

export default function NavbarExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
    </QueryClientProvider>
  );
}
