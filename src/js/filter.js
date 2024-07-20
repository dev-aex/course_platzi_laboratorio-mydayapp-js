import { taskCounter } from "./new-todo";

let pendingCount;

export function countingPendingTask() {
  pendingCount = 0

  for (let i = 0; i <= taskCounter; i++) {
    let task = JSON.parse(localStorage.getItem(`task${i}`));
    if (task) {
      if (task.taskStatus == "pending") {
        pendingCount++
        displayCounting();
      }
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
