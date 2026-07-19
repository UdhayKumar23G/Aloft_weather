import { useRef, useState } from "react";
import { popularSearches } from "../data/sampleCities.js";

export default function CitySearch({ onSearch, initialValue = "", busy = false }) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    onSearch(trimmed);
  }

  function handleChipClick(city) {
    setValue(city);
    onSearch(city);
  }

  return (
    <div>
      <form className="search-row" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search a city — e.g. Hyderabad, London, Tokyo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="City name"
        />
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Searching…" : "Search"}
        </button>
      </form>

      <div className="chip-row">
        {popularSearches.map((city) => (
          <button
            key={city}
            type="button"
            className="chip"
            onClick={() => handleChipClick(city)}
            disabled={busy}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
