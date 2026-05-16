// ==================== GUN DATA ====================
const gunsData = [
  {
    id: 1,
    name: "AK47",
    category: "AR",
    damage: 48,
    range: 75,
    accuracy: 55,
    mobility: 68,
    fireRate: 72,
    magazine: 30,
    image: "img/AK47.jpg",
  },
  {
    id: 2,
    name: "MP40",
    category: "SMG",
    damage: 35,
    range: 45,
    accuracy: 65,
    mobility: 85,
    fireRate: 88,
    magazine: 20,
    image: "img/MP40.jpg",
  },
  {
    id: 3,
    name: "M1887",
    category: "Shotgun",
    damage: 92,
    range: 35,
    accuracy: 42,
    mobility: 52,
    fireRate: 28,
    magazine: 2,
    image: "img/M1887.jpg",
  },
  {
    id: 4,
    name: "UMP",
    category: "SMG",
    damage: 38,
    range: 50,
    accuracy: 70,
    mobility: 82,
    fireRate: 85,
    magazine: 25,
    image: "img/UMP.jpg",
  },
  {
    id: 5,
    name: "Groza",
    category: "AR",
    damage: 56,
    range: 68,
    accuracy: 60,
    mobility: 62,
    fireRate: 68,
    magazine: 30,
    image: "img/Groza.jpg",
  },
  {
    id: 6,
    name: "AWM",
    category: "Sniper",
    damage: 95,
    range: 98,
    accuracy: 85,
    mobility: 35,
    fireRate: 35,
    magazine: 6,
    image: "img/AWM.jpg",
  },
  {
    id: 7,
    name: "Desert Eagle",
    category: "Pistol",
    damage: 62,
    range: 65,
    accuracy: 55,
    mobility: 88,
    fireRate: 45,
    magazine: 7,
    image: "img/DesertEagle.jpg",
  },
  {
    id: 8,
    name: "SCAR",
    category: "AR",
    damage: 52,
    range: 72,
    accuracy: 62,
    mobility: 65,
    fireRate: 70,
    magazine: 30,
    image: "img/SCAR.jpg",
  },
  {
    id: 9,
    name: "XM8",
    category: "AR",
    damage: 45,
    range: 70,
    accuracy: 75,
    mobility: 70,
    fireRate: 75,
    magazine: 30,
    image: "img/XM8.jpg",
  },
  {
    id: 10,
    name: "FAMAS",
    category: "AR",
    damage: 46,
    range: 68,
    accuracy: 72,
    mobility: 72,
    fireRate: 78,
    magazine: 25,
    image: "img/FAMAS.jpg",
  },
  {
    id: 11,
    name: "M4A1",
    category: "AR",
    damage: 50,
    range: 75,
    accuracy: 70,
    mobility: 75,
    fireRate: 72,
    magazine: 30,
    image: "img/M4A1.jpg",
  },
  {
    id: 12,
    name: "Thompson",
    category: "SMG",
    damage: 40,
    range: 48,
    accuracy: 68,
    mobility: 78,
    fireRate: 82,
    magazine: 30,
    image: "img/Thompson.jpg",
  },
  {
    id: 13,
    name: "AUG",
    category: "AR",
    damage: 48,
    range: 72,
    accuracy: 68,
    mobility: 68,
    fireRate: 75,
    magazine: 30,
    image: "img/AUG.jpg",
  },
  {
    id: 14,
    name: "P90",
    category: "SMG",
    damage: 36,
    range: 52,
    accuracy: 75,
    mobility: 88,
    fireRate: 92,
    magazine: 50,
    image: "img/P90.jpg",
  },
  {
    id: 15,
    name: "AN94",
    category: "AR",
    damage: 54,
    range: 70,
    accuracy: 65,
    mobility: 63,
    fireRate: 68,
    magazine: 30,
    image: "img/AN94.jpg",
  },
  {
    id: 16,
    name: "Woodpecker",
    category: "LMG",
    damage: 65,
    range: 75,
    accuracy: 55,
    mobility: 45,
    fireRate: 62,
    magazine: 100,
    image: "img/Woodpecker.jpg",
  },
  {
    id: 17,
    name: "AC80",
    category: "LMG",
    damage: 62,
    range: 78,
    accuracy: 58,
    mobility: 48,
    fireRate: 65,
    magazine: 80,
    image: "img/AC80.jpg",
  },
  {
    id: 18,
    name: "Charge Buster",
    category: "Sniper",
    damage: 88,
    range: 95,
    accuracy: 80,
    mobility: 40,
    fireRate: 40,
    magazine: 8,
    image: "img/ChargeBuster.jpg",
  },
  {
    id: 19,
    name: "MAG-7",
    category: "Shotgun",
    damage: 85,
    range: 40,
    accuracy: 45,
    mobility: 55,
    fireRate: 32,
    magazine: 8,
    image: "img/MAG-7.jpg",
  },
  {
    id: 20,
    name: "M1014",
    category: "Shotgun",
    damage: 80,
    range: 42,
    accuracy: 48,
    mobility: 58,
    fireRate: 38,
    magazine: 8,
    image: "img/M1014.jpg",
  },
];

// ==================== STATE MANAGEMENT ====================
let currentFilter = "all";
let currentSort = "default";
let currentGunId = null;
let ratings = JSON.parse(localStorage.getItem("gunRatings")) || {};
let comments = JSON.parse(localStorage.getItem("gunComments")) || {};
let ratedGuns = 0;

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  loadAllData();
  renderGuns(gunsData);
  updateStats();
  updateLeaderboard();
});

// ==================== RENDERING FUNCTIONS ====================
function renderGuns(guns) {
  const gunsGrid = document.getElementById("gunsGrid");
  const noResults = document.getElementById("noResults");

  gunsGrid.innerHTML = "";

  if (guns.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  guns.forEach((gun, index) => {
    const avgRating = getAverageRating(gun.id);
    const ratingCount = getRatingCount(gun.id);
    const starDisplay = generateStarDisplay(avgRating);

    const card = document.createElement("div");
    card.className = "gun-card";
    card.style.animationDelay = `${index * 0.05}s`;
    card.innerHTML = `
            <div class="gun-image-container">
                <img src="${gun.image}" alt="${gun.name}" class="gun-image" onerror="this.style.backgroundColor='#1a1f3a'">
                <span class="gun-category-badge">${gun.category}</span>
            </div>
            <div class="gun-card-content">
                <h3 class="gun-name">${gun.name}</h3>
                <p class="gun-category">${getCategoryName(gun.category)}</p>
                <div class="gun-rating">
                    <div class="gun-stars">${starDisplay}</div>
                    <div class="gun-rating-text">
                        <span class="gun-rating-number">${avgRating.toFixed(1)}</span>
                    </div>
                </div>
                <p class="gun-votes">${ratingCount} ${ratingCount === 1 ? "vote" : "votes"}</p>
                <button class="gun-view-btn" onclick="openModal(${gun.id})">View Details</button>
            </div>
        `;
    gunsGrid.appendChild(card);
  });
}

function generateStarDisplay(rating) {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += '<span class="star">★</span>';
    } else if (i === fullStars && hasHalfStar) {
      stars += '<span class="star">★</span>';
    } else {
      stars += '<span class="star empty">★</span>';
    }
  }

  return stars;
}

function updateLeaderboard() {
  const sorted = gunsData.slice().sort((a, b) => {
    const avgA = getAverageRating(a.id);
    const avgB = getAverageRating(b.id);
    return avgB - avgA;
  });

  // Update podium
  updatePodium(sorted);

  // Update full leaderboard
  const leaderboardFull = document.getElementById("leaderboardFull");
  leaderboardFull.innerHTML = "";

  sorted.forEach((gun, index) => {
    const avgRating = getAverageRating(gun.id);
    const starDisplay = generateStarDisplay(avgRating);

    const item = document.createElement("div");
    item.className = "leaderboard-item";
    item.style.animationDelay = `${index * 0.05}s`;
    item.innerHTML = `
            <div class="leaderboard-rank">#${index + 1}</div>
            <img src="${gun.image}" alt="${gun.name}" class="leaderboard-image" onerror="this.style.backgroundColor='#1a1f3a'">
            <div class="leaderboard-info">
                <div class="leaderboard-name">${gun.name}</div>
                <div class="leaderboard-rating">${starDisplay}</div>
                <div class="leaderboard-votes">${avgRating.toFixed(1)} • ${getRatingCount(gun.id)} votes</div>
            </div>
        `;
    leaderboardFull.appendChild(item);
  });
}

function updatePodium(sorted) {
  const positions = [1, 2, 3];

  positions.forEach((pos, idx) => {
    const gun = sorted[idx];
    const podiumEl = document.getElementById(`podium-${pos}`);

    if (gun) {
      const avgRating = getAverageRating(gun.id);
      const podiumImage = podiumEl.querySelector(".podium-image");
      const podiumName = podiumEl.querySelector(".podium-name");
      const podiumRating = podiumEl.querySelector(".podium-rating");

      podiumImage.src = gun.image;
      podiumImage.onerror = function () {
        this.style.backgroundColor = "#1a1f3a";
      };
      podiumName.textContent = gun.name;
      podiumRating.textContent = `${avgRating.toFixed(1)} ⭐`;
    }
  });
}

// ==================== MODAL FUNCTIONS ====================
function openModal(gunId) {
  currentGunId = gunId;
  const gun = gunsData.find((g) => g.id === gunId);

  if (!gun) return;

  const modal = document.getElementById("gunModal");

  // Update gun info
  document.getElementById("modalGunName").textContent = gun.name;
  document.getElementById("modalGunCategory").textContent = getCategoryName(
    gun.category,
  );
  document.getElementById("modalGunImage").src = gun.image;
  document.getElementById("modalGunImage").onerror = function () {
    this.style.backgroundColor = "#1a1f3a";
  };

  // Update stats
  updateModalStats(gun);

  // Update rating display
  updateRatingDisplay(gunId);

  // Load comments
  loadComments(gunId);

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("gunModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  currentGunId = null;
}

function updateModalStats(gun) {
  const stats = [
    { id: "Damage", value: gun.damage },
    { id: "Range", value: gun.range },
    { id: "Accuracy", value: gun.accuracy },
    { id: "Mobility", value: gun.mobility },
    { id: "FireRate", value: gun.fireRate },
    { id: "Magazine", value: gun.magazine },
  ];

  const maxValues = {
    Damage: 100,
    Range: 100,
    Accuracy: 100,
    Mobility: 100,
    FireRate: 100,
    Magazine: 150,
  };

  stats.forEach((stat) => {
    const percent = (stat.value / maxValues[stat.id]) * 100;
    document.getElementById(`stat${stat.id}`).style.width = percent + "%";
    document.getElementById(`stat${stat.id}Value`).textContent = stat.value;
  });
}

function updateRatingDisplay(gunId) {
  const avgRating = getAverageRating(gunId);
  const ratingCount = getRatingCount(gunId);
  const starDisplay = generateStarDisplay(avgRating);

  document.getElementById("avgRating").textContent = avgRating.toFixed(1);
  document.getElementById("displayStars").innerHTML = starDisplay;
  document.getElementById("ratingStats").textContent =
    `${ratingCount} ${ratingCount === 1 ? "vote" : "votes"}`;
}

// ==================== RATING FUNCTIONS ====================
function setRating(value) {
  if (!currentGunId) return;

  const key = `gun_${currentGunId}`;
  if (!ratings[key]) {
    ratings[key] = [];
  }

  // Check if user already rated
  const userKey = `user_${currentGunId}`;
  let userRated = localStorage.getItem(userKey);

  if (userRated) {
    // Update existing rating
    const index = ratings[key].length - 1;
    ratings[key][index] = value;
  } else {
    // Add new rating
    ratings[key].push(value);
    localStorage.setItem(userKey, "true");
  }

  saveRatings();
  updateRatingDisplay(currentGunId);
  updateLeaderboard();
  updateStats();

  const feedback = ["Poor", "Below Average", "Good", "Very Good", "Excellent"];
  document.getElementById("ratingFeedback").textContent =
    `You rated: ${feedback[value - 1]} ✓`;

  // Update star colors
  document.querySelectorAll("#interactiveStars .star").forEach((star, idx) => {
    if (idx < value) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function getAverageRating(gunId) {
  const key = `gun_${gunId}`;
  const ratings_list = ratings[key];

  if (!ratings_list || ratings_list.length === 0) return 0;

  const sum = ratings_list.reduce((a, b) => a + b, 0);
  return sum / ratings_list.length;
}

function getRatingCount(gunId) {
  const key = `gun_${gunId}`;
  return ratings[key] ? ratings[key].length : 0;
}

function saveRatings() {
  localStorage.setItem("gunRatings", JSON.stringify(ratings));
}

// ==================== COMMENT FUNCTIONS ====================
function addComment() {
  if (!currentGunId) return;

  const username = document.getElementById("commentUsername").value.trim();
  const text = document.getElementById("commentText").value.trim();

  if (!username || !text) {
    alert("Please fill in all fields");
    return;
  }

  const key = `gun_${currentGunId}`;
  if (!comments[key]) {
    comments[key] = [];
  }

  const comment = {
    id: Date.now(),
    username,
    text,
    timestamp: new Date().toLocaleString(),
  };

  comments[key].unshift(comment);
  localStorage.setItem("gunComments", JSON.stringify(comments));

  document.getElementById("commentUsername").value = "";
  document.getElementById("commentText").value = "";

  loadComments(currentGunId);
}

function loadComments(gunId) {
  const key = `gun_${gunId}`;
  const commentsList = document.getElementById("commentsList");
  const gunComments = comments[key] || [];

  commentsList.innerHTML = "";

  if (gunComments.length === 0) {
    commentsList.innerHTML =
      '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No reviews yet. Be the first to review!</p>';
    return;
  }

  gunComments.slice(0, 10).forEach((comment, index) => {
    const item = document.createElement("div");
    item.className = "comment-item";
    item.style.animationDelay = `${index * 0.05}s`;
    item.innerHTML = `
            <div class="comment-header">
                <span class="comment-username">🎮 ${escapeHtml(comment.username)}</span>
                <span class="comment-time">${comment.timestamp}</span>
            </div>
            <p class="comment-text">${escapeHtml(comment.text)}</p>
        `;
    commentsList.appendChild(item);
  });
}

// ==================== FILTER & SORT FUNCTIONS ====================
function filterByCategory(category) {
  currentFilter = category;
  updateActiveFilterButton(category);
  applyFiltersAndSort();
}

function sortGuns(sortType) {
  currentSort = sortType;
  updateActiveSortButton(sortType);
  applyFiltersAndSort();
}

function updateActiveFilterButton(category) {
  document
    .querySelectorAll(".filter-buttons")[0]
    .querySelectorAll(".filter-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });

  event.target.classList.add("active");
}

function updateActiveSortButton(sortType) {
  document
    .querySelectorAll(".filter-buttons")[1]
    .querySelectorAll(".filter-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });

  event.target.classList.add("active");
}

function applyFiltersAndSort() {
  let filtered = gunsData;

  // Apply filter
  if (currentFilter !== "all") {
    filtered = filtered.filter((gun) => gun.category === currentFilter);
  }

  // Apply sort
  filtered = filtered.slice();

  switch (currentSort) {
    case "rating":
      filtered.sort((a, b) => getAverageRating(b.id) - getAverageRating(a.id));
      break;
    case "votes":
      filtered.sort((a, b) => getRatingCount(b.id) - getRatingCount(a.id));
      break;
    case "damage":
      filtered.sort((a, b) => b.damage - a.damage);
      break;
    default:
      // Keep original order
      break;
  }

  renderGuns(filtered);
}

// ==================== SEARCH FUNCTION ====================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === "") {
      applyFiltersAndSort();
      return;
    }

    const filtered = gunsData.filter(
      (gun) =>
        gun.name.toLowerCase().includes(query) ||
        gun.category.toLowerCase().includes(query),
    );

    renderGuns(filtered);
  });
});

// ==================== SCROLL FUNCTIONS ====================
function scrollToGuns() {
  document.getElementById("gunsSection").scrollIntoView({ behavior: "smooth" });
}

function scrollToLeaderboard() {
  document
    .getElementById("leaderboardSection")
    .scrollIntoView({ behavior: "smooth" });
}

// ==================== UTILITY FUNCTIONS ====================
function getCategoryName(category) {
  const names = {
    AR: "Assault Rifle",
    SMG: "Submachine Gun",
    Sniper: "Sniper Rifle",
    Shotgun: "Shotgun",
    LMG: "Light Machine Gun",
    Pistol: "Pistol",
  };
  return names[category] || category;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function updateStats() {
  ratedGuns = Object.keys(ratings).filter(
    (key) => ratings[key].length > 0,
  ).length;
  document.getElementById("totalGuns").textContent = gunsData.length;
  document.getElementById("ratedGuns").textContent = ratedGuns;
}

function loadAllData() {
  const savedRatings = localStorage.getItem("gunRatings");
  const savedComments = localStorage.getItem("gunComments");

  if (savedRatings) {
    ratings = JSON.parse(savedRatings);
  }

  if (savedComments) {
    comments = JSON.parse(savedComments);
  }
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && currentGunId) {
    closeModal();
  }
});

// ==================== CLICK OUTSIDE MODAL ====================
document.getElementById("gunModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("gunModal")) {
    closeModal();
  }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => imageObserver.observe(img));
}

// ==================== SMOOTH ANIMATIONS ====================
// Add animation to cards on page load
window.addEventListener("load", () => {
  document.querySelectorAll(".gun-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
  });
});

// ==================== RESPONSIVE MODAL ====================
window.addEventListener("resize", () => {
  const modal = document.getElementById("gunModal");
  if (modal.classList.contains("active")) {
    // Keep modal centered on resize
    modal.style.display = "flex";
  }
});

// ==================== STAR HOVER EFFECT ====================
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#interactiveStars .star");

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      stars.forEach((s, i) => {
        if (i <= index) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });
  });
});

// ==================== AUTO-SAVE FEATURE ====================
setInterval(() => {
  localStorage.setItem("gunRatings", JSON.stringify(ratings));
  localStorage.setItem("gunComments", JSON.stringify(comments));
}, 30000); // Auto-save every 30 seconds

console.log("✓ Gun Rating Platform Loaded Successfully");
console.log("✓ Total Guns:", gunsData.length);
console.log("✓ LocalStorage Enabled");
console.log("✓ All Systems Operational");
