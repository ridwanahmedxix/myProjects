// Loader
window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader").classList.add("hidden"),
    400,
  );
});

// Video IDs
const videoIds = [
  "y2tEPmwWEiI",
  "K5KAc5CoCuk",
  "TUVcZfQe-Kw",
  "oEnfMi6XIdA",
  "o7c5LxzmZvs",
  "wdo06KHFDVA",
];
const titles = [
  "Midnight Echo",
  "Starlight Dreams",
  "Neon Soul",
  "Eternal Flame",
  "Velvet Sky",
  "Cosmic Love",
];

function createVideoCard(id, title) {
  return `
    <div class="video-card reveal" data-id="${id}">
      <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="${title}" loading="lazy">
      <div class="play-btn"></div>
    </div>`;
}

document.getElementById("musicGrid").innerHTML = videoIds
  .map((id, i) => createVideoCard(id, titles[i]))
  .join("");
document.getElementById("videosGrid").innerHTML = videoIds
  .slice()
  .reverse()
  .map((id, i) => createVideoCard(id, titles[i]))
  .join("");

// Click to load iframe
document.addEventListener("click", (e) => {
  const card = e.target.closest(".video-card");
  if (!card || card.querySelector("iframe")) return;
  const id = card.dataset.id;
  card.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
});

// Gallery
const galleryGrid = document.getElementById("galleryGrid");
for (let i = 3; i <= 8; i++) {
  galleryGrid.innerHTML += `<div class="gallery-item reveal"><img src="./img/p-${i}.jpg" alt="Gallery ${i}" loading="lazy"></div>`;
}

// Tour
const tourDates = [
  {
    day: "15",
    month: "Mar",
    city: "New York, USA",
    venue: "Madison Square Garden",
  },
  { day: "22", month: "Mar", city: "London, UK", venue: "The O2 Arena" },
  { day: "04", month: "Apr", city: "Tokyo, Japan", venue: "Tokyo Dome" },
  {
    day: "18",
    month: "Apr",
    city: "Paris, France",
    venue: "AccorHotels Arena",
  },
  { day: "09", month: "May", city: "Sydney, AUS", venue: "Qudos Bank Arena" },
];
document.getElementById("tourList").innerHTML = tourDates
  .map(
    (t) => `
  <div class="tour-card reveal">
    <div class="tour-date"><span class="day">${t.day}</span><span class="month">${t.month}</span></div>
    <div class="tour-info"><h4>${t.city}</h4><p>${t.venue}</p></div>
    <a href="#" class="tour-btn">Get Tickets</a>
  </div>`,
  )
  .join("");

// Navbar
const navbar = document.getElementById("navbar");
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);

  // Active link
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
  });
});

// Hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }),
);

// Scroll top
scrollTopBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("active");
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Form
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector(".submit-btn");
  btn.textContent = "✓ Message Sent!";
  btn.style.background = "linear-gradient(135deg, #10b981, #22d3ee)";
  e.target.reset();
  setTimeout(() => {
    btn.textContent = "Send Message ✨";
    btn.style.background = "";
  }, 3000);
});
