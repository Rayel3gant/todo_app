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
  | { type: "REMOVE_TODO"; payload: number };
