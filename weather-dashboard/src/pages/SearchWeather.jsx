import { useNavigate } from "react-router-dom";
import { useWeather } from "../hooks/useWeather.js";
import CitySearch from "../components/CitySearch.jsx";
import WeatherCard from "../components/WeatherCard.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage, { EmptyState } from "../components/ErrorMessage.jsx";

export default function SearchWeather() {
  const { query, current, status, error, search, toggleSaveCity, isSaved } = useWeather();
  const navigate = useNavigate();

  return (
    <div>
      <div className="eyebrow">STN.01 · SEARCH</div>
      <h1 className="page-title">Search weather</h1>
      <p className="page-sub">Look up current conditions for any city, then jump to its forecast.</p>

      <div style={{ marginTop: 26 }}>
        <CitySearch onSearch={search} initialValue={query} busy={status === "loading"} />
      </div>

      {status === "loading" && <Loader label={`Reaching station at "${query}"…`} />}

      {status === "error" && (
        <ErrorMessage message={error} onRetry={() => search(query)} />
      )}

      {status === "success" && current && (
        <>
          <WeatherCard weather={current} saved={isSaved(current.city)} onToggleSave={toggleSaveCity} />
          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-outline" onClick={() => navigate("/forecast")}>
              View 5-day forecast →
            </button>
          </div>
        </>
      )}

      {status === "idle" && (
        <EmptyState
          title="No city selected yet"
          message="Search a city above, or pick one of the quick chips to see a live reading."
        />
      )}
    </div>
  );
}
