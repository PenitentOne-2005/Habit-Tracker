import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHabit } from "../../../../api";

const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });
};

export default useDeleteHabit;
