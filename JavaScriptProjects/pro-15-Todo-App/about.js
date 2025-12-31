const display = document.getElementById("display");
const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  let inputValue = userInput.value.trim();

  if (inputValue === "") {
    // এখানে alert() এর বদলে Swal.fire ব্যবহার করুন
    Swal.fire({
      title: "Error!",
      text: "Wrong input! Please write something.",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6", // আপনি চাইলে বাটনের কালারও দিতে পারেন
    });
    return;
  }

  userInput.value = "";
  const li = document.createElement("li");
  li.textContent = inputValue;
  display.append(li);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px"; // একটু গ্যাপ দেওয়ার জন্য

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.append(deleteBtn);
});
