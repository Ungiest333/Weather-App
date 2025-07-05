import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const MainWeather = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription =
    weatherData?.weather?.[0]?.description?.charAt(0).toUpperCase() +
    weatherData?.weather?.[0]?.description.slice(1) || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date not available";

  const iconCode = weatherData?.weather?.[0]?.icon || "01d";
  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const minTemp = weatherData?.main?.temp_min || "N/A";
  const maxTemp = weatherData?.main?.temp_max || "N/A";

  return (
    <div className="bg-gradient-to-b from-rose-200  to-yellow-200 rounded-xl shadow-lg p-4 w-[250px] -[250px] mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-xl uppercase font-bold">Current Weather</h2>
      </div>

      {/* Weather Info */}
      <div className="flex items-center justify-between">
        {/* Temperature */}
        <div className="text-center">
          <p className="text-4xl font-bold">{temperatureCelsius}°C</p>
          <p className="text-sm font-semibold mt-2">{weatherDescription}</p>
        </div>

        {/* Weather Icon */}
        <img
          src={weatherIcon}
          alt="Weather Icon"
          className="w-16 h-16 animate-bounce-slow"
        />
      </div>

      {/* Date and Location */}
      <div className="mt-4">
        <div className="flex items-center gap-1 text-sm mb-1">
          <CalendarMonthIcon fontSize="small" />
          <span>{currentDate}</span>
        </div>
        <div className="flex items-center gap-1 text-sm mb-2">
          <LocationOnIcon fontSize="small" />
          <span>
            {cityName}, {countryName}
          </span>
        </div>

        {/* Min and Max Temperature */}
        <div className="flex justify-between text-sm mt-2">
          <div>
            <span className="font-semibold">Min:</span> {minTemp}°C
          </div>
          <div>
            <span className="font-semibold">Max:</span> {maxTemp}°C
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWeather;
