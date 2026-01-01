export function createTodo(title){
  return {
    id: crypto.randomUUID(),
    title,
    completed: false
  };
}

