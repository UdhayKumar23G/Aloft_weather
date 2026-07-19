import { useNavigate } from "react-router-dom";
import { useWeather } from "../hooks/useWeather.js";
import { useAuth } from "../context/AuthContext.jsx";
import SavedCityCard from "../components/SavedCityCard.jsx";
import { EmptyState } from "../components/ErrorMessage.jsx";

export default function SavedCities() {
  const { savedCities, removeSavedCity, search } = useWeather();
  const { user } = useAuth();
  const navigate = useNavigate();

  function openCity(cityName) {
    search(cityName);
    navigate("/search");
  }

  return (
    <div>
      <div className="eyebrow">STN.03 · SAVED</div>
      <h1 className="page-title">Saved cities</h1>
      <p className="page-sub">
        Signed in as <span className="mono">{user?.email}</span>. Cities you save show up here for
        quick access.
      </p>

      {savedCities.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          message="Search a city and tap “Save city” on its reading to pin it here."
          action={
            <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={() => navigate("/search")}>
              Find a city
            </button>
          }
        />
      ) : (
        <>
          <div className="section-head">
            <div className="section-title">Your list</div>
            <div className="section-count mono">{savedCities.length} saved</div>
          </div>
          <div className="saved-grid">
            {savedCities.map((city) => (
              <SavedCityCard key={city.city} city={city} onOpen={openCity} onRemove={removeSavedCity} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
