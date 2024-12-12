const API_KEY = "031da008a199cab2fc787554babe2db6";

const forecastContainer = document.getElementById("forecast-container");
const backBtn = document.getElementById("back-btn");


const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get("city") || "Lusaka";

backBtn.addEventListener("click", () => {
  window.location.href = "weather.html";
});


async function fetchDetailedForecast(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},ZM&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    if (data.cod === "200") {
      forecastContainer.innerHTML = ""; 
      const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

      dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toDateString();
        const temp = `Temp: ${forecast.main.temp}°C`;
        const desc = forecast.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        const wind = `Wind: ${forecast.wind.speed} m/s`;
        const humidity = `Humidity: ${forecast.main.humidity}%`;

        
        const card = `
          <div class="forecast-card">
            <h4>${date}</h4>
            <img src="${icon}" alt="${desc}">
            <p>${temp}</p>
            <p>${desc}</p>
            <p>${wind}</p>
            <p>${humidity}</p>
          </div>
        `;
        forecastContainer.innerHTML += card; 
      });
    } else {
      alert("Could not fetch detailed forecast. Please try again.");
    }
  } catch (error) {
    alert("Error fetching detailed forecast.");
  }
}


fetchDetailedForecast(city);
