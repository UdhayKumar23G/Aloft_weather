export default function SavedCityCard({ city, onOpen, onRemove }) {
  return (
    <div className="saved-card" onClick={() => onOpen(city.city)}>
      <div className="saved-card-top">
        <div>
          <div className="saved-city">
            {city.icon} {city.city}
          </div>
          <div className="station-code mono">{city.condition}</div>
        </div>
        <button
          className="saved-remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(city.city);
          }}
          aria-label={`Remove ${city.city} from saved cities`}
        >
          ×
        </button>
      </div>
      <div className="saved-temp mono">{city.temp}°C</div>
    </div>
  );
}
