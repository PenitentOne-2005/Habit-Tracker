import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeHabit } from "../../../../api";

const useCompleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["completions"] });
    },
  });
};

export default useCompleteHabit;
