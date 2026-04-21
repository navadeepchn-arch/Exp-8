import React, { useState } from "react";
import "./App.css";

function App() {
  // ─── STATE ─────────────────────────────────────────────
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // ─── HANDLE INPUT ──────────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // ─── VALIDATION LOGIC ──────────────────────────────────
  const validate = () => {
    if (form.username.trim().length < 3) {
      return "Username must be at least 3 characters";
    }
    if (form.password.trim().length < 5) {
      return "Password must be at least 5 characters";
    }
    return null;
  };

  // ─── SUBMIT ────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    // fake authentication logic
    if (form.username === "admin" && form.password === "12345") {
      setLoggedIn(true);
      setSuccess("Login Successful!");
    } else {
      setError("Invalid credentials");
    }
  };

  // ─── LOGOUT ────────────────────────────────────────────
  const handleLogout = () => {
    setLoggedIn(false);
    setForm({ username: "", password: "" });
    setSuccess("");
    setError("");
  };

  // ─── UI ────────────────────────────────────────────────
  return (
    <div className="container">

      <div className="card">

        <div className="title">Secure Login Portal</div>
        <div className="subtitle">React State Management • Experiment 8.1</div>

        {!loggedIn ? (
          <form onSubmit={handleSubmit} className="form">

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <button type="submit">Login</button>
          </form>
        ) : (
          <div className="dashboard">
            <h2>Welcome, {form.username}</h2>
            <p>You are successfully authenticated.</p>

            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;