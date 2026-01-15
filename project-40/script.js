const h1 = document.querySelector("h1");
const increase = document.querySelector("#in");
const decrease = document.querySelector("#de");

increase.addEventListener("click", () => {
  const value = parseInt(h1.innerHTML);
  h1.innerHTML = value + 1;
});

decrease.addEventListener("click", () => {
  const value = parseInt(h1.innerHTML);
  h1.innerHTML = value - 1;
});
