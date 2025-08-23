import { getAllTodosAction } from "@/actions/todos";
import { useQuery } from "@tanstack/react-query";

export const useGetTodos = (userId: string) => {
  return useQuery({
    queryKey: ["userTodos", userId],
    queryFn: () => getAllTodosAction(userId),
    enabled: userId?.length > 0,
  });
};
