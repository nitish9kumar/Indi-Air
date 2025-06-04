import React, { useState, useEffect } from "react";

const dummyUsers = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
  { username: "user4", password: "password4" },
  { username: "user5", password: "password5" },
];

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem('pageName', 'Login Page');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = dummyUsers.find(
      (u) => u.username === email && u.password === password
    );
    if (user) {
      localStorage.setItem("loggedInUser", user.username);
      window.location.href = "/"; // Redirect to home page
    } else {
      setError("Invalid username or password");
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5"
  };

  const formStyle = {
    maxWidth: "400px",
    width: "100%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white"
  };

  const formGroupStyle = {
    marginBottom: "15px"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  const linksStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Username:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <div style={linksStyle}>
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
