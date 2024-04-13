import React, { useState } from "react";
import "../styles/styles.css";

// Import components
import Profile from "./Profile";
import Category from "./Category";
import CreateApartment from "./CreateApartment";
import Billing from "./Billing";
import Review from "./Review";
import Notification from "./Notification";
import Transactions from "./Transactions";
import Bookings from "./Bookings";
import Account from "./Account";

function LandlordDashboard() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleLinkClick = (component) => {
    setActiveComponent(component);
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
          <div className="card" style={{ width: "12em", height: "30em", marginLeft: "4px" }}>
            <div className="card-body">
              <div>
                <a href="/landlorddashboard">
                  <h6><strong>DASHBOARD</strong></h6>
                </a>
              </div>

              <div onClick={() => handleLinkClick(<Profile />)} style={{ marginTop: "1.5em" }}>
                <h6>PROFILE</h6>
              </div>
              <div onClick={() => handleLinkClick(<CreateApartment />)} style={{ marginTop: "1.5em" }}>
                <h6>APARTMENTS</h6>
              </div>
              <div onClick={() => handleLinkClick(<Category />)} style={{ marginTop: "1.5em" }}>
                <h6>CATEGORY</h6>
              </div>
              <div onClick={() => handleLinkClick(<Bookings />)} style={{ marginTop: "1.5em" }}>
                <h6>BOOKINGS</h6>
              </div>
              <div onClick={() => handleLinkClick(<Transactions />)} style={{ marginTop: "1.5em" }}>
                <h6>TRANSACTIONS</h6>
              </div>
              <div onClick={() => handleLinkClick(<Billing />)} style={{ marginTop: "1.5em" }}>
                <h6>BILLINGS</h6>
              </div>
              <div onClick={() => handleLinkClick(<Notification />)} style={{ marginTop: "1.5em" }}>
                <h6>NOTIFICATION</h6>
              </div>
              <div onClick={() => handleLinkClick(<Review />)} style={{ marginTop: "1.5em" }}>
                <h6>REVIEW</h6>
              </div>
              <div onClick={() => handleLinkClick(<Account />)} style={{ marginTop: "1.5em" }}>
                <h6>ACCOUNT</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6" id="main body">
          <div className="card" style={{ height: "30em", width: "50em", marginRight: "5em" }}>
            <h5>Welcome,username</h5>
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
