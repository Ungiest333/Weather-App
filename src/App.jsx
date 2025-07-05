import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MainWeather from "./components/MainWeather";
import SevenDayForecast from "./components/Sevenday";
import TodayHighlights from "./components/Todayhighlights";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("kanpur");
  const [airQualityData, setAirQualityData] = useState(null);
  const [sevenDayForecast, setSevenDayForecast] = useState(null);
  const apiKey = "fef5789c35085a507050decb49889d42";

  useEffect(() => {
    getWeatherData(city);
  }, [city]);

  const getAirQualityData = (lat, lon) => {
    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    axios
      .get(airQualityUrl)
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) => {
        console.error("Error fetching Air Quality Data:", error);
        alert("Error fetching air quality data. Please try again.");
      });
  };

  const getWeatherData = (city) => {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    axios
      .get(currentWeatherUrl)
      .then((response) => {
        const data = response.data;
        setWeatherData(data);

        if (data.coord) {
          getAirQualityData(data.coord.lat, data.coord.lon);
        } else {
          console.warn("Coordinates not found for air quality data");
        }
      })
      .catch((error) => {
        console.error("Error fetching Current Weather Data:", error);
        alert("Error fetching current weather data. Please try again.");
      });

    axios
      .get(forecastUrl)
      .then((response) => {
        setSevenDayForecast(response.data);
      })
      .catch((error) => {
        console.error("Error fetching 7-Day Forecast Data:", error);
        alert("Error fetching 7-day forecast data. Please try again.");
      });
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-rose-200 via-pink-300 to-yellow-200 text-gray-800">
        <Navbar onSearch={handleSearch} />
        <main className="container mx-auto p-5">
          {weatherData && airQualityData ? (
            <div className="flex">
              {/* Left Section: Fixed Width */}
              <div className="w-[50px]  mt-[150px] space-y-2">
                <section>
                  <MainWeather weatherData={weatherData} />
                </section>
              </div>

              {/* Right Section: Flexible Width */}
              <div className="flex-1 ml-6">
                <section>
                  <TodayHighlights
                    weatherData={weatherData}
                    airQualityData={airQualityData}
                  />
                </section>
                <section className="mt-8 mb-8">
                  {sevenDayForecast ? (
                    <SevenDayForecast forecastData={sevenDayForecast} />
                  ) : (
                    <p>Loading forecast...</p>
                  )}
                </section>
              </div>
            </div>
          ) : (
            <p className="text-center text-xl">Loading data...</p>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
