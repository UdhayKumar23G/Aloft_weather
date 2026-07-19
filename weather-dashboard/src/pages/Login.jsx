import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      login(form);
      const dest = location.state?.from || "/saved";
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="eyebrow">STN.06 · LOG IN</div>
      <h1 className="page-title" style={{ fontSize: 26, marginTop: 8 }}>
        Welcome back
      </h1>
      <p className="page-sub" style={{ marginTop: 8 }}>
        Log in to see the cities you've saved.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>

      <div className="auth-switch">
        No account yet? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
