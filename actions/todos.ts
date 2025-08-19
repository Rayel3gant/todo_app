export async function createTodoAction(formData: {
  title: string;
  date: string;
  userId: string;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (error) {
    return { error: "create todo failed" };
  }
}

export const updateTodoAction = async () => {};

export const deleteTodoAction = async () => {};

export const getAllTodosAction = async () => {};
