import React, { useState, useEffect } from "react";
import "../styles/styles.css";

// Import components
import Profile from "./Profile";
import ViewApartments from "./ViewApartments";
import Review from "./Review";
import Enquiry from "./Enquiry";
import ViewBillings from "./ViewBillings";
import Message from "./Message";

function TenantDashboard() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [username, setUsername] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // Set to true for default expanded state

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
        localStorage.clear();
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
    <div className="dashboard" style={styles.dashboard}>
      <div id="navbar">
        <nav className="navbar navbar-expand-lg navbar-custom" style={styles.navbar}>
          <div className="container">
            <a className="navbar-brand" href="/" style={{ cursor: "pointer" }}>
              <h1 style={styles.brandTitle}>PROPERTY PULSE</h1>
              <p style={styles.brandSubtitle}>
                <em>Click Your Way Home</em>
              </p>
            </a>
          </div>
        </nav>
      </div>

      <div className="row" id="dashboard" style={{ height: "100%" }}>
        <div
          className={`col-sm-3 sidepane ${isSidebarExpanded ? "expanded" : "collapsed"}`}
          id="sidepane"
          style={isSidebarExpanded ? styles.expanded : styles.collapsed}
        >
          <div className="card" style={{ ...styles.card }}>
            <div className="card-body" style={styles.cardBody}>
              <div className="menu-item" onClick={toggleSidebar} style={styles.menuItem}>
                <i className={`fas fa-${isSidebarExpanded ? "angle-left" : "bars"}`} style={styles.icon}></i>
                {isSidebarExpanded && <span className="menu-text" style={styles.menuText}><strong>MENU</strong></span>}
              </div>

              <div className="menu-item" onClick={() => handleLinkClick(<Profile />)} style={styles.menuItem}>
                <i className="fas fa-user" style={styles.icon}></i>
                {isSidebarExpanded && <span className="menu-text" style={styles.menuText}>PROFILE</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<ViewApartments />)} style={styles.menuItem}>
                <i className="fas fa-building" style={styles.icon}></i>
                {isSidebarExpanded && <span className="menu-text" style={styles.menuText}>APARTMENTS</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<ViewBillings />)} style={styles.menuItem}>
                <i className="fas fa-file-invoice-dollar" style={styles.icon}></i>
                {isSidebarExpanded && <span className="menu-text" style={styles.menuText}>BILLINGS</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<Enquiry />)} style={styles.menuItem}>
                <i className="fas fa-question-circle" style={styles.icon}></i>
                {isSidebarExpanded && <span className="menu-text" style={styles.menuText}>ENQUIRY</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<Message />)} style={styles.menuItem}>
                <i className="fas fa-envelope" style={styles.icon}></i>
                {isSidebarExpanded && <span className="menu-text" style={styles.menuText}>MESSAGES</span>}
              </div>
              <div className="menu-item" onClick={() => handleLinkClick(<Review />)} style={styles.menuItem}>
                <i className="fas fa-star" style={styles.icon}></i>
                {isSidebarExpanded && <span className="menu-text" style={styles.menuText}>REVIEW</span>}
              </div>
              <div className="menu-item" onClick={handleLogout} style={{ ...styles.menuItem, marginTop: "4em" }}>
                <i className="fas fa-sign-out-alt" style={styles.icon}></i>
                {isSidebarExpanded && <span className="menu-text" style={styles.menuText}>LOG OUT</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-9 main-content" style={styles.mainBody}>
          <div className="card" style={styles.card}>
            <h5 className="text-muted" style={styles.textMuted}>Hello {username}</h5>
            <div className="card-body" style={styles.cardBody}>
              {activeComponent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    background: "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", 
    color: "#fff",
    minHeight: "100vh",
    padding: "2em",
  },
  navbar: {
    background: "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", 
  },
  brandTitle: {
    marginLeft: "1em",
    fontSize: "2em",
    fontWeight: "bold",
    fontFamily: "'Roboto', sans-serif",
    color: "#fff",
  },
  brandSubtitle: {
    color: "#fff",
    marginLeft: ".5em",
    fontFamily: "'Roboto', sans-serif",
  },
  card: {
    height: "100%",
    width: "100%",
    background: "rgba(255, 255, 255, 0.2)", 
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    transition: "width 0.3s ease", // Smooth transition for width change
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "2em",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    cursor: "pointer",
    transition: "padding 0.3s ease",
    color: "#fff",
    marginTop: "1.5em",
  },
  icon: {
    fontSize: "1.5em",
    marginRight: "0.5em",
  },
  menuText: {
    fontSize: "1.2em",
    fontFamily: "'Roboto', sans-serif",
  },
  expanded: {
    width: "250px", 
  },
  collapsed: {
    width: "135px", 
  },
  mainBody: {
    background: "rgba(255, 255, 255, 0.2)", 
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)", 
    padding: "2em",
    flexGrow: 1, 
    transition: "flex-grow 0.3s ease", 
  },
  textMuted: {
    color: "#ddd",
  },
};

export default TenantDashboard;
