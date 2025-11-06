import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Services from '../../pages/Services';

export default function ServicesExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Services />
    </QueryClientProvider>
  );
}
