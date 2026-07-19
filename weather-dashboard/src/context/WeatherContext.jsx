import { createContext, useCallback, useEffect, useState } from "react";
import { fetchCurrentWeather, fetchForecast } from "../services/weatherApi.js";

export const WeatherContext = createContext(null);

const SAVED_KEY = "aloft.savedCities";

function loadSaved() {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WeatherProvider({ children }) {
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const [savedCities, setSavedCities] = useState(loadSaved);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedCities));
  }, [savedCities]);

  const search = useCallback(async (city) => {
    const cityName = city.trim();
    setQuery(cityName);
    setStatus("loading");
    setError("");
    try {
      const [weather, fc] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecast(cityName),
      ]);
      setCurrent(weather);
      setForecast(fc);
      setStatus("success");
    } catch (err) {
      setCurrent(null);
      setForecast(null);
      setError(err.message || "Something went wrong while fetching weather.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setCurrent(null);
    setForecast(null);
    setError("");
    setQuery("");
  }, []);

  const toggleSaveCity = useCallback((weather) => {
    setSavedCities((prev) => {
      const exists = prev.some((c) => c.city.toLowerCase() === weather.city.toLowerCase());
      if (exists) {
        return prev.filter((c) => c.city.toLowerCase() !== weather.city.toLowerCase());
      }
      return [...prev, weather];
    });
  }, []);

  const removeSavedCity = useCallback((cityName) => {
    setSavedCities((prev) => prev.filter((c) => c.city.toLowerCase() !== cityName.toLowerCase()));
  }, []);

  const isSaved = useCallback(
    (cityName) => savedCities.some((c) => c.city.toLowerCase() === (cityName || "").toLowerCase()),
    [savedCities]
  );

  const value = {
    query,
    current,
    forecast,
    status,
    error,
    savedCities,
    search,
    reset,
    toggleSaveCity,
    removeSavedCity,
    isSaved,
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}
