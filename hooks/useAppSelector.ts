import { StateType } from "@/lib/types";
import { TodoContext } from "@/services/context/TodoContext";
import { useContext, useMemo } from "react";

export function useAppSelector<Selected>(
  selector: (state: StateType) => Selected
): Selected {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useAppSelector must be used within StateProvider");
  }

  return useMemo(() => selector(context.state), [context.state, selector]);
}
