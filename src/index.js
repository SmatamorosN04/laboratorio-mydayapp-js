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
  }
});

window.addEventListener("DOMContentLoaded", () => {
  inputTodo.focus();
});
