import { useQuery } from "@tanstack/react-query";
import { getHabits } from "@/features/habits/api";

const useHabits = () =>
  useQuery({
    queryKey: ["habits"],
    queryFn: () => getHabits().then((r) => r.data),
  });

export default useHabits;
