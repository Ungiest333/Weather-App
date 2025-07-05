import React from "react";

const SevenDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  return (
    <div id="forecast" className="bg-gradient-to-b from-rose-200  to-yellow-200 text-black text-black rounded-xl shadow-lg p-4 w-[500px] h-[250px] mx-auto overflow-auto ">
      <h2 className="text-lg uppercase font-bold mb-4 text-center">7-Days Forecast</h2>

      <div className="grid grid-cols-1 gap-3 ">
        {forecastData.list.slice(0, 7).map((item, index) => {
          const weatherIcon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

          return (
            <div
              key={index}
              className="flex items-center gap-3 bg-rose-300 p-3 rounded-lg hover:shadow-md transition-all"
            >
              {/* Weather Icon */}
              <img
                src={weatherIcon}
                alt="Weather Icon"
                className="w-10 h-10"
              />

              {/* Forecast Details */}
              <div className="flex flex-col items-start">
                {/* Date */}
                <p className="text-xs font-bold text-black">
                  {formatDate(item.dt_txt)}
                </p>

                {/* Temperature */}
                <p className="text-lg font-bold text-black">
                  {Math.round(item.main.temp)}°C
                </p>

                {/* Weather Description */}
                <p className="text-xs text-gray-900 capitalize">
                  {item.weather[0].description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SevenDayForecast;
