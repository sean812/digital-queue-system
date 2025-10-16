import React, { useState } from "react"
import { useApp } from "../App.jsx"

const Auth = ({ role, onAuthSuccess, onBack }) => {
  const { darkMode, toggleDarkMode } = useApp()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock authentication
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || "User",
      email: formData.email,
      role: role
    }
    onAuthSuccess(userData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="card fade-in" style={{ maxWidth: "400px", margin: "2rem auto" }}>
        <button 
          onClick={onBack}
          className="btn btn-outline"
          style={{ marginBottom: "1rem" }}
        >
          ← Back
        </button>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "var(--primary-orange)", marginBottom: "0.5rem" }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p style={{ color: "var(--text-dark)" }}>
            {role === "customer" ? "Customer Portal" : "Staff Portal"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  placeholder="Enter your full name"
                />
              </div>

              {role === "customer" && (
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    required={!isLogin && role === "customer"}
                    placeholder="Enter your phone number"
                  />
                </div>
              )}
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginBottom: "1rem" }}>
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center" }}>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: "none", 
              border: "none", 
              color: "var(--primary-orange)", 
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            {isLogin ? "Don'\''t have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(40, 167, 69, 0.1)", borderRadius: "var(--border-radius)" }}>
          <p style={{ color: "var(--text-dark)", fontSize: "0.8rem", textAlign: "center" }}>
            <strong>Demo:</strong> Use any email and password to continue
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth
