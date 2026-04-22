// ===== Loader =====
window.addEventListener("load", () => {
  const l = document.getElementById("loader");
  setTimeout(() => l.classList.add("hide"), 300);
});

// ===== Dynamic Photo Grids =====
const singerGrid = document.getElementById("singerGrid");
const stageGrid = document.getElementById("stageGrid");
const familyGrid = document.getElementById("familyGrid");

// 16 Top Singer Photos
for (let i = 1; i <= 16; i++) {
  singerGrid.insertAdjacentHTML(
    "beforeend",
    `
    <div class="photo-card reveal">
      <img loading="lazy" src="./img/tws-${i}.jpg" alt="Top Singer ${i}">
    </div>
  `,
  );
}

// 6 Stage Photos
for (let i = 1; i <= 6; i++) {
  stageGrid.insertAdjacentHTML(
    "beforeend",
    `
    <div class="photo-card reveal">
      <img loading="lazy" src="./img/st-${i}.jpg" alt="Stage ${i}">
      <div class="overlay">LIVE PERFORMANCE</div>
    </div>
  `,
  );
}

// 3 Family Photos
for (let i = 1; i <= 3; i++) {
  familyGrid.insertAdjacentHTML(
    "beforeend",
    `
    <div class="photo-card warm reveal">
      <img loading="lazy" src="./img/wife-${i}.jpg" alt="Family ${i}">
    </div>
  `,
  );
}

// ===== Navbar scroll =====
const navbar = document.getElementById("navbar");
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
  if (window.scrollY > 400) backTop.classList.add("show");
  else backTop.classList.remove("show");
});

// ===== Hamburger Menu =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ===== Active link on scroll =====
const sections = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  const y = window.scrollY + 120;
  sections.forEach((s) => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      navAs.forEach((a) => a.classList.remove("active"));
      const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
      if (link) link.classList.add("active");
    }
  });
});

// ===== Back to top =====
backTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// ===== Reveal on scroll =====
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ===== Lightbox for images =====
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
document
  .getElementById("lbClose")
  .addEventListener("click", () => lightbox.classList.remove("show"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("show");
});

document.addEventListener("click", (e) => {
  const card = e.target.closest(".photo-card");
  if (card) {
    const img = card.querySelector("img");
    if (img) {
      lbImg.src = img.src;
      lightbox.classList.add("show");
    }
  }
});

// ===== Video Modal =====
const videoModal = document.getElementById("videoModal");
const vmContent = document.getElementById("vmContent");
document.getElementById("vmClose").addEventListener("click", closeVideo);
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) closeVideo();
});
function closeVideo() {
  videoModal.classList.remove("show");
  vmContent.innerHTML = "";
}

// ===== YouTube video cards — build thumbnails =====
document.querySelectorAll('.video-card[data-type="yt"]').forEach((card) => {
  const id = card.dataset.id;
  card.innerHTML = `
    <div class="thumb" style="background-image:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')">
      <div class="play-btn">▶</div>
    </div>`;
  card.addEventListener("click", () => {
    vmContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    videoModal.classList.add("show");
  });
});

// ===== Facebook Video (opens in new tab) =====
document.querySelectorAll('.video-card[data-type="fb"]').forEach((card) => {
  card.addEventListener("click", () => {
    window.open(card.dataset.url, "_blank", "noopener");
  });
});

// ===== ESC key closes modals =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("show");
    closeVideo();
  }
});
