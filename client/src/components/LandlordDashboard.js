import React, { useState, useEffect } from "react";
import "../styles/styles.css";

// Import components
import Profile from "./Profile";
import Category from "./Category";
import CreateApartment from "./CreateApartment";
import Billing from "./Billing";
import Review from "./Review";
import Notification from "./Notification";
import Message from "./Message";
import Bookings from "./Bookings";

function LandlordDashboard() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [username, setUsername] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

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
        // Redirect to the home page
        window.location.href = "/";
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="dashboard">
      <div id="navbar">
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container">
            <a className="navbar-brand" href="/" style={{ cursor: "pointer" }}>
              <h1 style={{ marginLeft: "1em" }}>PROPERTY PULSE</h1>
              <p>
                <em style={{ color: "blue", marginLeft: ".5em" }}>Click Your Way Home</em>
              </p>
            </a>
          </div>
        </nav>
      </div>

      <div className="row" id="dashboard">
        <div className={`col-sm-6 ${isSidebarExpanded ? "expanded" : "collapsed"}`} id="sidepane">
          <div className="card" style={{ height: "46em", marginLeft: "3px" }}>
            <div className="card-body">
              <div className="menu-item" onClick={toggleSidebar} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                <i className={`fas fa-${isSidebarExpanded ? "angle-left" : "bars"}`}></i>
                {isSidebarExpanded && <span className="menu-text"><strong>MENU</strong></span>}
              </div>

              <div className="menu-item" onClick={() => handleLinkClick(<Profile />)} style={{ marginTop: "1.5em" }}>
                <i className="fas fa-user"></i>
                {isSidebarExpanded && <span className="menu-text">PROFILE</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<CreateApartment />)} style={{ marginTop: "1.5em" }}>
                <i className="fas fa-building"></i>
                {isSidebarExpanded && <span className="menu-text">APARTMENTS</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<Category />)} style={{ marginTop: "1.5em" }}>
                <i className="fas fa-tags"></i>
                {isSidebarExpanded && <span className="menu-text">CATEGORY</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<Bookings />)} style={{ marginTop: "1.5em" }}>
                <i className="fas fa-calendar-check"></i>
                {isSidebarExpanded && <span className="menu-text">BOOKINGS</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<Billing />)} style={{ marginTop: "1.5em" }}>
                <i className="fas fa-file-invoice-dollar"></i>
                {isSidebarExpanded && <span className="menu-text">BILLINGS</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<Notification />)} style={{ marginTop: "1.5em" }}>
                <i className="fas fa-bell"></i>
                {isSidebarExpanded && <span className="menu-text">NOTIFICATIONS</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<Message />)} style={{ marginTop: "1.5em" }}>
                <i className="fas fa-envelope"></i>
                {isSidebarExpanded && <span className="menu-text">MESSAGES</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<Review />)} style={{ marginTop: "1.5em" }}>
                <i className="fas fa-star"></i>
                {isSidebarExpanded && <span className="menu-text">REVIEW</span>}
              </div>
              <div className="menu-item" onClick={handleLogout} style={{ marginTop: "2em" }}>
                <i className="fas fa-sign-out-alt"></i>
                {isSidebarExpanded && <span className="menu-text">LOG OUT</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6" id="main-body">
          <div className="card" style={{ height: "46em", width: "60em", marginRight: "3em" }}>
            <h5 className="text-muted">Hello {username}</h5>
            <div className="card-body">
              {activeComponent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandlordDashboard;
