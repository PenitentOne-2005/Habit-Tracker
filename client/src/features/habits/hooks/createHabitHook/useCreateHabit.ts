import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabit } from "@/features/habits/api";

const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });
};

export default useCreateHabit;
