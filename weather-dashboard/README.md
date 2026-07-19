# Aloft — Weather Station Dashboard

A React + React Router weather dashboard: search a city, view current conditions,
browse a 5-day/hourly forecast, save favorite cities, and sign up / log in / log out.
Weather data is mocked locally (deterministic per city name) so the app runs with
zero API keys and zero backend.

## Design

The UI intentionally avoids the generic "blue sky gradient" weather-app look. It's
styled as a night-sky instrument panel: deep navy background, amber (sun) + cyan
(data) accents, `Space Grotesk` for display type, `IBM Plex Sans` for body copy,
and `IBM Plex Mono` for all numeric readings — so temperature, humidity, wind, and
pressure read like instrument output rather than icon-and-label cards.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  assets/            static assets
  components/        Navbar, CitySearch, WeatherCard, ForecastCard,
                      SavedCityCard, Loader, ErrorMessage, ProtectedRoute
  pages/              Home, SearchWeather, Forecast, SavedCities,
                      About, Contact, Login, Signup
  context/            WeatherContext (search/forecast/saved state),
                      AuthContext (mock signup/login/logout)
  services/           weatherApi.js — mock "fetch" layer
  hooks/              useWeather.js
  data/               sampleCities.js — seed data for realistic mock readings
  routes/             AppRoutes.jsx — all <Route> definitions
  utils/              helpers.js — formatting + deterministic pseudo-random
  App.jsx, main.jsx, index.css
```

## Routes

| Path       | Page          | Notes                              |
|------------|---------------|-------------------------------------|
| `/`        | Home          | Hero + quick search                 |
| `/search`  | Search        | Search a city, see current reading  |
| `/forecast`| Forecast      | 5-day + hourly outlook              |
| `/saved`   | Saved cities  | **Requires login**                  |
| `/about`   | About         | How the app is built                |
| `/contact` | Contact       | Demo contact form                   |
| `/login`   | Log in        | Mock auth                           |
| `/signup`  | Sign up       | Mock auth                           |

## Auth

Accounts are stored in `localStorage` (`aloft.users`), and the active session in
`aloft.session` — this is a front-end-only demo, not real authentication. Visiting
`/saved` while logged out redirects to `/login` and returns you afterward.

## Connecting a real weather API

Everything the app needs from a weather provider goes through
`src/services/weatherApi.js`. To use a live API (e.g. [OpenWeatherMap](https://openweathermap.org/api)):

1. Get an API key.
2. Replace the body of `fetchCurrentWeather()` and `fetchForecast()` with real
   `fetch()` calls, keeping the same return shape (`{ city, temp, humidity, ... }`
   and `{ city, daily, hourly }`).
3. Everything else (loading/error states, saved cities, forecast UI) keeps working
   unchanged.
