// MOBILE MENU
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// MENU FILTER
const buttons = document.querySelectorAll(".menu-filters button");
const cards = document.querySelectorAll(".menu-card");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.category;
    cards.forEach((card) => {
      card.style.display =
        cat === "all" || card.classList.contains(cat) ? "block" : "none";
    });
  });
});

// RESERVATION
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Table Reserved Successfully!");
});
