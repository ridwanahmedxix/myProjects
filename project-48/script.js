// script.js

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Mobile Hamburger Menu Toggle ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Toggle icon between bars and times (close)
    if (navLinks.classList.contains("active")) {
      hamburger.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Close mobile menu when a link is clicked
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // --- 2. Sticky Navbar ---
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // --- 3. Dynamic Notice Board ---
  const notices = [
    {
      date: "October 15, 2024",
      title: "HSC 1st Year Admission Notice 2024-2025",
      desc: "Admission for HSC 1st year Science, Arts, and Commerce groups is now open. Check the prospectus for required documents.",
    },
    {
      date: "October 10, 2024",
      title: "Upcoming Pre-Test Examinations",
      desc: "The pre-test exams for HSC 2nd year will commence from November 1st. Routine is attached in the student portal.",
    },
    {
      date: "September 28, 2024",
      title: "College Sports Week Registration",
      desc: "Students interested in participating in the annual sports week must register with the physical education instructor by Friday.",
    },
  ];

  const noticeContainer = document.getElementById("notice-list");

  // Generate notice HTML dynamically
  notices.forEach((notice) => {
    const noticeEl = document.createElement("div");
    noticeEl.classList.add("notice-item");
    noticeEl.innerHTML = `
            <span class="notice-date">${notice.date}</span>
            <h3 class="notice-title">${notice.title}</h3>
            <p>${notice.desc}</p>
        `;
    noticeContainer.appendChild(noticeEl);
  });

  // --- 4. Scroll to Top Button ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // --- 5. Contact Form Validation ---
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation logic
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      formStatus.style.display = "block";
      formStatus.style.color = "#ffb300";
      formStatus.textContent = "Please fill out all fields.";
      return;
    }

    // Simulate successful submission
    formStatus.style.display = "block";
    formStatus.style.color = "white";
    formStatus.textContent =
      "Thank you! Your message has been sent successfully.";

    // Reset form
    contactForm.reset();

    // Hide success message after 4 seconds
    setTimeout(() => {
      formStatus.style.display = "none";
    }, 4000);
  });
});
