export default function createTodo(title) {
  return {
    id: Date.now().toString(),
    title: title,
    completed: false,
  };
}

