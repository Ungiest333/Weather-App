import React from "react";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import CompressIcon from "@mui/icons-material/Compress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import HighlightBox from "./Highlightbox";

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, wind, visibility, sys } = weatherData;
  const airQualityIndex = airQualityData?.main?.aqi; // accessing aqi from air quality data
  const { co, no, no2, o3 } = airQualityData?.components || {};

  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main.pressure} hPa`, Icon: CompressIcon },
    {
      title: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`,
      Icon: VisibilityIcon,
    },
    {
      title: "Feels Like",
      value: `${Math.round(main.feels_like)}°C`,
      Icon: DeviceThermostatIcon,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-rose-300  to-yellow-100 text-black  rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl text-center uppercase  font-bold mb-4">Today's Highlights</h2>

      {/* Air Quality Section */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="bg-gradient-to-b from-yellow-200 to-rose-200 text-black p-5 rounded-lg shadow-md flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Air Quality Index</h3>
            <div
              className={`text-sm font-bold py-1 px-3 rounded-full ${
                airQualityIndex === 1
                  ? "bg-green-500"
                  : airQualityIndex === 2
                  ? "bg-rose-200"
                  : airQualityIndex === 3
                  ? "bg-orange-400"
                  : airQualityIndex === 4
                  ? "bg-red-500"
                  : "bg-purple-600"
              }`}
            >
              {renderAirQualityDescription(airQualityIndex)}
            </div>
          </div>
          <AirIcon style={{ fontSize: "35px" }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-sm font-bold">CO</p>
              <p className="text-lg">{co} µg/m³</p>
            </div>
            <div>
              <p className="text-sm font-bold">NO</p>
              <p className="text-lg">{no} µg/m³</p>
            </div>
            <div>
              <p className="text-sm font-bold">NO₂</p>
              <p className="text-lg">{no2} µg/m³</p>
            </div>
            <div>
              <p className="text-sm font-bold">O₃</p>
              <p className="text-lg">{o3} µg/m³</p>
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset Section */}
        <div className="bg-gradient-to-b from-yellow-200 to-rose-200 text-black p-5 rounded-lg shadow-md flex-1">
          <h3 className="text-xl font-semibold mb-4">Sunrise and Sunset</h3>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <WbSunnyIcon className="text-yellow-300 text-4xl mb-2" />
              <p className="text-lg font-bold">
                {new Date(sys.sunrise * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-400">Sunrise</p>
            </div>
            <div className="text-center">
              <NightsStayIcon className="text-blue-300 text-4xl mb-2" />
              <p className="text-lg font-bold">
                {new Date(sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-400">Sunset</p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Highlights Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {highlights.map((highlight, index) => (
          <HighlightBox
            key={index}
            title={highlight.title}
            value={highlight.value}
            Icon={highlight.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayHighlights;
