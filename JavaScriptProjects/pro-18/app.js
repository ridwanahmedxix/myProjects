const input = document.getElementById("terminalInput");

input.addEventListener("contextmenu", async (e) => {
  e.preventDefault(); // default right-click menu বন্ধ

  try {
    const text = await navigator.clipboard.readText();
    input.value += text; // paste
  } catch (err) {
    alert("Clipboard access blocked!");
  }
});
