/**
 * LifeDrop - Premium Blood Finder Application
 * Architecture: Modular Vanilla JS + LocalStorage Database
 */

// ==========================================================================
// 1. DATABASE & STATE MANAGEMENT (LocalStorage)
// ==========================================================================
const db = {
  init() {
    // Seed initial data if database is empty to provide a real-world feel
    if (!localStorage.getItem("lifedrop_donors")) {
      localStorage.setItem("lifedrop_donors", JSON.stringify(this.seedDonors));
    }
    if (!localStorage.getItem("lifedrop_emergencies")) {
      localStorage.setItem(
        "lifedrop_emergencies",
        JSON.stringify(this.seedEmergencies),
      );
    }
  },
  getDonors() {
    return JSON.parse(localStorage.getItem("lifedrop_donors")) || [];
  },
  addDonor(donor) {
    const donors = this.getDonors();
    donors.unshift({ id: Date.now().toString(), ...donor });
    localStorage.setItem("lifedrop_donors", JSON.stringify(donors));
  },
  getEmergencies() {
    return JSON.parse(localStorage.getItem("lifedrop_emergencies")) || [];
  },
  addEmergency(req) {
    const emergencies = this.getEmergencies();
    emergencies.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...req,
    });
    localStorage.setItem("lifedrop_emergencies", JSON.stringify(emergencies));
  },

  // Realistic Mock Data
  seedDonors: [
    {
      id: "1",
      name: "Sarah Jenkins",
      group: "O-",
      phone: "+1 234-567-8901",
      city: "New York",
      lastDonation: "2023-11-15",
      available: true,
      gender: "F",
    },
    {
      id: "2",
      name: "Michael Chen",
      group: "A+",
      phone: "+1 234-567-8902",
      city: "San Francisco",
      lastDonation: "2023-08-20",
      available: true,
      gender: "M",
    },
    {
      id: "3",
      name: "David Smith",
      group: "B+",
      phone: "+1 234-567-8903",
      city: "Chicago",
      lastDonation: "2024-01-10",
      available: false,
      gender: "M",
    },
    {
      id: "4",
      name: "Emma Watson",
      group: "AB+",
      phone: "+1 234-567-8904",
      city: "New York",
      lastDonation: "",
      available: true,
      gender: "F",
    },
    {
      id: "5",
      name: "James Carter",
      group: "O+",
      phone: "+1 234-567-8905",
      city: "Los Angeles",
      lastDonation: "2023-12-05",
      available: true,
      gender: "M",
    },
    {
      id: "6",
      name: "Sophia Martinez",
      group: "A-",
      phone: "+1 234-567-8906",
      city: "Miami",
      lastDonation: "2024-02-01",
      available: true,
      gender: "F",
    },
  ],
  seedEmergencies: [
    {
      id: "e1",
      hospital: "Mount Sinai Hospital",
      group: "O-",
      urgency: "Critical",
      phone: "911-000-1111",
      city: "New York",
      timestamp: new Date().toISOString(),
    },
    {
      id: "e2",
      hospital: "General Medical Center",
      group: "A+",
      urgency: "High",
      phone: "911-000-2222",
      city: "Chicago",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
};

// ==========================================================================
// 2. UI CONTROLLER (DOM Manipulation & Interactions)
// ==========================================================================
const uiController = {
  init() {
    this.cacheDOM();
    this.bindEvents();
    this.initAnimations();
    this.handleScroll();
    setTimeout(() => this.removeLoader(), 800); // Fake load time for premium feel
  },

  cacheDOM() {
    this.navbar = document.getElementById("navbar");
    this.progressBar = document.querySelector(".scroll-progress");
    this.donorGrid = document.getElementById("donor-grid");
    this.emergencyGrid = document.getElementById("emergency-grid");
    this.bloodGroupGrid = document.getElementById("blood-group-grid");
    this.noResults = document.getElementById("no-results");
    this.resultsCount = document.getElementById("results-count");

    // Forms
    this.donorForm = document.getElementById("donor-form");
    this.emergencyForm = document.getElementById("emergency-form");

    // Filters
    this.filterGroup = document.getElementById("filter-group");
    this.filterLocation = document.getElementById("filter-location");
    this.filterAvailability = document.getElementById("filter-availability");
  },

  bindEvents() {
    // Scroll event for Navbar & Progress Bar
    window.addEventListener("scroll", () => this.handleScroll());

    // Search Filters (Debounced)
    this.filterGroup.addEventListener("change", () => app.renderDonors());
    this.filterLocation.addEventListener(
      "input",
      this.debounce(() => app.renderDonors(), 300),
    );
    this.filterAvailability.addEventListener("change", () =>
      app.renderDonors(),
    );

    // Form Submissions
    this.donorForm.addEventListener("submit", (e) =>
      this.handleDonorRegistration(e),
    );
    this.emergencyForm.addEventListener("submit", (e) =>
      this.handleEmergencyRequest(e),
    );
  },

  handleScroll() {
    // Navbar blur effect
    if (window.scrollY > 50) {
      this.navbar.classList.add("scrolled");
    } else {
      this.navbar.classList.remove("scrolled");
    }

    // Scroll Progress
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    this.progressBar.style.width = scrolled + "%";
  },

  removeLoader() {
    const loader = document.getElementById("page-loader");
    loader.style.opacity = "0";
    setTimeout(() => (loader.style.display = "none"), 500);
  },

  // Form Handlers
  handleDonorRegistration(e) {
    e.preventDefault();
    const newDonor = {
      name: document.getElementById("reg-name").value,
      group: document.getElementById("reg-group").value,
      phone: document.getElementById("reg-phone").value,
      city: document.getElementById("reg-city").value,
      lastDonation: document.getElementById("reg-date").value,
      available: true,
      gender: "U", // Unspecified in short form
    };

    db.addDonor(newDonor);
    this.donorForm.reset();
    this.showToast(
      "Registration successful! Thank you for joining.",
      "success",
    );
    app.refreshAll();

    // Scroll to search
    document
      .getElementById("search-section")
      .scrollIntoView({ behavior: "smooth" });
  },

  handleEmergencyRequest(e) {
    e.preventDefault();
    const newReq = {
      hospital: document.getElementById("em-hospital").value,
      group: document.getElementById("em-group").value,
      urgency: document.getElementById("em-urgency").value,
      phone: document.getElementById("em-phone").value,
      city: document.getElementById("em-city").value,
    };

    db.addEmergency(newReq);
    this.emergencyForm.reset();
    this.closeModal("emergencyModal");
    this.showToast("Emergency request broadcasted successfully.", "error"); // Red theme for urgent
    app.renderEmergencies();
  },

  // Utilities
  openModal(id) {
    document.getElementById(id).classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeModal(id) {
    document.getElementById(id).classList.remove("active");
    document.body.style.overflow = "auto";
  },

  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icon =
      type === "success" ? "fa-check-circle" : "fa-circle-exclamation";
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Animations (Intersection Observer & Counters)
  initAnimations() {
    // Reveal elements on scroll
    const reveals = document.querySelectorAll(".reveal-up, .reveal-fade");
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");

        // If it contains counters, trigger them
        const counters = entry.target.querySelectorAll(".counter");
        counters.forEach((counter) => this.animateCounter(counter));

        observer.unobserve(entry.target);
      });
    }, revealOptions);

    reveals.forEach((el) => revealObserver.observe(el));

    // Initial check for hero section
    setTimeout(() => {
      document
        .querySelectorAll("#hero .reveal-up, #hero .reveal-fade")
        .forEach((el) => el.classList.add("active"));
      document
        .querySelectorAll("#hero .counter")
        .forEach((c) => this.animateCounter(c));
    }, 100);
  },

  animateCounter(counterElement) {
    const target = +counterElement.getAttribute("data-target");
    const duration = 2000; // ms
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counterElement.innerText = Math.ceil(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counterElement.innerText = target.toLocaleString();
      }
    };
    updateCounter();
  },
};

// ==========================================================================
// 3. APPLICATION LOGIC (Rendering & Filtering)
// ==========================================================================
const app = {
  init() {
    db.init();
    uiController.init();
    this.refreshAll();
  },

  refreshAll() {
    this.renderDonors();
    this.renderEmergencies();
    this.renderBloodGroups();
    this.updateDashboardStats();
  },

  // RENDER: Search & Filter Donors
  renderDonors() {
    const donors = db.getDonors();

    // Get filter values
    const fGroup = uiController.filterGroup.value;
    const fLoc = uiController.filterLocation.value.toLowerCase();
    const fAvail = uiController.filterAvailability.value;

    // Apply filters
    const filtered = donors.filter((d) => {
      const matchGroup = fGroup === "All" || d.group === fGroup;
      const matchLoc = !fLoc || d.city.toLowerCase().includes(fLoc);
      const matchAvail =
        fAvail === "All" || (fAvail === "Available" && d.available);
      return matchGroup && matchLoc && matchAvail;
    });

    // Update UI
    uiController.resultsCount.innerText = `Showing ${filtered.length} Donors`;
    uiController.donorGrid.innerHTML = "";

    if (filtered.length === 0) {
      uiController.noResults.classList.remove("hidden");
      return;
    }
    uiController.noResults.classList.add("hidden");

    filtered.forEach((donor) => {
      const initial = donor.name.charAt(0).toUpperCase();
      const availHTML = donor.available
        ? `<span class="badge badge-green"><i class="fa-solid fa-check"></i> Available</span>`
        : `<span class="badge" style="background:#eee"><i class="fa-solid fa-clock"></i> Unavailable</span>`;

      const card = document.createElement("article");
      card.className = "glass-card donor-card";
      card.innerHTML = `
                <div class="donor-card-header">
                    <div class="donor-avatar">${initial}</div>
                    <div class="donor-info">
                        <h4>${donor.name}</h4>
                        ${availHTML}
                    </div>
                    <div class="donor-badge">${donor.group}</div>
                </div>
                <div class="donor-card-body">
                    <div class="donor-detail">
                        <i class="fa-solid fa-location-dot"></i> ${donor.city}
                    </div>
                    <div class="donor-detail">
                        <i class="fa-solid fa-calendar-check"></i> Last Donated: ${donor.lastDonation || "First Timer"}
                    </div>
                </div>
                <div class="donor-card-footer">
                    <button class="btn btn-primary btn-block" onclick="window.location.href='tel:${donor.phone}'">
                        <i class="fa-solid fa-phone"></i> Contact
                    </button>
                </div>
            `;
      uiController.donorGrid.appendChild(card);
    });
  },

  // RENDER: Emergencies
  renderEmergencies() {
    const emergencies = db.getEmergencies();
    uiController.emergencyGrid.innerHTML = "";

    // Show top 3 recent emergencies
    emergencies.slice(0, 3).forEach((req) => {
      // Time formatting logic
      const date = new Date(req.timestamp);
      const timeStr = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(date);

      const card = document.createElement("div");
      card.className = "glass-card emergency-card reveal-up active";
      card.innerHTML = `
                <div class="em-header">
                    <div>
                        <span class="em-urgency urgency-${req.urgency}">${req.urgency} Need</span>
                        <h4 class="mt-2">${req.hospital}</h4>
                    </div>
                    <div class="em-group">${req.group}</div>
                </div>
                <div class="em-details">
                    <p><i class="fa-solid fa-location-dot"></i> ${req.city}</p>
                    <p><i class="fa-solid fa-clock"></i> Posted at ${timeStr}</p>
                </div>
                <button class="btn btn-outline btn-block mt-3" onclick="window.location.href='tel:${req.phone}'">
                    Respond Now
                </button>
            `;
      uiController.emergencyGrid.appendChild(card);
    });
  },

  // RENDER: Blood Groups Overview
  renderBloodGroups() {
    const donors = db.getDonors();
    const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    uiController.bloodGroupGrid.innerHTML = "";

    groups.forEach((g) => {
      const count = donors.filter((d) => d.group === g).length;
      const card = document.createElement("div");
      card.className = "glass-card bg-card reveal-up active";
      // Click to filter
      card.onclick = () => {
        uiController.filterGroup.value = g;
        document
          .getElementById("search-section")
          .scrollIntoView({ behavior: "smooth" });
        this.renderDonors();
      };

      card.innerHTML = `
                <div class="bg-type">${g}</div>
                <div class="bg-count">${count}</div>
                <div class="bg-label">Donors</div>
            `;
      uiController.bloodGroupGrid.appendChild(card);
    });
  },

  // UPDATE: Dynamic Dashboard numbers based on actual DB size
  updateDashboardStats() {
    const donors = db.getDonors();
    const targetElement = document.querySelector(
      ".dash-card:nth-child(1) .counter",
    );
    if (targetElement) {
      // Add a base of 2450 to make it look like a large system, plus our local additions
      targetElement.setAttribute("data-target", 2450 + donors.length - 6);
    }
  },
};

// ==========================================================================
// 4. INITIALIZE APP ON LOAD
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
