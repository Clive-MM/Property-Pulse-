import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../styles/styles.css";

function Signup() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          role,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("User registered successfully!");
        setErrorMessage("");
        setUsername("");
        setEmail("");
        setRole("");
        setPassword("");
        // Redirect to login page upon successful registration
        navigate("/login");
      } else {
        setErrorMessage(data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
      setSuccessMessage("");
    }
  };

  const showOptions = () => {
    var dataList = document.getElementById("rolelist");
    dataList.style.display = "block";
  };

  return (
    <div
      id="container"
      className="d-flex justify-content-center align-items-center"
    >
      <div>
        <h1>Register</h1>

        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              className="form-control form-control-sm"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="role"
              className="form-control form-control-sm"
              list="rolelist"
              id="role"
              placeholder="Choose your role"
              onClick={showOptions}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <datalist id="rolelist" style={{ display: "none" }}>
              <option value="Landlord"></option>
              <option value="Tenant"></option>
            </datalist>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control form-control-sm"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-success"
              style={{ marginTop: "1em" }}
              onClick={handleRegister}
            >
              Submit
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
