// Simple string hash so the same city name always produces the same
// "random" mock weather instead of jumping around on every render.
export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDay(offset) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return offset === 0 ? "Today" : days[d.getDay()];
}

export function formatHour(offset) {
  const d = new Date();
  d.setHours(d.getHours() + offset);
  const h = d.getHours();
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}${suffix}`;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
