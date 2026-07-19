import { createContext, useContext, useEffect, useState } from "react";
import { isValidEmail } from "../utils/helpers.js";

// A front-end-only mock auth system. Accounts are stored in localStorage
// so signup/login/logout behave realistically across a page refresh,
// with no backend required. Swap this for real calls to your auth API
// (e.g. fetch("/api/login", ...)) when one exists.

const USERS_KEY = "aloft.users";
const SESSION_KEY = "aloft.session";

const AuthContext = createContext(null);

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  function signup({ name, email, password }) {
    if (!name.trim() || !email.trim() || !password) {
      throw new Error("Fill in every field to create an account.");
    }
    if (!isValidEmail(email)) {
      throw new Error("Enter a valid email address.");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with that email already exists.");
    }
    const newUser = { name: name.trim(), email: email.trim().toLowerCase(), password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const session = { name: newUser.name, email: newUser.email };
    setUser(session);
    return session;
  }

  function login({ email, password }) {
    if (!email.trim() || !password) {
      throw new Error("Enter your email and password.");
    }
    const users = loadUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (!match) {
      throw new Error("No account matches that email and password.");
    }
    const session = { name: match.name, email: match.email };
    setUser(session);
    return session;
  }

  function logout() {
    setUser(null);
  }

  const value = { user, isAuthenticated: Boolean(user), signup, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
