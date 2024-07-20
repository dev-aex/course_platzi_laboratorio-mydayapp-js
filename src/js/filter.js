import { taskCounter, deleteTask } from "./new-todo";

let pendingCount;

export function countingPendingTask() {
  pendingCount = 0;

  for (let i = 0; i <= taskCounter; i++) {
    let task = JSON.parse(localStorage.getItem(`task${i}`));
    if (task) {
      if (task.taskStatus == "pending") {
        pendingCount++;
        displayCounting();
      }
    } else {
      displayCounting();
    }
  }
}

function displayCounting() {
  const PENDING_COUNTER = document.querySelector(".todo-count");

  if (pendingCount === 1) {
    PENDING_COUNTER.innerHTML = `
    <strong>${pendingCount}</strong> item left
  `;
  } else {
    PENDING_COUNTER.innerHTML = `
    <strong>${pendingCount}</strong> items left
  `;
  }
}

export function cleanCompletedTask() {
  const COMPLETED_NODES = document.querySelectorAll(".completed");
  COMPLETED_NODES.forEach((element) => {
    deleteTask(element);
  });
}

export function allTasks() {
  const PENDING_NODES = document.querySelectorAll(".pending");
  const COMPLETED_NODES = document.querySelectorAll(".completed");

  PENDING_NODES.forEach((element) => {
    element.classList.remove("hidden");
  });
  COMPLETED_NODES.forEach((element) => {
    element.classList.remove("hidden");
  });
}

export function pendingTasks() {
  const PENDING_NODES = document.querySelectorAll(".pending");
  const COMPLETED_NODES = document.querySelectorAll(".completed");

  PENDING_NODES.forEach((element) => {
    element.classList.remove("hidden");
  });
  COMPLETED_NODES.forEach((element) => {
    element.classList.add("hidden");
  });
}

export function completedTasks() {
  const PENDING_NODES = document.querySelectorAll(".pending");
  const COMPLETED_NODES = document.querySelectorAll(".completed");

  PENDING_NODES.forEach((element) => {
    element.classList.add("hidden");
  });
  COMPLETED_NODES.forEach((element) => {
    element.classList.remove("hidden");
  });
}
