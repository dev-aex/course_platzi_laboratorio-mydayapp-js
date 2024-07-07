import "./css/base.css";

import { newTodo, showTaskLocalStorage } from "./js/new-todo.js";
import { cleanUI } from "./js/utils.js";



cleanUI();
newTodo();
showTaskLocalStorage();