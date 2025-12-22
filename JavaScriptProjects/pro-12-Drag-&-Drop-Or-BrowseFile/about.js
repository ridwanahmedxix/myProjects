const DragArea = document.querySelector(".appBody"),
  DragText = DragArea.querySelector("h3"),
  button = DragArea.querySelector("button"),
  input = DragArea.querySelector("input");
let MyFile;

button.onclick = () => {
  input.click();
};

// button.addEventListener("click", () => {
//   input.click();
// });

input.addEventListener("change", function () {
  MyFile = this.files[0];
  DragArea.classList.add("active");
});

DragArea.addEventListener("dragover", (event) => {
  event.preventDefault;
  DragArea.classList.add("active");
  DragText.textContent = "Release to Upload File";
});

DragArea.addEventListener("dragleave", () => {
  DragArea.classList.remove("active");
  DragText.textContent = "Drag & Drop";
});
