// A small seed dataset so common cities return believable, stable
// readings, and unknown cities fall back to a generated-but-consistent
// profile (see services/weatherApi.js).

export const sampleCities = [
  {
    name: "Hyderabad",
    country: "IN",
    lat: 17.385,
    lon: 78.4867,
    baseTemp: 31,
    climate: "warm",
  },
  {
    name: "London",
    country: "GB",
    lat: 51.5072,
    lon: -0.1276,
    baseTemp: 16,
    climate: "mild",
  },
  {
    name: "New York",
    country: "US",
    lat: 40.7128,
    lon: -74.006,
    baseTemp: 22,
    climate: "temperate",
  },
  {
    name: "Tokyo",
    country: "JP",
    lat: 35.6762,
    lon: 139.6503,
    baseTemp: 24,
    climate: "temperate",
  },
  {
    name: "Reykjavik",
    country: "IS",
    lat: 64.1466,
    lon: -21.9426,
    baseTemp: 8,
    climate: "cold",
  },
  {
    name: "Dubai",
    country: "AE",
    lat: 25.2048,
    lon: 55.2708,
    baseTemp: 38,
    climate: "hot",
  },
  {
    name: "Cape Town",
    country: "ZA",
    lat: -33.9249,
    lon: 18.4241,
    baseTemp: 19,
    climate: "mild",
  },
  {
    name: "Sydney",
    country: "AU",
    lat: -33.8688,
    lon: 151.2093,
    baseTemp: 21,
    climate: "temperate",
  },
];

export const popularSearches = [
  "Hyderabad",
  "London",
  "New York",
  "Tokyo",
  "Dubai",
  "Sydney",
];
