// === DOM Elements ===
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const voiceBtn = document.getElementById("voice-btn");
const historyTags = document.getElementById("history-tags");
const aiChatSection = document.getElementById("ai-chat");
const queryText = document.getElementById("query-text");
const loadingIndicator = document.getElementById("loading");
const responseContent = document.getElementById("response-content");
const answerText = document.getElementById("answer-text");
const copyBtn = document.getElementById("copy-btn");
const mapSection = document.getElementById("map-section");
const locName = document.getElementById("loc-name");
const locDesc = document.getElementById("loc-desc");
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const imgPreviewContainer = document.getElementById("image-preview-container");
const imgPreview = document.getElementById("image-preview");
const visionText = document.getElementById("vision-text");

// === Map Initialization ===
let map = null;
let marker = null;

function initMap(lat, lng) {
  if (!map) {
    map = L.map("map").setView([lat, lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    marker = L.marker([lat, lng]).addTo(map);
  } else {
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);
  }
}

// === Search & API Mock Logic ===
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  // 1. Update UI and History
  saveToHistory(query);
  aiChatSection.classList.remove("hidden");
  queryText.textContent = query;
  responseContent.classList.add("hidden");
  loadingIndicator.classList.remove("hidden");
  mapSection.classList.add("hidden");

  // 2. Fetch API Data (MOCKED FOR NOW)
  /* 🟢 TO CONNECT OPENAI:
    const aiResponse = await fetch('YOUR_BACKEND_URL/api/chat', {
        method: 'POST',
        body: JSON.stringify({ prompt: query })
    });
    */

  // Simulating API Latency
  setTimeout(() => {
    // Mock Response Data based on keywords
    let mockAnswer =
      "I couldn't find specific coordinates for that, but it sounds like an interesting place!";
    let mockCoords = null;

    if (query.toLowerCase().includes("eiffel")) {
      mockAnswer =
        "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is one of the most recognizable structures in the world.";
      mockCoords = {
        lat: 48.8584,
        lng: 2.2945,
        name: "Eiffel Tower",
        desc: "Paris, France",
      };
    } else if (query.toLowerCase().includes("cox")) {
      mockAnswer =
        "Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach.";
      mockCoords = {
        lat: 21.4272,
        lng: 92.0058,
        name: "Cox's Bazar",
        desc: "Chittagong Division, Bangladesh",
      };
    }

    // 3. Render Results
    loadingIndicator.classList.add("hidden");
    responseContent.classList.remove("hidden");
    answerText.textContent = mockAnswer;

    if (mockCoords) {
      mapSection.classList.remove("hidden");
      locName.textContent = mockCoords.name;
      locDesc.textContent = mockCoords.desc;
      initMap(mockCoords.lat, mockCoords.lng);
      // Fix map rendering issue when unhidden
      setTimeout(() => map.invalidateSize(), 100);
    }
  }, 1500);
}

// === Local Storage History ===
function saveToHistory(query) {
  let history = JSON.parse(localStorage.getItem("geoHistory")) || [];
  if (!history.includes(query)) {
    history.unshift(query);
    if (history.length > 3) history.pop();
    localStorage.setItem("geoHistory", JSON.stringify(history));
    renderHistory();
  }
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem("geoHistory")) || [];
  historyTags.innerHTML = "";
  history.forEach((item) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = item;
    span.onclick = () => {
      searchInput.value = item;
      handleSearch();
    };
    historyTags.appendChild(span);
  });
}
renderHistory();

// === Extras (Voice & Copy) ===
voiceBtn.addEventListener("click", () => {
  alert("Voice search UI triggered! (Requires Web Speech API integration)");
  // To implement: Use window.SpeechRecognition or window.webkitSpeechRecognition
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(answerText.textContent).then(() => {
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
    }, 2000);
  });
});

// === Image Upload & Vision UI ===
dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.background = "rgba(79,70,229,0.2)";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.background = "transparent";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.background = "transparent";
  if (e.dataTransfer.files.length) {
    handleImageUpload(e.dataTransfer.files[0]);
  }
});

fileInput.addEventListener("change", (e) => {
  if (e.target.files.length) handleImageUpload(e.target.files[0]);
});

function handleImageUpload(file) {
  if (!file.type.startsWith("image/"))
    return alert("Please upload an image file.");

  const reader = new FileReader();
  reader.onload = (e) => {
    imgPreview.src = e.target.result;
    imgPreviewContainer.classList.remove("hidden");
    visionText.textContent = "Scanning image...";

    // Mock Vision API Response
    setTimeout(() => {
      visionText.innerHTML =
        "This looks like: <strong>A beautiful landscape</strong><br>Confidence: 85%";
    }, 2000);
  };
  reader.readAsDataURL(file);
}
