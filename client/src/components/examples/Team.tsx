import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Team from '../../pages/Team';

export default function TeamExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Team />
    </QueryClientProvider>
  );
}
