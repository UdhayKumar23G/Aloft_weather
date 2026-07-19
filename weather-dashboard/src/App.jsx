import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">
        <AppRoutes />
      </main>
      <footer className="footer">
        ALOFT WEATHER STATION — data is simulated for demo purposes · built with React &amp; React Router
      </footer>
    </div>
  );
}
