import { fetchWeather, getWeatherIcon } from "./weather.js";

export function initApp() {
  const cityInput = document.getElementById("cityInput");
  const fetchButton = document.getElementById("fetchButton");
  const uploadButton = document.getElementById("upload-report"); // <- new
  const weatherIcon = document.getElementById("weatherIcon");
  const weatherInfo = document.getElementById("weatherInfo");
  const errorMessage = document.getElementById("errorMessage");

  fetchButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      errorMessage.textContent = "Please enter a city name!";
      weatherInfo.textContent = "";
      weatherIcon.style.display = "none";
      return;
    }

    try {
      const data = await fetchWeather(city);
      errorMessage.textContent = "";
      weatherInfo.innerHTML = `
        <p>Location: ${data.name}, ${data.sys.country}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${
          data.weather[0].description.charAt(0).toUpperCase() +
          data.weather[0].description.slice(1)
        }</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;

      weatherIcon.src = getWeatherIcon(data.weather[0].main);
      weatherIcon.style.display = "block";
    } catch (error) {
      errorMessage.textContent = "City not found or API error!";
      weatherInfo.textContent = "";
      weatherIcon.style.display = "none";
    }
  });

  // Upload report logic
  uploadButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      errorMessage.textContent = "Please enter a city name!";
      return;
    }

    try {
      // Mock API call — in real app you'd send formData or JSON
      const response = await fetch("https://api.example.com/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) throw new Error("Upload failed");

      weatherInfo.textContent = "Report uploaded";
      errorMessage.textContent = "";
    } catch (error) {
      errorMessage.textContent = "Failed to upload report!";
    }
  });
}
