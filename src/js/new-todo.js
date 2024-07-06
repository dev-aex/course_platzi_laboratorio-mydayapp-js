import { showUI } from "./utils.js";

function editTask(taskli, taskEditInput, taskTextContent) {
  taskli.classList.add("editing");
  taskEditInput.focus();
  taskEditInput.selectionStart = taskEditInput.selectionEnd =
    taskEditInput.value.length;
  taskEditInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      taskTextContent.textContent = taskEditInput.value;
      taskEditInput.setAttribute("value", taskTextContent.textContent);
      taskli.classList.remove("editing");
    }
  });
}

function newTask(task) {
  const TODO_LIST = document.querySelector(".todo-list");

  let taskList = document.createElement("li");

  let taskContainer = document.createElement("div");
  taskContainer.className = "view";

  let taskCheckbox = document.createElement("input");
  taskCheckbox.className = "toggle";
  taskCheckbox.type = "checkbox";
  taskCheckbox.onclick = () => {
    taskList.classList.toggle("completed");
  };

  let taskLabel = document.createElement("label");
  taskLabel.textContent = `${task}`;
  taskLabel.onclick = () => {
    editTask(taskList, taskInput, taskLabel);
  };

  let taskInput = document.createElement("input");
  taskInput.className = "edit";
  taskInput.setAttribute("value", taskLabel.textContent);

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
