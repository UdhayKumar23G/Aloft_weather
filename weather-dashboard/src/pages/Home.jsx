import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWeather } from "../hooks/useWeather.js";

export default function Home() {
  const navigate = useNavigate();
  const { search } = useWeather();
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    search(value.trim());
    navigate("/search");
  }

  return (
    <div>
      <div className="eyebrow">STN.00 · LIVE STATION FEED</div>

      <div className="hero">
        <div>
          <h1 className="hero-title">
            Read the sky
            <br />
            like an <span className="accent">instrument.</span>
          </h1>
          <p className="page-sub" style={{ marginTop: 16 }}>
            Aloft turns a city name into a full station log — temperature, humidity, wind,
            pressure, and a 5-day outlook — logged the way a weather observer would write it down.
          </p>

          <form className="search-row" style={{ marginTop: 28 }} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Try Hyderabad, London, Reykjavik…"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="City name"
            />
            <button type="submit" className="btn btn-primary">
              Check sky
            </button>
          </form>

          <div className="hero-actions">
            <button className="btn btn-outline" onClick={() => navigate("/saved")}>
              View saved cities
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/about")}>
              How this works
            </button>
          </div>
        </div>

        <div className="hero-panel">
          <div className="eyebrow" style={{ marginBottom: 6 }}>
            SAMPLE READING
          </div>
          <div className="hero-panel-row">
            <span>City</span>
            <span className="mono">Hyderabad, IN</span>
          </div>
          <div className="hero-panel-row">
            <span>Temperature</span>
            <span className="mono">31°C</span>
          </div>
          <div className="hero-panel-row">
            <span>Condition</span>
            <span className="mono">Partly Cloudy</span>
          </div>
          <div className="hero-panel-row">
            <span>Humidity</span>
            <span className="mono">58%</span>
          </div>
          <div className="hero-panel-row">
            <span>Wind</span>
            <span className="mono">14.2 km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
