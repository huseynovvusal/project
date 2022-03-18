const hamburger = document.querySelector(".hamburger");
const ul = document.querySelector("ul");

function toggle() {
  ul.classList.toggle("active");
}

hamburger.addEventListener("click", toggle);
