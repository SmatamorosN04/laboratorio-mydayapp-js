import "./css/base.css";
import createTodo from "./js/utils.js";

let all = [];

const inputTodo = document.querySelector(".new-todo");

const todoList = document.querySelector(".todo-list");

const todoCount = document.querySelector(".todo-count strong");

const editTask = document.querySelector(".editing");
editTask.style.visibility = "hidden";

inputTodo.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const text = inputTodo.value.trim();
    if (text === "") return;

    const newTodo = createTodo(text);
    all.push(newTodo);

    inputTodo.value = "";
    console.log(all);

    renderAll();
  }
});
todoList.addEventListener("change", (event) => {
  if (!event.target.classList.contains("toggle")) return;

  const li = event.target.closest("li");
  const todoId = li.dataset.id;
  const todo = all.find((t) => t.id === todoId);

  if (!todo) return;

  todo.completed = !todo.completed;
  li.classList.toggle("completed", todo.completed);
});

todoList.addEventListener("dblclick", (event) => {
  if (!event.target.tagName === "LABEL") return;
  const li = event.target.closest("li");
  li.classList.add("editing");

  const input = li.querySelector(".edit");
  input.focus();
  input.setSelectionRange(0, input.value.length);
});

todoList.addEventListener("click", (event) => {

  if (!event.target.classList.contains("destroy")) return;

  const li = event.target.closest("li");
  const todoId = li.dataset.id;

  const index = all.findIndex((t) => t.id === todoId);
  if (index > -1) all.splice(index, 1);

  renderAll();
});

todoList.addEventListener("keyup", (event) => {
  if (!event.target.classList.contains("edit")) return;

  const li = event.target.closest("li");
  const todoId = li.dataset.id;
  const todo = all.find((t) => t.id === todoId);
  if (!todo) return;

  if (event.key === "Enter") {
    const newTitle = event.target.value.trim();
    if (newTitle !== "") {
      todo.title = newTitle;
      renderAll();
    }
    li.classlist.remove("editing");
  }
  if (event.key === "Escape") {
    li.classList.remove("editing");
    renderAll();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  inputTodo.focus();
});

function renderAll() {
  todoList.innerHTML = "";

  all.forEach((todo) => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
    <div class="view">
    <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
    <label> ${todo.title}</label>
    <button class="destroy"></button>
    </div>
    <input class="edit" value="${todo.title}">
    `;
    todoList.appendChild(li);
  });
}
