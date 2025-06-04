import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Add forgot password logic here
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
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
