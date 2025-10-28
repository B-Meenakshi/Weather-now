import React from "react";

// Helper function to convert weather codes into readable text
function weatherCodeToText(code) {
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    80: "Rain showers",
    95: "Thunderstorm"
  };
  // Return a description or "Unknown" if code not found
  return map[code] || "Unknown";
}

// Main weather display component
export default function WeatherDisplay({ weather }) {
  const c = weather.current; // Current weather data
  if (!c) return null; // Return nothing if no weather data available

  // Helper function to convert wind direction in degrees → text (e.g., 180° = South)
  function degToCardinal(deg) {
    const dirs = [
      "N", "NNE", "NE", "ENE",
      "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW",
      "W", "WNW", "NW", "NNW"
    ];
    const idx = Math.round(((deg % 360) / 22.5)) % 16;
    return dirs[idx];
  }

  return (
    <section className="card">
      {/* City Name */}
      <h2>{weather.place}</h2>

      {/* Weather Information Layout */}
      <div className="grid">
        {/* Left side — Big temperature & weather condition */}
        <div className="big">
          <div className="temp">{c.temperature}°C</div>
          <div className="desc">{weatherCodeToText(c.weathercode)}</div>
        </div>

        {/* Right side — Extra details */}
        <div className="meta">
          <div>
            <strong>Observed at</strong><br />
            {new Date(c.time).toLocaleString("en-IN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
          <div>
            <strong>Wind</strong><br />
            {c.windspeed} m/s ({degToCardinal(c.winddirection)})
          </div>
          <div>
            <strong>Is Day</strong><br />
            {c.is_day ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </section>
  );
}
