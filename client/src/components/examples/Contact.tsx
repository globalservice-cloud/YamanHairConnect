import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Contact from '../../pages/Contact';

export default function ContactExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Contact />
    </QueryClientProvider>
  );
}
