import { showUI } from "./utils.js";

function newTask(task) {
  const TODO_LIST = document.querySelector(".todo-list");

  let taskList = document.createElement("li");

  let taskContainer = document.createElement("div");
  taskContainer.className = "view";

  let taskInput = document.createElement("input");
  taskInput.className = "edit";
  taskInput.setAttribute("value", task);

  let taskCheckbox = document.createElement("input");
  taskCheckbox.className = "toggle";
  taskCheckbox.type = "checkbox";

  let taskLabel = document.createElement("label");
  taskLabel.textContent = `${task}`;

  let taskBtn = document.createElement("button");
  taskBtn.className = "destroy";

  taskContainer.append(taskCheckbox, taskLabel, taskBtn);
  taskList.append(taskContainer, taskInput);

  TODO_LIST.append(taskList);

  console.log(task);
  console.log(TODO_LIST);
}

function createTask(taskText) {
  showUI();
  if (taskText !== "") {
    newTask(taskText.trim(" "));
  }
}

export function newTodo() {
  const NEW_TODO_INPUT = document.querySelector(".new-todo");

  NEW_TODO_INPUT.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      createTask(NEW_TODO_INPUT.value);
      NEW_TODO_INPUT.value = "";
    }
  });
}
