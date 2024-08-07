import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

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
    <div id="login" style={styles.pageBackground}>
      <div className="card text-center" style={styles.card}>
        <div className="card-header" style={styles.cardHeader}>
          Login
        </div>

        <div className="card-body" style={styles.cardBody}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="form-group">
              <label style={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                placeholder="email"
                className="form-control form-control-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div className="form-group">
              <label style={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="form-control form-control-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={{ marginTop: "2em" }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={styles.button}
              >
                Login
              </button>
            </div>

            {errorMessage && (
              <div
                className="alert alert-danger mt-3"
                role="alert"
                style={styles.errorAlert}
              >
                {errorMessage}
              </div>
            )}
          </form>
        </div>
        <div className="card-footer text-muted" style={styles.cardFooter}>
          <p style={{ color: "blue" }}>
            Don't have an account?
            <a
              href="/register"
              style={styles.link}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = styles.linkHover.color)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = styles.link.color)
              }
            >
              Sign Up Here
            </a>
          </p>
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
    color: "#fff", 
    backgroundColor: "rgba(0, 0, 0, 0.7)", 
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", 
    color: "white",
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  cardBody: {
    backgroundColor: "#fff",
    padding: "2em",
    
  },
  label: {
    fontSize: "1em",
    color: "#000", 
    fontWeight: "bold",
  },
  input: {
    marginBottom: "1em",
    backgroundColor: "#fff", 
    color: "#000", 
  },
  button: {
    background: "linear-gradient(135deg, violet, navy, neon, pink)", 
    borderColor: "transparent",
    color: "white",
  },
  cardFooter: {
    backgroundColor: "#fff", 
    color: "#000", 
  },
  link: {
    color: "#00f", 
    textDecoration: "none", 
    transition: "color 0.3s", 
  },
  linkHover: {
    color: "green", 
  },
  errorAlert: {
    color: "#fff", 
    backgroundColor: "#f44336", 
    border: "none",
    borderRadius: "0.25em",
  },
};

export default Login;
