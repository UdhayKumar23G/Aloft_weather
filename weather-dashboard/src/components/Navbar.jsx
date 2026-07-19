import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Search" },
  { to: "/forecast", label: "Forecast" },
  { to: "/saved", label: "Saved" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span className="brand-mark">AL</span>
          Aloft
        </div>

        <nav className="nav-links">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-user">
          {isAuthenticated ? (
            <>
              <span className="nav-link mono">{user.name.split(" ")[0]}</span>
              <button className="nav-ghost-btn" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Log in
              </NavLink>
              <NavLink to="/signup" className="nav-ghost-btn" style={{ display: "inline-block" }}>
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
