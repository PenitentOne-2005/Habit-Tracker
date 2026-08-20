import { useQuery } from "@tanstack/react-query";
import { getCompletions } from "@/features/habits/api";

const useCompletions = () =>
  useQuery({
    queryKey: ["completions"],
    queryFn: () => getCompletions().then((r) => r.data),
  });

export default useCompletions;
