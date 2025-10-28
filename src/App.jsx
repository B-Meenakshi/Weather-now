import React, { useState } from "react";
import WeatherDisplay from "./WeatherDisplay";

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchCity(e) {
    e?.preventDefault();
    if (!query.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setError("");
    setWeather(null);
    setLoading(true);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      if (!geoRes.ok) throw new Error("Geocoding request failed");
      const geo = await geoRes.json();
      if (!geo.results || geo.results.length === 0) {
        setError("City not found. Try a different name.");
        setLoading(false);
        return;
      }
      const place = geo.results[0];
      const { latitude, longitude, name, country, timezone } = place;

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${encodeURIComponent(timezone || "auto")}`
      );
      if (!weatherRes.ok) throw new Error("Weather request failed");
      const w = await weatherRes.json();

      setWeather({
        place: `${name}${country ? ", " + country : ""}`,
        timezone: w.timezone || timezone,
        current: w.current_weather,
        raw: w
      });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather. " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Weather Now</h1>
        <p className="subtitle">Quick current weather for any city — powered by Open-Meteo</p>
      </header>

      <form onSubmit={searchCity} className="searchForm">
        <input
          aria-label="city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city (e.g., London, Tokyo, New York)"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Get Weather"}
        </button>
      </form>

      {error && <div role="alert" className="error">{error}</div>}

      {weather && <WeatherDisplay weather={weather} />}

      <footer>
        <small>Data from Open-Meteo • No API key required</small>
      </footer>
    </div>
  );
}