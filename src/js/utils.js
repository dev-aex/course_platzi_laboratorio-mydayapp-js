const MAIN_SECTION = document.querySelector(".main");
const FOOTER_SECTION = document.querySelector(".footer");

export function cleanUI() {
  MAIN_SECTION.classList.add("hidden");
  FOOTER_SECTION.classList.add("hidden");
}

export function showUI() {
  MAIN_SECTION.classList.remove("hidden");
  FOOTER_SECTION.classList.remove("hidden");
}
