import { clamp } from "../utils/helpers.js";

export default function WeatherCard({ weather, saved, onToggleSave }) {
  if (!weather) return null;

  const humidityPct = clamp(weather.humidity, 0, 100);
  const windPct = clamp((weather.windSpeed / 40) * 100, 0, 100);
  const pressurePct = clamp(((weather.pressure - 970) / 60) * 100, 0, 100);

  const updated = new Date(weather.updatedAt);

  return (
    <div className="station-card">
      <div className="station-head">
        <div>
          <div className="station-place">
            {weather.icon} {weather.city}
            {weather.country && weather.country !== "—" ? `, ${weather.country}` : ""}
          </div>
          <div className="station-code mono">
            STATION LOG · UPDATED{" "}
            {updated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
        <button
          className={"save-toggle" + (saved ? " is-saved" : "")}
          onClick={() => onToggleSave(weather)}
        >
          {saved ? "★ Saved" : "☆ Save city"}
        </button>
      </div>

      <div className="station-reading">
        <div className="temp-big mono">
          {weather.temp}
          <span className="temp-unit">°C</span>
        </div>
        <div className="condition-block">
          <div className="condition-name">{weather.condition}</div>
          <div className="condition-feels">FEELS LIKE {weather.feelsLike}°C</div>
        </div>
      </div>

      <div className="gauge-strip">
        <div className="gauge">
          <div className="gauge-label">Humidity</div>
          <div className="gauge-value">{weather.humidity}%</div>
          <div className="gauge-bar">
            <div className="gauge-bar-fill" style={{ width: `${humidityPct}%` }} />
          </div>
        </div>
        <div className="gauge">
          <div className="gauge-label">Wind speed</div>
          <div className="gauge-value">{weather.windSpeed} km/h</div>
          <div className="gauge-bar">
            <div className="gauge-bar-fill" style={{ width: `${windPct}%` }} />
          </div>
        </div>
        <div className="gauge">
          <div className="gauge-label">Pressure</div>
          <div className="gauge-value">{weather.pressure} hPa</div>
          <div className="gauge-bar">
            <div className="gauge-bar-fill" style={{ width: `${pressurePct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
