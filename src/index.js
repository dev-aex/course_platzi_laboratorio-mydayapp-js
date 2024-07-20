import "./css/base.css";

import { newTodo, showTaskLocalStorage } from "./js/new-todo.js";
import { cleanUI } from "./js/utils.js";
import { countingPendingTask } from "./js/filter.js";

document.addEventListener("DOMContentLoaded", () => {
  cleanUI();
  newTodo();
  showTaskLocalStorage();
  countingPendingTask();
});
