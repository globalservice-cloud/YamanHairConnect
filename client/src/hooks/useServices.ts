import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

export function useActiveServices() {
  return useQuery<Service[]>({
    queryKey: ["/api/services/active"],
  });
}


