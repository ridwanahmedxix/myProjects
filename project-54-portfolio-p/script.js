/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — script.js
   Vanilla JS · No dependencies
═══════════════════════════════════════════════════════════ */

"use strict";

// ─── Custom Cursor ──────────────────────────────────────────
function initCursor() {
  if (window.innerWidth <= 480) return;
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100,
    mouseY = -100;
  let ringX = -100,
    ringY = -100;
  const ease = 0.12;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const interactables = document.querySelectorAll(
    "a, button, .skill-tag, .project-card, .contact-card",
  );
  interactables.forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });
}

// ─── Scroll Progress ────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  const updateProgress = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total) * 100 + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
}

// ─── Navbar ─────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Scroll shrink
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);

      // Active link
      let current = "";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 100) {
          current = section.getAttribute("id");
        }
      });

      links.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    },
    { passive: true },
  );

  // Hamburger
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close on link click
  links.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

// ─── Theme Toggle ───────────────────────────────────────────
function initTheme() {
  const btn = document.getElementById("themeToggle");
  const stored = localStorage.getItem("portfolio-theme") || "light";
  document.documentElement.setAttribute("data-theme", stored);

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });
}

// ─── Reveal on Scroll ───────────────────────────────────────
function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((el) => observer.observe(el));
}

// ─── Animated Counters ──────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll(".stat-num");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("counted")
        ) {
          entry.target.classList.add("counted");
          const target = parseInt(entry.target.getAttribute("data-target"), 10);
          animateCounter(entry.target, 0, target, 1200);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => observer.observe(c));
}

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  function update(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * (end - start) + start);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = end;
  }
  requestAnimationFrame(update);
}

// ─── Typing Animation ───────────────────────────────────────
function initTyping() {
  const el = document.querySelector(".hero-subtitle span:first-child");
  if (!el) return;

  const texts = [
    "Software Developer",
    "Full Stack Engineer",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];
  let textIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function type() {
    if (paused) return;
    const current = texts[textIdx];

    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 40);
    } else {
      el.textContent = current.substring(0, ++charIdx);
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => {
          paused = false;
          deleting = true;
          type();
        }, 2200);
        return;
      }
      setTimeout(type, 75);
    }
  }

  // Start after hero fade-in
  setTimeout(type, 1400);
}

// ─── Back to Top ────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 500);
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ─── Smooth Scroll for anchor links ─────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ─── Hover glow on project cards ────────────────────────────
function initCardGlow() {
  document
    .querySelectorAll(".project-card, .exp-card, .skill-category")
    .forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      });
    });
}

// ─── Stagger reveal within skills ───────────────────────────
function initSkillStagger() {
  const categories = document.querySelectorAll(".skill-category");
  categories.forEach((cat, i) => {
    cat.style.transitionDelay = (i % 3) * 0.08 + "s";
  });
}

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initScrollProgress();
  initNavbar();
  initTheme();
  initReveal();
  initCounters();
  initTyping();
  initBackToTop();
  initSmoothScroll();
  initCardGlow();
  initSkillStagger();
});
