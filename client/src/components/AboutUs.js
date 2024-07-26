import React from "react";
import "../styles/styles.css";
import rentalhouses from "../components/images/rentalhouses.jpg";
import rent from "../components/images/rent.jpg";
import rentalhouses2 from "../components/images/rentalhouses2.jpg";

function AboutUs() {
  return (
    <div>
      <div id="navbar">
        <nav className="navbar navbar-expand-lg navbar-custom">
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
          <div className="ml-auto d-flex">
            <a className="nav-link" href="/" >
              <i className="fas fa-home"></i>
              <span className="nav-text">HOME</span>
            </a>

            <a className="nav-link" href="/contactus" >
              <i className="fas fa-envelope"></i>
              <span className="nav-text">CONTACTS</span>
            </a>
            <a className="nav-link" href="/login" >
              <i className="fas fa-sign-in-alt"></i>
              <span className="nav-text">LOGIN</span>
            </a>
          </div>
        </nav>
      </div>

      <div className="card mb-4" style={{ maxWidth: "100%", height: "12em" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={rent}
              className="card-img"
              alt="Mission"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "1.5em", fontWeight: "bold" }}
              >
                MISSION
              </h5>
              <p className="card-text" style={{ fontSize: "1.2em" }}>
                <em>
                  To simplify the process of finding and renting the perfect
                  home by providing a user-friendly platform that connects
                  tenants with landlords, offering a wide range of high-quality
                  housing options.
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4" style={{ maxWidth: "100%", height: "12em" }}>
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "1.5em", fontWeight: "bold" }}
              >
                VISION
              </h5>
              <p className="card-text" style={{ fontSize: "1.2em" }}>
                <em>
                  To become the leading online destination for individuals
                  seeking rental properties, offering a seamless and efficient
                  experience for both tenants and landlords, while fostering a
                  sense of community and trust within the real estate market.
                </em>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <img
              src={rentalhouses2}
              className="card-img"
              alt="Vision"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>
        </div>
      </div>

      <div className="card bg-dark text-white" style={{ height: "20em" }}>
        <img
          src={rentalhouses}
          className="card-img"
          alt="Rental Houses"
          style={{ objectFit: "cover", height: "100%" }}
        />
        <div className="card-img-overlay">
          <h5
            className="card-title"
            style={{ fontSize: "1.5em", fontWeight: "bold" }}
          >
            FEATURES
          </h5>
          <p className="card-text" style={{ fontSize: "1.2em" }}>
            <em>
              Discover your dream home effortlessly with Property Pulse. Our
              platform simplifies house hunting and property management by
              offering seamless booking, browsing, and showcasing of apartments.
              Enjoy smooth communication between clients and landlords for quick
              query resolution. Plus, our system manages amenity billings and
              sends timely notifications, keeping everyone informed and
              connected.
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
