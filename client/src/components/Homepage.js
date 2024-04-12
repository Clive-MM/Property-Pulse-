import React, { useEffect } from "react";
import "../styles/styles.css";

function Homepage() {
  useEffect(() => {
    const tabLinks = document.querySelectorAll(".nav-link");

    tabLinks.forEach((tab) => {
      tab.addEventListener("click", function (event) {
        event.preventDefault();

        const tabId = this.getAttribute("data-tab");

        // Hide all tab contents
        document.querySelectorAll(".card-text").forEach((content) => {
          content.style.display = "none";
        });

        // Show the selected tab content
        document.getElementById(tabId + "-content").style.display = "block";
      });
    });

    // Show default tab content when component mounts
    document.getElementById("acquisition-content").style.display = "block";

    // Hide other tab contents
    document.querySelectorAll(".card-text").forEach((content) => {
      if (content.id !== "acquisition-content") {
        content.style.display = "none";
      }
    });
  }, []);

  return (
    <div className="homepage">
      <div id="navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <a class="navbar-brand" href="/">
              <h1 style={{marginLeft:"1em"}}>PROPERTY PULSE</h1>
              <p>
                <em style={{color:"blue", marginLeft:".5em"}}>Click Your Way Home</em>
              </p>
            </a>
          </div>
          <div class="container">
            <a class="navbar-brand" href="/">
              HOME
            </a>
          </div>

          <div class="container">
            <a class="navbar-brand" href="/aboutus">
              ABOUT US
            </a>
          </div>

          <div class="container">
            <a class="navbar-brand" href="/contactus">
              CONTACTS
            </a>
          </div>

          <div class="container">
            <a class="navbar-brand" href="/login">
              LOG IN
            </a>
          </div>
        </nav>
      </div>

      <div class="card bg-white text-black" id="card">
        <div class="card-img-overlay">
          <p class="card-text">
            <h2>
              <strong>Dreaming of your own slice of paradise?</strong>
            </h2>
            <h3>
              <em>Property Pulse makes it a reality!</em>
            </h3>
          </p>
          <p id="para1">
            <strong>
              <em>
                Say Goodbye to the hassle of house hunting and hello to a smooth
                experience where everything is just a touch and a click away.
              </em>
            </strong>
          </p>

          <p id="para2">
            <strong>
              <em>
                Explore the wide range of apartments varieties tailored to your
                prefered location effortlessly.Find your perfect match and
                settle into your new apartment with ease and comfort.
              </em>
            </strong>
          </p>
        </div>
      </div>

      <div class="row" id="aboutus">
        <div class="col-sm-6" id="products">
          <div class="card" id="summary">
            <div class="card-body">
              <h5 class="card-title">WHAT DO WE OFFER?</h5>
              <p class="card-text">
                <h7>
                  <em>
                    At the heart of our mission is the seamless management of
                    the leasing cycle, ensuring both landlords and tenants
                    experience efficiency and effectiveness. Landlords have the
                    power to effortlessly list their apartments for potential
                    tenants, manage periodic billings, and engage with tenants
                    for any inquiries. Meanwhile, tenants can communicate with
                    landlords as needed when booking or reporting any concerns,
                    while both parties uphold integrity through the upload of
                    verification documents and the provision of lease
                    agreements.
                  </em>
                </h7>
              </p>
              <a href="/aboutus" class="btn btn-primary">
                ABOUT US
              </a>
            </div>
          </div>
        </div>
        <div class="col-sm-6" id="products">
          <div class="card" id="summary">
            <div class="card-body">
              <h5 class="card-title">OUR PRODUCTS</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="card text-center" id="feedback">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link" data-tab="acquisition">
                Acquisition
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-tab="feedback">
                Feedback
              </a>
            </li>
            
          </ul>
        </div>
        <div className="card-body" id="displaycard">
          <div className="card-text" id="acquisition-content">
            Process of renting an apartment
          </div>
          <div className="card-text" id="feedback-content">
            <div class="mb-3">
              <input style={{width:"20em"}}
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="email"
              />
            </div>
            <div class="mb-3">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="message"
              ></textarea>
            </div>
           
          </div>
         
        </div>
      </div>

      <footer
        className="bg-primary text-white text-center text-lg-start"
        id="footer"
      >
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">PROPERTY PULSE</h5>
              <p><em>Click your way home.</em></p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="/" className="text-white">
                    HOME
                  </a>
                </li>
                <li>
                  <a href="/aboutus" className="text-white">
                    ABOUT US
                  </a>
                </li>
                <li>
                  <a href="/login" className="text-white">
                    LOG IN
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0">CONTACT US</h5>
              <section className="mb-4">
                <a
                  data-mdb-ripple-init
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a
                  data-mdb-ripple-init
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter"></i>
                </a>

                <a
                  data-mdb-ripple-init
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-google"></i>
                </a>

                <a
                  data-mdb-ripple-init
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a
                  data-mdb-ripple-init
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>

                <a
                  data-mdb-ripple-init
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-github"></i>
                </a>
              </section>
            </div>
          </div>
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024
          <a className="text-white" href="/">
            <em>www.propertypulse.com</em>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
