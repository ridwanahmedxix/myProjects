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

  showMe();
});

DragArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  DragArea.classList.add("active");
  DragText.textContent = "Release to Upload File";
});

DragArea.addEventListener("dragleave", () => {
  DragArea.classList.remove("active");
  DragText.textContent = "Drag & Drop";
});

DragArea.addEventListener("drop", (event) => {
  event.preventDefault();
  MyFile = event.dataTransfer.files[0];

  showMe();
});

function showMe() {
  let fileType = MyFile.type;
  let validEx = ["image/jpeg", "image/jpg", "image/png"];

  if (validEx.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let imgUrl = fileReader.result;
      let img = `    <img src="${imgUrl}" alt="">`;
      DragArea.innerHTML = img;
    };
    fileReader.readAsDataURL(MyFile);
  } else {
    alert("This file is not vaild");
    DragArea.classList.remove("active");
    DragText.textContent = "Drag & Drop";
  }
}
