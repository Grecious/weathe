const API_KEY = "031da008a199cab2fc787554babe2db6";

const loader = document.getElementById("loader");
const searchBtn = document.getElementById("search-btn");
const citySearch = document.getElementById("city-search");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const moreDetailsBtn = document.getElementById("more-details-btn");

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}


async function fetchWeather(city) {
  try {
    showLoader();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},ZM&units=metric&appid=${API_KEY}`);
    const data = await response.json();

    if (data.cod === 200) {
      cityName.textContent = data.name;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      weatherDescription.textContent = `Condition: ${data.weather[0].description}`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } else {
      alert("City not found. Please try again.");
    }
  } catch (error) {
    alert("Error fetching weather data.");
  } finally {
    hideLoader();
  }
}


moreDetailsBtn.addEventListener("click", () => {
  const city = cityName.textContent || "Lusaka";
  window.location.href = `detailed.html?city=${city}`;
});

searchBtn.addEventListener("click", () => {
  const city = citySearch.value.trim();
  if (city) fetchWeather(city);
});
const toggleModeBtn = document.getElementById("toggle-mode");

toggleModeBtn.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);  
});


const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);

