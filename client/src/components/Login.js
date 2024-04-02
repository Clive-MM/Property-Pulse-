import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access_token); // Store access token in localStorage
        // Redirect user to dashboard based on their role
        if (data.role === "Landlord") {
          navigate("/landlorddashboard");
        } else if (data.role === "Tenant") {
          navigate("/tenantDashboard");
        } else {
           // Handle invalid role case
          console.log("Invalid role"); 
        }
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div
        id="container"
        className="d-flex justify-content-center align-items-center"
      >
        <form onSubmit={(e) => {
          e.preventDefault(); 
          handleLogin(); 
        }}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              className="form-control form-control-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="form-control form-control-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="form-group mt-3"> 
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
