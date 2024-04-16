import React, { useState, useEffect } from "react";
import "../styles/styles.css";

// Import components
import Profile from "./Profile";
import ViewApartments from "./ViewApartments";
import Review from "./Review";
import Enquiry from "./Equiry";
import ViewBillings from "./ViewBillings";
import Message from "./Message";

function TenantDashboard() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://127.0.0.1:5000/username", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          console.error("Failed to fetch username:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const handleLinkClick = (component) => {
    setActiveComponent(component);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/logout", {
        method: "POST",
      });
      if (response.ok) {
        // Clear localStorage
        localStorage.clear();
        // Redirect to the login page
        window.location.href = "/login"; // Change to your login page URL
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="dashboard">
      <div id="navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              <h1 style={{ marginLeft: "1em" }}>PROPERTY PULSE</h1>
              <p>
                <em style={{ color: "blue", marginLeft: ".5em" }}>
                  Click Your Way Home
                </em>
              </p>
            </a>
          </div>
          <div className="container">
            <a className="navbar-brand" href="/">
              HOME
            </a>
          </div>
        </nav>
      </div>

      <div className="row" id="dashboard">
        <div className="col-sm-6" id="sidepane">
          <div className="card" style={{ width: "12em", height: "40em", marginLeft: "3px" }}>
            <div className="card-body">
              <div>
                <a href="/tenantDashboard">
                  <h6><strong>DASHBOARD</strong></h6>
                </a>
              </div>

              <div onClick={() => handleLinkClick(<Profile />)} style={{ marginTop: "3em" }}>
                <h6>PROFILE</h6>
              </div>
              <div onClick={() => handleLinkClick(<ViewApartments />)} style={{ marginTop: "3em" }}>
                <h6>APARTMENTS</h6>
              </div>
             
              
              <div onClick={() => handleLinkClick(<ViewBillings />)} style={{ marginTop: "3em" }}>
                <h6>BILLINGS</h6>
              </div>
              <div onClick={() => handleLinkClick(<Enquiry />)} style={{ marginTop: "3em" }}>
                <h6>ENQUIRY</h6>
              </div>

              <div onClick={() => handleLinkClick(<Message />)} style={{ marginTop: "3em" }}>
                <h6>MESSAGES</h6>
              </div>
              <div onClick={handleLogout} style={{ marginTop: "9em" }}>
                <h6>LOG OUT</h6>
              </div>
              
            </div>
          </div>
        </div>

        <div className="col-sm-6" id="main body">
          <div className="card" style={{ height: "40em", width: "60em", marginRight: "3em" }}>
          <h5 className=" text-muted" >Hello {username}</h5>

            <div className="card-body">
              {activeComponent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantDashboard;
