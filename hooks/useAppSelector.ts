import { StateType } from "@/lib/types";
import { TodoContext } from "@/services/context/TodoContext";
import { useContext, useMemo } from "react";

export function useAppSelector<T>(selector: (state: StateType) => T): T {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useAppSelector must be used within StateProvider");

  // Memoize the derived value
  return useMemo(() => selector(context.state), [context.state, selector]);
}