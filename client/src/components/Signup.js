import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Signup() {
  const navigate = useNavigate();

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
    <div id="signup" style={styles.pageBackground}>
      <div className="card text-center" style={styles.card}>
        <div className="card-header" style={styles.cardHeader}>Register</div>
        <div className="card-body" style={styles.cardBody}>
          <form>
            <div className="form-group">
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                type="text"
                className="form-control form-control-sm"
                id="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role" style={styles.label}>Role</label>
              <input
                type="text"
                className="form-control form-control-sm"
                list="rolelist"
                id="role"
                placeholder="Choose your role"
                onClick={showOptions}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={styles.input}
              />
              <datalist id="rolelist" style={{ display: "none" }}>
                <option value="Landlord"></option>
                <option value="Tenant"></option>
              </datalist>
            </div>
            <div className="form-group">
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>
          </form>
        </div>
        <div className="card-footer text-muted" style={styles.cardFooter}>
          <button
            type="button"
            className="btn btn-success"
            style={styles.button}
            onClick={handleRegister}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    background: "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", 
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
  card: {
    width: "30em",
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", 
    color: "white",
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  cardBody: {
    padding: "2em",
  },
  label: {
    fontSize: "1em",
    color: "black",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "1em",
  },
  button: {
    background: "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", 
    borderColor: "transparent",
    color: "white", 
    padding: "0.5em 1em", 
    borderRadius: "5px", 
    cursor: "pointer", 
    transition: "background 0.3s", 
  },
  cardFooter: {
    backgroundColor: "#f8f9fa",
    color: "green",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
};

export default Signup;
