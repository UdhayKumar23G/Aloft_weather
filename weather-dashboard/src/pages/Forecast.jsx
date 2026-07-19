import { useNavigate } from "react-router-dom";
import { useWeather } from "../hooks/useWeather.js";
import CitySearch from "../components/CitySearch.jsx";
import ForecastCard from "../components/ForecastCard.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage, { EmptyState } from "../components/ErrorMessage.jsx";

export default function Forecast() {
  const { query, forecast, status, error, search } = useWeather();
  const navigate = useNavigate();

  return (
    <div>
      <div className="eyebrow">STN.02 · FORECAST</div>
      <h1 className="page-title">Forecast view</h1>
      <p className="page-sub">A 5-day outlook plus the next 24 hours, hour by hour.</p>

      <div style={{ marginTop: 26 }}>
        <CitySearch onSearch={search} initialValue={query} busy={status === "loading"} />
      </div>

      {status === "loading" && <Loader label="Pulling the outlook…" />}

      {status === "error" && <ErrorMessage message={error} onRetry={() => search(query)} />}

      {status === "success" && forecast && <ForecastCard forecast={forecast} />}

      {status === "idle" && (
        <EmptyState
          title="No forecast loaded"
          message="Search a city to see its 5-day and hourly outlook."
          action={
            <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={() => navigate("/search")}>
              Go to search
            </button>
          }
        />
      )}
    </div>
  );
}
