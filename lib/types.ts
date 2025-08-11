export interface TodoType {
  id: number;
  text: string;
  completed: boolean;
}

export interface StateType {
  todos: TodoType[];
}

export type ActionType =
  | { type: "ADD_TODO"; payload: TodoType }
  | { type: "REMOVE_TODO"; id: number }
  | { type: "UPDATE_TODO_STATUS"; payload: TodoType };
