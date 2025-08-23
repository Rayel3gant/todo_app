export type loginType = {
  email: string;
  password: string;
};

export type signupType = {
  username: string;
  email: string;
  password: string;
};
export type createTodoType = {
  title: string;
  date: Date;
  userId: string;
};
export type deleteTodoType = {
  userId: string;
  todoId: string;
};
export type updateTodoType = {
  status: "Completed" | "Pending";
  todoId: string;
};

export interface TodoResponse {
  _id: string;
  title: string;
  status: "Pending" | "Completed";
  date: string; // ISO date string
  __v: number;
}
