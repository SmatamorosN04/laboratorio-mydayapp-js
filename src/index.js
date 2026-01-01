import "./css/base.css";
import createTodo from "./js/utils.js";

let all = [];

const mainSection = document.querySelector(".main");
const footerSection = document.querySelector(".footer");
const inputTodo = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");
const btnDeleteAll = document.querySelector(".clear-completed");
const filterLinks = document.querySelectorAll(".filters a");

mainSection.style.display = "none";
footerSection.style.display = "none";

inputTodo.addEventListener("keyup", (event) => {
  if (event.key !== "Enter") return;

  const text = inputTodo.value.trim();
  if (!text) return;

  all.push(createTodo(text));
  saveInLocalStorage();
  inputTodo.value = "";
  renderAll();
});

todoList.addEventListener("change", (event) => {
  if (!event.target.classList.contains("toggle")) return;

  const li = event.target.closest("li");
  const todo = all.find(t => t.id === li.dataset.id);
  if (!todo) return;

  todo.completed = event.target.checked;
  saveInLocalStorage();
  renderAll();
});

todoList.addEventListener("click", (event) => {
  if (!event.target.classList.contains("destroy")) return;

  const li = event.target.closest("li");
  all = all.filter(t => t.id !== li.dataset.id);
  saveInLocalStorage();
  renderAll();
});

todoList.addEventListener("dblclick", (event) => {
  if (event.target.tagName !== "LABEL") return;

  const li = event.target.closest("li");
  li.classList.add("editing");

  const input = li.querySelector(".edit");
  input.focus();
  input.setSelectionRange(0, input.value.length);
});

todoList.addEventListener("keyup", (event) => {
  if (!event.target.classList.contains("edit")) return;

  const li = event.target.closest("li");
  const todo = all.find(t => t.id === li.dataset.id);
  if (!todo) return;

  if (event.key === "Enter") {
    const value = event.target.value.trim();
    if (value) {
      todo.title = value;
      saveInLocalStorage();
    }
    li.classList.remove("editing");
    renderAll();
  }

  if (event.key === "Escape") {
    li.classList.remove("editing");
    renderAll();
  }
});

btnDeleteAll.addEventListener("click", () => {
  all = all.filter(todo => !todo.completed);
  saveInLocalStorage();
  renderAll();
});

window.addEventListener("hashchange", renderAll);

window.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderAll();
  inputTodo.focus();
});

function renderAll() {
  todoList.innerHTML = "";

  if (all.length === 0) {
    mainSection.style.display = "none";
    footerSection.style.display = "none";
  } else {
    mainSection.style.display = "block";
    footerSection.style.display = "block";
  }

  const hash = location.hash;

  all.forEach(todo => {
    if (hash === "#/pending" && todo.completed) return;
    if (hash === "#/completed" && !todo.completed) return;

    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
        <label>${todo.title}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo.title}">
    `;

    todoList.appendChild(li);
  });

  updateCounter();
  updateClearCompletedButton();
  highlightFilter();
}

function updateCounter() {
  const pending = all.filter(todo => !todo.completed).length;
  todoCount.innerHTML = `<strong>${pending}</strong> ${pending === 1 ? "item" : "items"} left`;
}

function updateClearCompletedButton() {
  const hasCompleted = all.some(todo => todo.completed);
  btnDeleteAll.style.display = hasCompleted ? "inline-block" : "none";
}

function highlightFilter() {
  const hash = location.hash || "#/";
  filterLinks.forEach(link => {
    link.classList.toggle("selected", link.getAttribute("href") === hash);
  });
}

function saveInLocalStorage() {
  localStorage.setItem("mydayapp-js", JSON.stringify(all));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("mydayapp-js");
  if (data) all = JSON.parse(data);
}
