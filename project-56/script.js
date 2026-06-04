/* ============================================
   WEATHER DASHBOARD PRO - JAVASCRIPT
   Production-Ready Weather Application
   ============================================ */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  API_KEY: "a8ba0cfe4cfaa3197fc4fa76e40a06f1", // OpenWeatherMap API Key
  API_BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEO_API_URL: "https://api.openweathermap.org/geo/1.0",
  STORAGE_KEYS: {
    FAVORITES: "weather_favorites",
    HISTORY: "weather_history",
    TEMP_UNIT: "weather_temp_unit",
    LAST_LOCATION: "weather_last_location",
  },
  MAX_HISTORY: 5,
  MAX_FAVORITES: 10,
  REFRESH_INTERVAL: 300000, // 5 minutes
  ICONS: {
    LOADING: "⏳",
    ERROR: "⚠️",
    SUCCESS: "✓",
  },
};

// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
  currentWeather: null,
  forecast: null,
  currentLocation: null,
  isCelsius: true,
  isLoading: false,
  lastUpdateTime: null,
  refreshInterval: null,
  favorites: [],
  history: [],
};

// ============================================
// DOM ELEMENTS
// ============================================

const DOM = {
  // Navigation
  searchInput: document.getElementById("searchInput"),
  searchBtn: document.getElementById("searchBtn"),
  tempToggle: document.getElementById("tempToggle"),
  locationBtn: document.getElementById("locationBtn"),

  // Container & Sections
  content: document.getElementById("content"),
  loadingContainer: document.getElementById("loadingContainer"),
  errorContainer: document.getElementById("errorContainer"),
  errorMessage: document.getElementById("errorMessage"),
  retryBtn: document.getElementById("retryBtn"),

  // Hero Section
  heroSection: document.getElementById("heroSection"),
  cityName: document.getElementById("cityName"),
  weatherStatus: document.getElementById("weatherStatus"),
  weatherIcon: document.getElementById("weatherIcon"),
  temperature: document.getElementById("temperature"),
  tempUnit: document.getElementById("tempUnit"),
  feelsLike: document.getElementById("feelsLike"),
  refreshBtn: document.getElementById("refreshBtn"),
  lastUpdate: document.getElementById("lastUpdate"),

  // Stats
  humidity: document.getElementById("humidity"),
  windSpeed: document.getElementById("windSpeed"),
  uvIndex: document.getElementById("uvIndex"),
  pressure: document.getElementById("pressure"),
  visibility: document.getElementById("visibility"),
  feelsLikeValue: document.getElementById("feelsLikeValue"),

  // Sun Times
  sunrise: document.getElementById("sunrise"),
  sunset: document.getElementById("sunset"),

  // Forecast
  forecastContainer: document.getElementById("forecastContainer"),

  // Favorites & History
  favoritesSection: document.getElementById("favoritesSection"),
  favoritesContainer: document.getElementById("favoritesContainer"),
  clearFavoritesBtn: document.getElementById("clearFavoritesBtn"),
  historySection: document.getElementById("historySection"),
  historyContainer: document.getElementById("historyContainer"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),

  // Toast
  toastContainer: document.getElementById("toastContainer"),
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Show loading state
 */
function showLoading() {
  state.isLoading = true;
  DOM.loadingContainer.style.display = "flex";
  DOM.content.style.display = "none";
  DOM.errorContainer.style.display = "none";
}

/**
 * Hide loading state
 */
function hideLoading() {
  state.isLoading = false;
  DOM.loadingContainer.style.display = "none";
}

/**
 * Show error state
 */
function showError(message = "Unable to load weather data. Please try again.") {
  DOM.errorMessage.textContent = message;
  DOM.errorContainer.style.display = "flex";
  DOM.content.style.display = "none";
  DOM.loadingContainer.style.display = "none";
}

/**
 * Show content
 */
function showContent() {
  DOM.content.style.display = "block";
  DOM.errorContainer.style.display = "none";
}

/**
 * Toast notification system
 */
function showToast(message, type = "info", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const iconMap = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ⓘ",
  };

  toast.innerHTML = `
        <div class="toast-icon">${iconMap[type] || type}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="Close notification">✕</button>
    `;

  DOM.toastContainer.appendChild(toast);

  const closeBtn = toast.querySelector(".toast-close");
  const removeToast = () => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100px)";
    setTimeout(() => toast.remove(), 300);
  };

  closeBtn.addEventListener("click", removeToast);

  if (duration > 0) {
    setTimeout(removeToast, duration);
  }

  return toast;
}

/**
 * Format time from timestamp
 */
function formatTime(timestamp, timezone) {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format date for display
 */
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

/**
 * Get weather icon URL
 */
function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

/**
 * Get background style based on weather
 */
function getBackgroundStyle(weatherMain) {
  const weatherLower = weatherMain.toLowerCase();

  if (weatherLower.includes("clear") || weatherLower.includes("sunny")) {
    return "linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)";
  } else if (weatherLower.includes("cloud")) {
    return "linear-gradient(135deg, #E5E7EB 0%, #9CA3AF 100%)";
  } else if (
    weatherLower.includes("rain") ||
    weatherLower.includes("drizzle")
  ) {
    return "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)";
  } else if (weatherLower.includes("snow")) {
    return "linear-gradient(135deg, #F3F4F6 0%, #D1D5DB 100%)";
  } else if (weatherLower.includes("thunderstorm")) {
    return "linear-gradient(135deg, #4B5563 0%, #292E38 100%)";
  } else if (weatherLower.includes("mist") || weatherLower.includes("fog")) {
    return "linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)";
  }

  return "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)";
}

/**
 * Kelvin to Celsius
 */
function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

/**
 * Celsius to Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

/**
 * Get temperature value based on current unit
 */
function getTemperature(celsius) {
  return state.isCelsius ? celsius : celsiusToFahrenheit(celsius);
}

/**
 * Save to localStorage
 */
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("localStorage error:", error);
  }
}

/**
 * Load from localStorage
 */
function loadFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("localStorage error:", error);
    return defaultValue;
  }
}

// ============================================
// WEATHER API FUNCTIONS
// ============================================

/**
 * Fetch weather data by coordinates
 */
async function fetchWeatherByCoords(lat, lon) {
  try {
    showLoading();

    const response = await fetch(
      `${CONFIG.API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}&units=metric`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Location not found");
      } else if (response.status === 401) {
        throw new Error("Invalid API key");
      } else if (response.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      }
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    state.currentWeather = data;
    state.currentLocation = `${data.name}, ${data.sys.country}`;
    state.lastUpdateTime = new Date();

    // Save last location
    saveToStorage(CONFIG.STORAGE_KEYS.LAST_LOCATION, {
      name: state.currentLocation,
      lat: lat,
      lon: lon,
    });

    // Fetch forecast
    await fetchForecast(lat, lon);

    updateUI();
    hideLoading();
    showContent();
  } catch (error) {
    console.error("Weather fetch error:", error);
    showError(error.message);
  }
}

/**
 * Fetch forecast data
 */
async function fetchForecast(lat, lon) {
  try {
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}&units=metric`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const data = await response.json();

    // Process forecast - get one per day at noon
    const forecastByDay = {};
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toDateString();

      if (!forecastByDay[day]) {
        forecastByDay[day] = item;
      }
    });

    state.forecast = Object.values(forecastByDay).slice(0, 7);
  } catch (error) {
    console.error("Forecast fetch error:", error);
  }
}

/**
 * Search weather by city name
 */
async function searchWeatherByCity(cityName) {
  try {
    showLoading();

    // First, geocode the city name
    const geoResponse = await fetch(
      `${CONFIG.GEO_API_URL}/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${CONFIG.API_KEY}`,
    );

    if (!geoResponse.ok) {
      throw new Error("Failed to geocode location");
    }

    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
      throw new Error(
        `City "${cityName}" not found. Please check the spelling and try again.`,
      );
    }

    const { lat, lon, name, country } = geoData[0];

    // Add to history
    addToHistory(name, country);

    // Fetch weather
    await fetchWeatherByCoords(lat, lon);
  } catch (error) {
    console.error("Search error:", error);
    showError(error.message);
  }
}

// ============================================
// HISTORY & FAVORITES MANAGEMENT
// ============================================

/**
 * Add location to search history
 */
function addToHistory(city, country) {
  const historyItem = { city, country, timestamp: Date.now() };
  let history = state.history;

  // Remove if already exists
  history = history.filter((item) => item.city !== city);

  // Add to beginning
  history.unshift(historyItem);

  // Keep only last 5
  history = history.slice(0, CONFIG.MAX_HISTORY);

  state.history = history;
  saveToStorage(CONFIG.STORAGE_KEYS.HISTORY, history);
  updateHistoryUI();
}

/**
 * Add current location to favorites
 */
function addToFavorites() {
  if (!state.currentWeather) return;

  const favorite = {
    city: state.currentWeather.name,
    country: state.currentWeather.sys.country,
    lat: state.currentWeather.coord.lat,
    lon: state.currentWeather.coord.lon,
    temp: kelvinToCelsius(state.currentWeather.main.temp),
    condition: state.currentWeather.weather[0].main,
    icon: state.currentWeather.weather[0].icon,
  };

  let favorites = state.favorites;

  // Remove if already exists
  favorites = favorites.filter((fav) => fav.city !== favorite.city);

  // Add to beginning
  favorites.unshift(favorite);

  // Limit to max favorites
  favorites = favorites.slice(0, CONFIG.MAX_FAVORITES);

  state.favorites = favorites;
  saveToStorage(CONFIG.STORAGE_KEYS.FAVORITES, favorites);
  updateFavoritesUI();
  showToast(`${favorite.city} added to favorites!`, "success");
}

/**
 * Remove from favorites
 */
function removeFromFavorites(city) {
  state.favorites = state.favorites.filter((fav) => fav.city !== city);
  saveToStorage(CONFIG.STORAGE_KEYS.FAVORITES, state.favorites);
  updateFavoritesUI();
  showToast(`${city} removed from favorites`, "info");
}

/**
 * Remove from history
 */
function removeFromHistory(city) {
  state.history = state.history.filter((item) => item.city !== city);
  saveToStorage(CONFIG.STORAGE_KEYS.HISTORY, state.history);
  updateHistoryUI();
}

/**
 * Clear all favorites
 */
function clearAllFavorites() {
  if (confirm("Are you sure you want to clear all favorites?")) {
    state.favorites = [];
    saveToStorage(CONFIG.STORAGE_KEYS.FAVORITES, []);
    updateFavoritesUI();
    showToast("All favorites cleared", "info");
  }
}

/**
 * Clear all history
 */
function clearAllHistory() {
  if (confirm("Are you sure you want to clear all search history?")) {
    state.history = [];
    saveToStorage(CONFIG.STORAGE_KEYS.HISTORY, []);
    updateHistoryUI();
    showToast("Search history cleared", "info");
  }
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

/**
 * Update all UI elements with weather data
 */
function updateUI() {
  if (!state.currentWeather) return;

  const weather = state.currentWeather;
  const tempCelsius = kelvinToCelsius(weather.main.temp);
  const feelsCelsius = kelvinToCelsius(weather.main.feels_like);

  // Hero Section
  DOM.cityName.textContent = `${weather.name}, ${weather.sys.country}`;
  DOM.weatherStatus.textContent = weather.weather[0].main;
  DOM.weatherIcon.src = getWeatherIconUrl(weather.weather[0].icon);
  DOM.temperature.textContent = getTemperature(tempCelsius);
  DOM.feelsLike.textContent = `Feels like ${getTemperature(feelsCelsius)}°`;
  DOM.feelsLikeValue.textContent = `${getTemperature(feelsCelsius)}°`;

  // Stats
  DOM.humidity.textContent = `${weather.main.humidity}%`;
  DOM.windSpeed.textContent = `${Math.round(weather.wind.speed)} km/h`;
  DOM.uvIndex.textContent = state.currentWeather.clouds.all;
  DOM.pressure.textContent = `${weather.main.pressure} mb`;
  DOM.visibility.textContent = `${(weather.visibility / 1000).toFixed(1)} km`;

  // Sun times
  DOM.sunrise.textContent = formatTime(weather.sys.sunrise, weather.timezone);
  DOM.sunset.textContent = formatTime(weather.sys.sunset, weather.timezone);

  // Last update
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  DOM.lastUpdate.textContent = `Last updated: ${timeString}`;

  // Update forecast
  updateForecastUI();

  // Update background gradient
  updateBackgroundStyle(weather.weather[0].main);
}

/**
 * Update forecast UI
 */
function updateForecastUI() {
  DOM.forecastContainer.innerHTML = "";

  if (!state.forecast || state.forecast.length === 0) return;

  state.forecast.forEach((day, index) => {
    const card = document.createElement("div");
    card.className = "forecast-card";

    const highCelsius = kelvinToCelsius(day.main.temp_max);
    const lowCelsius = kelvinToCelsius(day.main.temp_min);

    card.innerHTML = `
            <div class="forecast-day">${formatDate(day.dt)}</div>
            <div class="forecast-icon">
                <img src="${getWeatherIconUrl(day.weather[0].icon)}" alt="${day.weather[0].main}">
            </div>
            <div class="forecast-temp">
                <div class="forecast-high">${getTemperature(highCelsius)}°</div>
                <div class="forecast-low">${getTemperature(lowCelsius)}°</div>
            </div>
            <div class="forecast-condition">${day.weather[0].main}</div>
        `;

    card.addEventListener("click", () => {
      showToast(`${formatDate(day.dt)}: ${day.weather[0].main}`, "info");
    });

    DOM.forecastContainer.appendChild(card);
  });
}

/**
 * Update favorites UI
 */
function updateFavoritesUI() {
  const favorites = state.favorites;

  if (favorites.length === 0) {
    DOM.favoritesSection.style.display = "none";
    return;
  }

  DOM.favoritesSection.style.display = "block";
  DOM.favoritesContainer.innerHTML = "";

  favorites.forEach((fav) => {
    const card = document.createElement("div");
    card.className = "favorite-card";

    card.innerHTML = `
            <div class="favorite-info">
                <div class="favorite-name">${fav.city}</div>
                <div class="favorite-temp">${fav.country}</div>
                <div class="favorite-condition">${getTemperature(fav.temp)}°</div>
            </div>
            <button class="remove-favorite" aria-label="Remove from favorites" title="Remove">✕</button>
        `;

    const removeBtn = card.querySelector(".remove-favorite");
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeFromFavorites(fav.city);
    });

    card.addEventListener("click", () => {
      searchWeatherByCity(fav.city);
    });

    DOM.favoritesContainer.appendChild(card);
  });
}

/**
 * Update history UI
 */
function updateHistoryUI() {
  const history = state.history;

  if (history.length === 0) {
    DOM.historySection.style.display = "none";
    return;
  }

  DOM.historySection.style.display = "block";
  DOM.historyContainer.innerHTML = "";

  history.forEach((item) => {
    const element = document.createElement("div");
    element.className = "history-item";

    element.innerHTML = `
            <div class="history-info">
                <div class="history-name">${item.city}</div>
                <div class="history-country">${item.country}</div>
            </div>
            <button class="remove-history" aria-label="Remove from history" title="Remove">✕</button>
        `;

    const removeBtn = element.querySelector(".remove-history");
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeFromHistory(item.city);
    });

    element.addEventListener("click", () => {
      searchWeatherByCity(item.city);
    });

    DOM.historyContainer.appendChild(element);
  });
}

/**
 * Update background style based on weather
 */
function updateBackgroundStyle(weatherMain) {
  const style = getBackgroundStyle(weatherMain);
  document.documentElement.style.setProperty("--gradient-weather", style);
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Search functionality
 */
DOM.searchBtn.addEventListener("click", () => {
  const city = DOM.searchInput.value.trim();
  if (city) {
    searchWeatherByCity(city);
    DOM.searchInput.value = "";
  }
});

DOM.searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    DOM.searchBtn.click();
  }
});

/**
 * Temperature toggle
 */
DOM.tempToggle.addEventListener("click", () => {
  state.isCelsius = !state.isCelsius;

  // Update UI
  const toggleCelsius = document.querySelector(".toggle-celsius");
  const toggleFahrenheit = document.querySelector(".toggle-fahrenheit");

  if (state.isCelsius) {
    toggleCelsius.classList.add("active");
    toggleFahrenheit.classList.remove("active");
    DOM.tempUnit.textContent = "°C";
  } else {
    toggleCelsius.classList.remove("active");
    toggleFahrenheit.classList.add("active");
    DOM.tempUnit.textContent = "°F";
  }

  // Save preference
  saveToStorage(CONFIG.STORAGE_KEYS.TEMP_UNIT, state.isCelsius);

  // Refresh UI
  if (state.currentWeather) {
    updateUI();
  }

  showToast(
    `Temperature unit changed to ${state.isCelsius ? "Celsius" : "Fahrenheit"}`,
    "success",
  );
});

/**
 * Geolocation
 */
DOM.locationBtn.addEventListener("click", () => {
  DOM.locationBtn.classList.add("loading");

  if (!navigator.geolocation) {
    showToast("Geolocation is not supported by your browser", "error");
    DOM.locationBtn.classList.remove("loading");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
      DOM.locationBtn.classList.remove("loading");
      showToast("Location accessed successfully", "success");
    },
    (error) => {
      DOM.locationBtn.classList.remove("loading");
      let errorMessage = "Unable to access your location. ";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += "Permission denied.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage += "Request timeout.";
          break;
      }

      showToast(errorMessage, "error");
    },
  );
});

/**
 * Refresh button
 */
DOM.refreshBtn.addEventListener("click", () => {
  if (!state.currentWeather) return;

  DOM.refreshBtn.classList.add("loading");

  fetchWeatherByCoords(
    state.currentWeather.coord.lat,
    state.currentWeather.coord.lon,
  ).then(() => {
    DOM.refreshBtn.classList.remove("loading");
    showToast("Weather data refreshed", "success");
  });
});

/**
 * Retry button
 */
DOM.retryBtn.addEventListener("click", () => {
  const lastLocation = loadFromStorage(CONFIG.STORAGE_KEYS.LAST_LOCATION);
  if (lastLocation) {
    fetchWeatherByCoords(lastLocation.lat, lastLocation.lon);
  } else {
    showToast("No previous location found", "warning");
  }
});

/**
 * Favorites and History buttons
 */
DOM.clearFavoritesBtn?.addEventListener("click", clearAllFavorites);
DOM.clearHistoryBtn?.addEventListener("click", clearAllHistory);

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
async function initialize() {
  // Load preferences
  state.isCelsius = loadFromStorage(CONFIG.STORAGE_KEYS.TEMP_UNIT, true);
  state.favorites = loadFromStorage(CONFIG.STORAGE_KEYS.FAVORITES, []);
  state.history = loadFromStorage(CONFIG.STORAGE_KEYS.HISTORY, []);

  // Update temperature toggle
  const toggleCelsius = document.querySelector(".toggle-celsius");
  const toggleFahrenheit = document.querySelector(".toggle-fahrenheit");

  if (state.isCelsius) {
    toggleCelsius.classList.add("active");
    toggleFahrenheit.classList.remove("active");
  } else {
    toggleCelsius.classList.remove("active");
    toggleFahrenheit.classList.add("active");
  }

  // Update UI
  updateFavoritesUI();
  updateHistoryUI();

  // Try to load last location or use geolocation
  const lastLocation = loadFromStorage(CONFIG.STORAGE_KEYS.LAST_LOCATION);

  if (lastLocation) {
    // Load last location
    fetchWeatherByCoords(lastLocation.lat, lastLocation.lon);
  } else if (navigator.geolocation) {
    // Try geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      () => {
        // Fallback to default city
        searchWeatherByCity("New York");
      },
    );
  } else {
    // Fallback to default city
    searchWeatherByCity("New York");
  }

  // Set up auto-refresh
  state.refreshInterval = setInterval(() => {
    if (state.currentWeather) {
      fetchWeatherByCoords(
        state.currentWeather.coord.lat,
        state.currentWeather.coord.lon,
      );
    }
  }, CONFIG.REFRESH_INTERVAL);
}

/**
 * Clean up on page unload
 */
window.addEventListener("beforeunload", () => {
  if (state.refreshInterval) {
    clearInterval(state.refreshInterval);
  }
});

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}

// Handle visibility change to refresh when tab becomes active
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && state.currentWeather) {
    const lastUpdate = state.lastUpdateTime
      ? Date.now() - state.lastUpdateTime.getTime()
      : 0;
    // Refresh if last update was more than 1 minute ago
    if (lastUpdate > 60000) {
      fetchWeatherByCoords(
        state.currentWeather.coord.lat,
        state.currentWeather.coord.lon,
      );
    }
  }
});

// ============================================
// HELPER FUNCTIONS FOR FUTURE ENHANCEMENTS
// ============================================

/**
 * Add favorite from current weather
 */
window.addCurrentToFavorites = function () {
  addToFavorites();
};

/**
 * Get weather alert or warning
 */
window.getWeatherAlert = function () {
  // This can be extended with weather alerts API
  const uvIndex = state.currentWeather?.clouds?.all || 0;
  if (uvIndex > 8) {
    showToast("High UV index - wear sunscreen!", "warning");
  }
};

console.log("Weather Dashboard Pro initialized successfully!");
