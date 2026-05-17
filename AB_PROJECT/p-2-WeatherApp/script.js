/* =========================================================================
   PREMIUM WEATHER APP LOGIC
   Uses OpenWeatherMap API (Free Tier Geocoding & 5-Day/3-Hour Forecast)
   ========================================================================= */

// ⚠️ REPLACE THIS WITH YOUR FREE OPENWEATHERMAP API KEY
// Get one at: https://openweathermap.org/api
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

// App State
const state = {
  city: "New York",
  lat: 40.7128,
  lon: -74.006,
  units: localStorage.getItem("units") || "metric", // 'metric' or 'imperial'
  theme: localStorage.getItem("theme") || "dark",
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  recentSearches: JSON.parse(localStorage.getItem("recentSearches")) || [],
};

// DOM Elements cache
const DOM = {
  searchInp: document.getElementById("search-input"),
  searchDropdown: document.getElementById("search-dropdown"),
  favList: document.getElementById("favorites-list"),
  recentList: document.getElementById("recent-list"),
  locBtn: document.getElementById("location-btn"),
  unitToggle: document.getElementById("unit-toggle"),
  themeToggle: document.getElementById("theme-toggle"),
  favBtn: document.getElementById("favorite-btn"),
  toast: document.getElementById("error-toast"),
  toastMsg: document.getElementById("error-message"),
  toastClose: document.getElementById("close-toast"),
  body: document.body,
  html: document.documentElement,
};

// Icon Mapping (OpenWeatherMap icon code to Boxicons)
const iconMap = {
  "01d": "bx-sun",
  "01n": "bx-moon",
  "02d": "bx-cloud-sun",
  "02n": "bx-cloud-moon",
  "03d": "bx-cloud",
  "03n": "bx-cloud",
  "04d": "bx-cloud",
  "04n": "bx-cloud",
  "09d": "bx-cloud-rain",
  "09n": "bx-cloud-rain",
  "10d": "bx-sun",
  "10n": "bx-moon", // OWM rain with sun/moon
  "11d": "bx-cloud-lightning",
  "11n": "bx-cloud-lightning",
  "13d": "bx-snow",
  "13n": "bx-snow",
  "50d": "bx-water",
  "50n": "bx-water", // mist
};

// =========================================
// INITIALIZATION
// =========================================
function init() {
  applyTheme();
  updateUnitUI();
  renderDropdowns();
  startClock();

  // Attempt to load last known city or default
  if (state.recentSearches.length > 0) {
    state.city = state.recentSearches[0].name;
    state.lat = state.recentSearches[0].lat;
    state.lon = state.recentSearches[0].lon;
  }

  fetchWeatherData();
  setupEventListeners();
}

// =========================================
// API FETCHING
// =========================================
async function fetchWeatherData() {
  if (API_KEY === "YOUR_OPENWEATHERMAP_API_KEY_HERE") {
    showError("Please add your OpenWeatherMap API Key in script.js");
    removeSkeletons();
    return;
  }

  setSkeletons();

  try {
    // Fetch Current Weather
    const currentRes = await fetch(
      `${BASE_URL}/weather?lat=${state.lat}&lon=${state.lon}&appid=${API_KEY}&units=${state.units}`,
    );
    if (!currentRes.ok) throw new Error("Failed to fetch current weather.");
    const currentData = await currentRes.json();

    // Fetch 5-Day Forecast
    const forecastRes = await fetch(
      `${BASE_URL}/forecast?lat=${state.lat}&lon=${state.lon}&appid=${API_KEY}&units=${state.units}`,
    );
    if (!forecastRes.ok) throw new Error("Failed to fetch forecast.");
    const forecastData = await forecastRes.json();

    updateUI(currentData, forecastData);
    updateBackground(currentData.weather[0].icon, currentData.weather[0].main);
    checkFavoriteStatus();
  } catch (error) {
    showError(error.message);
    removeSkeletons();
  }
}

async function getCoordinates(city) {
  try {
    const res = await fetch(
      `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`,
    );
    const data = await res.json();

    if (data.length === 0) {
      showError("City not found. Please try again.");
      return;
    }

    state.city = data[0].name;
    state.lat = data[0].lat;
    state.lon = data[0].lon;

    addToRecent(data[0]);
    fetchWeatherData();
  } catch (error) {
    showError("Network error while searching for city.");
  }
}

// =========================================
// UI UPDATES
// =========================================
function updateUI(current, forecast) {
  // Current Weather
  document.getElementById("city-name").textContent =
    `${current.name}, ${current.sys.country}`;
  document.getElementById("current-temp").textContent = Math.round(
    current.main.temp,
  );
  document.getElementById("weather-condition").textContent =
    current.weather[0].description;
  document.getElementById("feels-like").textContent =
    `Feels like ${Math.round(current.main.feels_like)}°`;

  const iconClass = iconMap[current.weather[0].icon] || "bx-cloud";
  document.getElementById("current-icon").className = `bx ${iconClass}`;

  // Highlights
  document.getElementById("humidity").textContent = `${current.main.humidity}%`;
  document.getElementById("wind-speed").textContent =
    `${getWindSpeed(current.wind.speed)}`;
  document.getElementById("pressure").textContent =
    `${current.main.pressure} hPa`;
  document.getElementById("visibility").textContent =
    `${(current.visibility / 1000).toFixed(1)} km`;

  // Process & Render Hourly (Next 24 hours = 8 items from 3-hour intervals)
  renderHourly(forecast.list.slice(0, 8));

  // Process & Render Daily (1 item per day)
  const dailyData = processDailyForecast(forecast.list);
  renderDaily(dailyData);

  removeSkeletons();
}

function renderHourly(hourlyData) {
  const container = document.getElementById("hourly-forecast");
  container.innerHTML = "";

  hourlyData.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const iconClass = iconMap[item.weather[0].icon] || "bx-cloud";
    const temp = Math.round(item.main.temp);

    const html = `
            <div class="hourly-item">
                <span class="hourly-time">${time}</span>
                <i class='bx ${iconClass} hourly-icon'></i>
                <span class="hourly-temp">${temp}°</span>
            </div>
        `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

function processDailyForecast(list) {
  const daily = [];
  const days = new Set();

  for (let item of list) {
    const dateObj = new Date(item.dt * 1000);
    const dayString = dateObj.toDateString();

    if (!days.has(dayString)) {
      days.add(dayString);
      daily.push(item);
    }
    if (daily.length === 5) break;
  }
  return daily;
}

function renderDaily(dailyData) {
  const container = document.getElementById("daily-forecast");
  container.innerHTML = "";

  dailyData.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const iconClass = iconMap[item.weather[0].icon] || "bx-cloud";
    const high = Math.round(item.main.temp_max);
    const low = Math.round(item.main.temp_min); // Note: API gives interval min/max, realistic app requires parsing whole day, simplified here.

    const html = `
            <div class="daily-item">
                <span class="daily-day">${dayName}</span>
                <i class='bx ${iconClass} daily-icon'></i>
                <div class="daily-temps">
                    <span class="daily-high">${high}°</span>
                    <span class="daily-low">${low}°</span>
                </div>
                <span class="daily-desc">${item.weather[0].main}</span>
            </div>
        `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

function updateBackground(iconCode, weatherMain) {
  DOM.body.className = ""; // Reset classes

  const isNight = iconCode.includes("n");
  let bgClass = "bg-default";

  switch (weatherMain.toLowerCase()) {
    case "clear":
      bgClass = isNight ? "bg-clear-night" : "bg-clear-day";
      break;
    case "clouds":
      bgClass = isNight ? "bg-clouds-night" : "bg-clouds-day";
      break;
    case "rain":
    case "drizzle":
      bgClass = "bg-rain";
      break;
    case "snow":
      bgClass = "bg-snow";
      break;
    case "thunderstorm":
      bgClass = "bg-thunderstorm";
      break;
  }

  DOM.body.classList.add(bgClass);
}

// =========================================
// HELPERS & UTILITIES
// =========================================
function setSkeletons() {
  document
    .querySelectorAll(".skeleton-text")
    .forEach((el) => el.classList.add("skeleton-text"));
  document
    .querySelectorAll(".hourly-item, .daily-item, .weather-icon-container")
    .forEach((el) => el.classList.add("skeleton-box"));
}

function removeSkeletons() {
  document
    .querySelectorAll(".skeleton-text")
    .forEach((el) => el.classList.remove("skeleton-text"));
  document
    .querySelectorAll(".skeleton-box")
    .forEach((el) => el.classList.remove("skeleton-box"));
}

function startClock() {
  const timeEl = document.getElementById("date-time");
  setInterval(() => {
    const now = new Date();
    const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
    timeEl.textContent = now.toLocaleDateString("en-US", options);
  }, 1000);
}

function getWindSpeed(speed) {
  // API returns metric in m/s, imperial in mph. Convert m/s to km/h for UI consistency if metric.
  if (state.units === "metric") {
    return `${Math.round(speed * 3.6)} km/h`;
  }
  return `${Math.round(speed)} mph`;
}

// =========================================
// STATE MANAGEMENT & LOCAL STORAGE
// =========================================
function applyTheme() {
  DOM.html.setAttribute("data-theme", state.theme);
  DOM.themeToggle.innerHTML =
    state.theme === "dark"
      ? "<i class='bx bx-sun'></i>"
      : "<i class='bx bx-moon'></i>";
}

function updateUnitUI() {
  document
    .querySelector(".unit-c")
    .classList.toggle("active", state.units === "metric");
  document
    .querySelector(".unit-f")
    .classList.toggle("active", state.units === "imperial");
}

function addToRecent(locationData) {
  const exists = state.recentSearches.findIndex(
    (loc) => loc.name === locationData.name,
  );
  if (exists !== -1) state.recentSearches.splice(exists, 1);

  state.recentSearches.unshift({
    name: locationData.name,
    lat: locationData.lat,
    lon: locationData.lon,
    country: locationData.country,
  });
  if (state.recentSearches.length > 5) state.recentSearches.pop();

  localStorage.setItem("recentSearches", JSON.stringify(state.recentSearches));
  renderDropdowns();
}

function toggleFavorite() {
  const currentLoc = { name: state.city, lat: state.lat, lon: state.lon };
  const index = state.favorites.findIndex((fav) => fav.name === state.city);

  if (index === -1) {
    state.favorites.push(currentLoc);
    DOM.favBtn.classList.add("active");
    DOM.favBtn.querySelector("i").classList.replace("bx-heart", "bxs-heart");
  } else {
    state.favorites.splice(index, 1);
    DOM.favBtn.classList.remove("active");
    DOM.favBtn.querySelector("i").classList.replace("bxs-heart", "bx-heart");
  }

  localStorage.setItem("favorites", JSON.stringify(state.favorites));
  renderDropdowns();
}

function checkFavoriteStatus() {
  const isFav = state.favorites.some((fav) => fav.name === state.city);
  if (isFav) {
    DOM.favBtn.classList.add("active");
    DOM.favBtn.querySelector("i").classList.replace("bx-heart", "bxs-heart");
  } else {
    DOM.favBtn.classList.remove("active");
    DOM.favBtn.querySelector("i").classList.replace("bxs-heart", "bx-heart");
  }
}

function renderDropdowns() {
  DOM.favList.innerHTML = state.favorites.length
    ? ""
    : '<li><span style="color:var(--text-secondary); font-size:0.8rem;">No saved locations</span></li>';
  DOM.recentList.innerHTML = state.recentSearches.length
    ? ""
    : '<li><span style="color:var(--text-secondary); font-size:0.8rem;">No recent searches</span></li>';

  state.favorites.forEach((fav, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${fav.name}</span> <i class='bx bx-x' onclick="removeFav(${i}, event)"></i>`;
    li.onclick = (e) => {
      if (e.target.tagName !== "I") loadLocation(fav);
    };
    DOM.favList.appendChild(li);
  });

  state.recentSearches.forEach((recent) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${recent.name}, ${recent.country}</span>`;
    li.onclick = () => loadLocation(recent);
    DOM.recentList.appendChild(li);
  });
}

window.removeFav = function (index, e) {
  e.stopPropagation();
  state.favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
  renderDropdowns();
  checkFavoriteStatus();
};

function loadLocation(loc) {
  state.city = loc.name;
  state.lat = loc.lat;
  state.lon = loc.lon;
  DOM.searchDropdown.classList.add("hidden");
  DOM.searchInp.value = "";
  fetchWeatherData();
}

// =========================================
// ERROR NOTIFICATION
// =========================================
function showError(msg) {
  DOM.toastMsg.textContent = msg;
  DOM.toast.classList.add("show");
  setTimeout(() => DOM.toast.classList.remove("show"), 5000);
}

DOM.toastClose.addEventListener("click", () =>
  DOM.toast.classList.remove("show"),
);

// =========================================
// EVENT LISTENERS
// =========================================
function setupEventListeners() {
  // Search with Debounce simulation via enter key
  DOM.searchInp.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && DOM.searchInp.value.trim() !== "") {
      getCoordinates(DOM.searchInp.value.trim());
      DOM.searchDropdown.classList.add("hidden");
    }
  });

  // Show/Hide dropdown
  DOM.searchInp.addEventListener("focus", () => {
    if (state.favorites.length > 0 || state.recentSearches.length > 0) {
      DOM.searchDropdown.classList.remove("hidden");
    }
  });

  // Click outside to close dropdown
  document.addEventListener("click", (e) => {
    if (
      !DOM.searchInp.contains(e.target) &&
      !DOM.searchDropdown.contains(e.target)
    ) {
      DOM.searchDropdown.classList.add("hidden");
    }
  });

  // Geolocation
  DOM.locBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      DOM.locBtn
        .querySelector("i")
        .classList.replace("bx-target-lock", "bx-loader-alt");
      DOM.locBtn.querySelector("i").classList.add("bx-spin");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          state.lat = position.coords.latitude;
          state.lon = position.coords.longitude;

          // Reverse geocode to get city name
          try {
            const res = await fetch(
              `${GEO_URL}/reverse?lat=${state.lat}&lon=${state.lon}&limit=1&appid=${API_KEY}`,
            );
            const data = await res.json();
            state.city = data[0].name;
            addToRecent(data[0]);
          } catch (e) {
            state.city = "Current Location";
          }

          fetchWeatherData();

          DOM.locBtn.querySelector("i").classList.remove("bx-spin");
          DOM.locBtn
            .querySelector("i")
            .classList.replace("bx-loader-alt", "bx-target-lock");
        },
        (error) => {
          showError("Location access denied. Please search manually.");
          DOM.locBtn.querySelector("i").classList.remove("bx-spin");
          DOM.locBtn
            .querySelector("i")
            .classList.replace("bx-loader-alt", "bx-target-lock");
        },
      );
    } else {
      showError("Geolocation is not supported by your browser.");
    }
  });

  // Toggle Units
  DOM.unitToggle.addEventListener("click", () => {
    state.units = state.units === "metric" ? "imperial" : "metric";
    localStorage.setItem("units", state.units);
    updateUnitUI();
    fetchWeatherData(); // Refetch to get accurate conversions directly from API
  });

  // Toggle Theme
  DOM.themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", state.theme);
    applyTheme();
  });

  // Favorite Button
  DOM.favBtn.addEventListener("click", toggleFavorite);
}

// Start App
init();
