export default function ForecastCard({ forecast }) {
  if (!forecast) return null;

  const highs = forecast.daily.map((d) => d.high);
  const maxHigh = Math.max(...highs);
  const minHighForChart = Math.min(...highs) - 4;

  return (
    <div>
      <div className="section-head">
        <div className="section-title">5-day outlook</div>
        <div className="section-count mono">{forecast.city}</div>
      </div>

      <div className="forecast-grid">
        {forecast.daily.map((d) => (
          <div className="forecast-card" key={d.day}>
            <div className="forecast-day">{d.day.toUpperCase()}</div>
            <div className="forecast-icon">{d.icon}</div>
            <div className="forecast-temp mono">
              {d.high}°<span className="forecast-temp-lo">/{d.low}°</span>
            </div>
            <div className="forecast-cond">{d.condition}</div>
          </div>
        ))}
      </div>

      <div className="chart-bars">
        {forecast.daily.map((d) => {
          const height = Math.max(
            10,
            ((d.high - minHighForChart) / (maxHigh - minHighForChart + 0.001)) * 100
          );
          return (
            <div className="chart-bar-col" key={d.day + "-bar"}>
              <span className="mono" style={{ fontSize: 11, color: "var(--paper-dim)" }}>
                {d.high}°
              </span>
              <div className="chart-bar" style={{ height: `${height}%` }} />
              <div className="chart-bar-label">{d.day}</div>
            </div>
          );
        })}
      </div>

      <div className="section-head">
        <div className="section-title">Next 24 hours</div>
      </div>
      <div className="hourly-row">
        {forecast.hourly.map((h) => (
          <div className="hourly-item" key={h.time}>
            <div className="hourly-time">{h.time}</div>
            <div className="hourly-temp mono">{h.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
