import React from "react";
import "../styles/styles.css";


function AboutUs() {
  return (
    <div>
     <div id="navbar">
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container">
            <a className="navbar-brand" href="/">
              <h1 style={{ marginLeft: "1em" }}>PROPERTY PULSE</h1>
              <p>
                <em style={{ color: "blue", marginLeft: ".5em" }}>Click Your Way Home</em>
              </p>
            </a>
          </div>
          <div className="container">
            <a className="navbar-brand" href="/">HOME</a>
          </div>

          <div className="container">
            <a className="navbar-brand" href="/aboutus">ABOUT US</a>
          </div>

          <div className="container">
            <a className="navbar-brand" href="/contactus">CONTACTS</a>
          </div>

          <div className="container">
            <a className="navbar-brand" href="/login">LOG IN</a>
          </div>
        </nav>
      </div>

      <div>
        <h1 className="text-muted">ABOUT US</h1>
      </div>

      <div class="card mb-4" style={{ maxWidth: "100%", height: "12em" }}>
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="..." class="card-img" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">MISSION</h5>
              <p class="card-text">
                <em>
                  {" "}
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
      <div class="card mb-4" style={{ maxWidth: "100%", height: "12em" }}>
        <div class="row no-gutters">
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">VISION</h5>
              <p class="card-text">
                <em>
                  To become the leading online destination for individuals
                  seeking rental properties, offering a seamless and efficient
                  experience for both tenants and landlords, while fostering a
                  sense of community and trust within the real estate market.
                </em>
              </p>
              
            </div>
          </div>
          <div class="col-md-4">
            <img src="..." class="card-img" alt="..." />
          </div>
        </div>
      </div>

      <div class="card bg-dark text-white" style={{ height: "20em" }}>
        <img src="..." class="card-img" alt="..." />
        <div class="card-img-overlay">
          <h5 class="card-title">FEATURES</h5>
          <p class="card-text">
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
