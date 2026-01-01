function createTodo(title) {
  return {
    id: crypto.randomUUID(),
    title: title,
    completed: false,
  };
}

export default createTodo;
