import { useQuery } from "@tanstack/react-query";
import { getCompletions } from "../../../../api";

const useCompletions = () =>
  useQuery({
    queryKey: ["completions"],
    queryFn: () => getCompletions().then((r) => r.data),
  });

export default useCompletions;
