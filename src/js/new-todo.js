import { showUI, cleanUI } from "./utils.js";
import { countingPendingTask } from "./filter.js";

// Todo list
const TODO_LIST = document.querySelector(".todo-list");

// Task ID counter
export let taskCounter = JSON.parse(localStorage.getItem("taskCounter")) || 0;

localStorage.setItem("mydayapp-js", taskCounter);

// Task factory
const createTask = ({ taskID, taskContent, taskStatus }) => ({
  taskID,
  taskContent,
  taskStatus,
});

// Create task
function newTask(task) {
  taskCounter++;

  // Create factory
  let createNewTask = createTask({
    taskID: `task${taskCounter}`,
    taskContent: task,
    taskStatus: "pending",
  });
  // Save LocalStorage
  saveLocalStorage(createNewTask);
  createTaskElements(createNewTask, task);
}

// Create saved tasks
function reloadTasks(localStorageTask) {
  // Create factory
  let createReloadTask = createTask({
    taskID: localStorageTask.taskID,
    taskContent: localStorageTask.taskContent,
    taskStatus: localStorageTask.taskStatus,
  });
  showUI();
  createTaskElements(createReloadTask, createReloadTask.taskContent);
}

// Task elements creator
function createTaskElements(taskObj, task) {
  let taskList = document.createElement("li");
  taskList.id = taskObj.taskID;
  taskList.className = taskObj.taskStatus;

  let taskContainer = document.createElement("div");
  taskContainer.className = "view";

  let taskCheckbox = document.createElement("input");
  taskCheckbox.className = "toggle";
  taskCheckbox.type = "checkbox";
  if (taskObj.taskStatus === "completed") {
    taskCheckbox.checked = true;
  }
  taskCheckbox.onclick = (e) => {
    let selectedTask = e.target.parentNode.parentNode;
    let selectStorageTask = JSON.parse(
      localStorage.getItem(`${selectedTask.id}`)
    );
    let newStatus = changeStatus(selectStorageTask);
    selectedTask.className = `${newStatus}`;
    updateLocalStorage(selectedTask);
  };

  let taskLabel = document.createElement("label");
  taskLabel.textContent = `${task}`;
  taskLabel.onclick = () => {
    let selectedTask = document.querySelector(`#${taskObj.taskID}`);
    let localStorageTask = JSON.parse(
      localStorage.getItem(`${taskObj.taskID}`)
    );
    editTask(selectedTask, taskInput, localStorageTask, taskLabel);
  };

  let taskInput = document.createElement("input");
  taskInput.className = "edit";
  taskInput.setAttribute("value", taskLabel.textContent);

  let removeBtn = document.createElement("button");
  removeBtn.className = "destroy";
  removeBtn.onclick = (e) => {
    deleteTask(e.target.parentNode.parentNode);
  };

  taskContainer.append(taskCheckbox, taskLabel, removeBtn);
  taskList.append(taskContainer, taskInput);

  TODO_LIST.append(taskList);
}

// Save task
function saveLocalStorage(newtask) {
  localStorage.setItem("taskCounter", JSON.stringify(taskCounter));
  localStorage.setItem(`task${taskCounter}`, JSON.stringify(newtask));
}
// Update Task
function updateLocalStorage(task) {
  let taskContent = task.querySelector(".edit");
  let updateTask = JSON.parse(localStorage.getItem(`${task.id}`));
  updateTask.taskStatus = task.className;
  updateTask.taskContent = taskContent.value;

  localStorage.setItem(`${task.id}`, `${JSON.stringify(updateTask)}`);
  countingPendingTask();
}

// Change status task
function changeStatus(taskObj) {
  return taskObj.taskStatus == "pending" ? "completed" : "pending";
}
// Delete tasks
export function deleteTask(parentNode) {
  localStorage.removeItem(`${parentNode.id}`);
  parentNode.remove();

  if (TODO_LIST.childElementCount === 0) {
    cleanUI();
  }
  countingPendingTask();
}

// Edit task
function editTask(task, editInput, taskObj, taskInput) {
  let allChildNodes = TODO_LIST.querySelectorAll(".editing");
  if (!allChildNodes.length > 0) {
    if (task.className !== "completed") {
      task.className = "editing";
      editInput.focus();
      editInput.selectionStart = editInput.selectionEnd =
        editInput.value.length;

      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          editInput.setAttribute("value", editInput.value);
          taskObj.taskContent = editInput.value;
          taskInput.textContent = taskObj.taskContent;
          task.className = "pending";
          taskObj.taskStatus = "pending";
          localStorage.setItem(`${taskObj.taskID}`, JSON.stringify(taskObj));
        }
      });
      editInput.addEventListener("blur", () => {
        editInput.setAttribute("value", editInput.value);
        taskObj.taskContent = editInput.value;
        taskInput.textContent = taskObj.taskContent;
        task.className = "pending";
        taskObj.taskStatus = "pending";
        localStorage.setItem(`${taskObj.taskID}`, JSON.stringify(taskObj));
      });
    }
  }
}

/* Exports */

// New task
export function newTodo() {
  const NEW_TODO_INPUT = document.querySelector(".new-todo");

  NEW_TODO_INPUT.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      showUI();
      if (NEW_TODO_INPUT.value !== "") {
        newTask(NEW_TODO_INPUT.value.trim());
        countingPendingTask();
      }
      NEW_TODO_INPUT.value = "";
    }
  });
}

// Load saved tasks
export function showTaskLocalStorage() {
  for (let i = 1; i <= taskCounter; i++) {
    let task = JSON.parse(localStorage.getItem(`task${i}`));
    if (task) reloadTasks(task);
  }
}
