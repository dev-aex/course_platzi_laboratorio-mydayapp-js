import "./css/base.css";

import { newTodo, showTaskLocalStorage } from "./js/new-todo.js";
import { cleanUI } from "./js/utils.js";
import {
  countingPendingTask,
  cleanCompletedTask,
  completedTasks,
  pendingTasks,
  allTasks,
} from "./js/filter.js";

const CLEAN_COMPLETED_TASKS = document.querySelector(".clear-completed");
const SHOW_PENDING_TASKS = document.querySelector('a[href="#/pending"]');
const SHOW_COMPLETED_TASKS = document.querySelector('a[href="#/completed"]');
const SHOW_ALL_TASKS = document.querySelector('a[href="#/"]');

document.addEventListener("DOMContentLoaded", () => {
  cleanUI();
  newTodo();
  showTaskLocalStorage();
  countingPendingTask();
  CLEAN_COMPLETED_TASKS.addEventListener("click", () => {
    cleanCompletedTask();
    allTasks();
    SHOW_ALL_TASKS.className = "selected";
    SHOW_COMPLETED_TASKS.classList.remove("selected");
    SHOW_PENDING_TASKS.classList.remove("selected");
  });
  SHOW_COMPLETED_TASKS.addEventListener("click", () => {
    completedTasks();
    SHOW_COMPLETED_TASKS.className = "selected";
    SHOW_PENDING_TASKS.classList.remove("selected");
    SHOW_ALL_TASKS.classList.remove("selected");
  });
  SHOW_PENDING_TASKS.addEventListener("click", () => {
    pendingTasks();
    SHOW_PENDING_TASKS.className = "selected";
    SHOW_COMPLETED_TASKS.classList.remove("selected");
    SHOW_ALL_TASKS.classList.remove("selected");
  });
  SHOW_ALL_TASKS.addEventListener("click", () => {
    allTasks();
    SHOW_ALL_TASKS.className = "selected";
    SHOW_COMPLETED_TASKS.classList.remove("selected");
    SHOW_PENDING_TASKS.classList.remove("selected");
  });
});
