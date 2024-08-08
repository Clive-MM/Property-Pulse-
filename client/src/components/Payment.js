import React, { useEffect } from "react";
import "../styles/styles.css";
import rentalhouses2 from "../components/images/rentalhouses2.jpg";

function Homepage() {
  useEffect(() => {
    const tabLinks = document.querySelectorAll(".nav-link[data-tab]");
    const tabContents = document.querySelectorAll(".card-text");

    const handleTabClick = (event) => {
      event.preventDefault();

      const tabId = event.currentTarget.getAttribute("data-tab");

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // Show the selected tab content
      const selectedContent = document.getElementById(tabId + "-content");
      if (selectedContent) {
        selectedContent.style.display = "block";
      }
    };

    tabLinks.forEach((tab) => {
      tab.addEventListener("click", handleTabClick);
    });

    // Show default tab content when component mounts
    const defaultContent = document.getElementById("acquisition-content");
    if (defaultContent) {
      defaultContent.style.display = "block";
    }

    // Hide other tab contents
    tabContents.forEach((content) => {
      if (content.id !== "acquisition-content") {
        content.style.display = "none";
      }
    });

    // Trigger fade-in animation on page load
    const hiddenTexts = document.querySelectorAll(".hidden-text");
    hiddenTexts.forEach((text) => {
      text.classList.add("show-text");
    });

    // Cleanup event listeners on component unmount
    return () => {
      tabLinks.forEach((tab) => {
        tab.removeEventListener("click", handleTabClick);
      });
    };
  }, []);

  return (
    <div className="homepage">
      <div id="navbar">
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container">
            <a className="navbar-brand" href="/">
              <h1>PROPERTY PULSE</h1>
              <p>
                <em>Click Your Way Home</em>
              </p>
            </a>
          </div>
          <div className="ml-auto d-flex">
            <a className="nav-link" href="/aboutus">
              <i className="fas fa-info-circle"></i>
              <span className="nav-text">ABOUT US</span>
            </a>

            <a className="nav-link" href="/contactus" title="Contacts">
              <i className="fas fa-phone"></i>
              <span className="nav-text">CONTACTS</span>
            </a>

            <a className="nav-link" href="/login">
              <i className="fas fa-sign-in-alt"></i>
              <span className="nav-text">LOGIN</span>
            </a>
          </div>
        </nav>
      </div>

      <div className="main-content">
        <div className="left-half">
          <img src={rentalhouses2} alt="Building" className="hero-image" />
        </div>
        <div className="right-half">
          <div className="text-container">
            <h1 className="hero-title">Always Ready to Make Your Life Better</h1>
            <div className="card" id="summary">
              <div className="card-body">
                <h5 className="card-title hidden-text">WHAT DO WE OFFER?</h5>
                <p className="card-text hidden-text">
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
                </p>
                <a href="/aboutus" className="btn btn-primary hidden-text">
                  ABOUT US
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer bg-primary text-white text-center text-lg-start">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">PROPERTY PULSE</h5>
              <p>
                <em>Click your way home.</em>
              </p>
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
              <a href="/contactus">
                <h5 className="text-uppercase mb-0">CONTACT US</h5>
              </a>

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
        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
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
