import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import SearchWeather from "../pages/SearchWeather.jsx";
import Forecast from "../pages/Forecast.jsx";
import SavedCities from "../pages/SavedCities.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchWeather />} />
      <Route path="/forecast" element={<Forecast />} />
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <SavedCities />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="state-block">
      <div style={{ fontSize: 26 }}>404</div>
      <div className="state-title">This station doesn't exist</div>
      <div className="state-sub">Check the URL, or head back to the home page.</div>
    </div>
  );
}
