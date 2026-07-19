import { sampleCities } from "../data/sampleCities.js";
import { hashString, seededRandom, formatDay, formatHour, capitalize } from "../utils/helpers.js";

// -----------------------------------------------------------------------
// This project ships without a live API key so it runs anywhere with no
// setup. Every function below is written the way a real fetch() call to
// a provider like OpenWeatherMap would be structured, so swapping in a
// real endpoint later only means editing this file.
//
// To go live:
//   1. Get a free key from https://openweathermap.org/api
//   2. Replace the body of fetchCurrentWeather/fetchForecast with a real
//      fetch() call to their REST endpoints, keeping the same return shape.
// -----------------------------------------------------------------------

const CONDITIONS = [
  { key: "clear", label: "Clear Sky", icon: "☀️" },
  { key: "clouds", label: "Partly Cloudy", icon: "⛅" },
  { key: "overcast", label: "Overcast", icon: "☁️" },
  { key: "rain", label: "Light Rain", icon: "🌦️" },
  { key: "storm", label: "Thunderstorms", icon: "⛈️" },
  { key: "snow", label: "Snow", icon: "🌨️" },
  { key: "fog", label: "Fog", icon: "🌫️" },
];

const NETWORK_DELAY = 700;

function findSeedCity(query) {
  const q = query.trim().toLowerCase();
  return sampleCities.find((c) => c.name.toLowerCase() === q);
}

function buildProfile(query) {
  const seed = findSeedCity(query);
  const nameForSeed = seed ? seed.name : query.trim();
  const hash = hashString(nameForSeed.toLowerCase());

  const baseTemp = seed ? seed.baseTemp : 12 + (hash % 24);
  const conditionIndex = hash % CONDITIONS.length;

  return {
    name: seed ? seed.name : capitalize(query.trim()),
    country: seed ? seed.country : "—",
    baseTemp,
    hash,
    condition: CONDITIONS[conditionIndex],
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates fetching current weather for a city name.
 * Throws for empty/unrealistic input to exercise the error state.
 */
export async function fetchCurrentWeather(query) {
  await delay(NETWORK_DELAY);

  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Enter a city name to search.");
  }
  if (trimmed.length < 2 || /^\d+$/.test(trimmed)) {
    throw new Error(`No station found for "${query}". Check the spelling and try again.`);
  }

  const profile = buildProfile(trimmed);
  const jitter = seededRandom(profile.hash) * 3 - 1.5;
  const temp = Math.round(profile.baseTemp + jitter);

  return {
    city: profile.name,
    country: profile.country,
    temp,
    feelsLike: Math.round(temp + (seededRandom(profile.hash + 1) * 4 - 2)),
    humidity: Math.round(35 + seededRandom(profile.hash + 2) * 50),
    windSpeed: Math.round((4 + seededRandom(profile.hash + 3) * 22) * 10) / 10,
    pressure: Math.round(995 + seededRandom(profile.hash + 4) * 30),
    condition: profile.condition.label,
    icon: profile.condition.icon,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Simulates fetching a 5-day / hourly forecast for a city name.
 */
export async function fetchForecast(query) {
  await delay(NETWORK_DELAY);

  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Enter a city name to see its forecast.");
  }

  const profile = buildProfile(trimmed);

  const daily = Array.from({ length: 5 }).map((_, i) => {
    const seed = profile.hash + i * 17;
    const swing = seededRandom(seed) * 6 - 3;
    const cond = CONDITIONS[(profile.hash + i * 3) % CONDITIONS.length];
    return {
      day: formatDay(i),
      high: Math.round(profile.baseTemp + swing + 2),
      low: Math.round(profile.baseTemp + swing - 5),
      condition: cond.label,
      icon: cond.icon,
    };
  });

  const hourly = Array.from({ length: 8 }).map((_, i) => {
    const seed = profile.hash + i * 31;
    const swing = seededRandom(seed) * 4 - 2;
    return {
      time: formatHour(i * 3),
      temp: Math.round(profile.baseTemp + swing),
    };
  });

  return {
    city: profile.name,
    country: profile.country,
    daily,
    hourly,
  };
}
