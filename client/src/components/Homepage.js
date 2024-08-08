import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import rentalhouses2 from "../components/images/rentalhouses2.jpg";
import rentalhouses from "../components/images/rentalhouses.jpg";
import rent from "../components/images/rent.jpg";

function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(2); // Default to the index of 'rent'

  const images = [rentalhouses2, rentalhouses, rent]; // Order of images

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [images.length]);

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
            <a className="nav-link" href="/aboutus" data-tab="aboutus">
              <i className="fas fa-info-circle"></i>
              <span className="nav-text">ABOUT US</span>
            </a>
            <a className="nav-link" href="/contactus" data-tab="contactus">
              <i className="fas fa-phone"></i>
              <span className="nav-text">CONTACTS</span>
            </a>
            <a className="nav-link" href="/login" data-tab="login">
              <i className="fas fa-sign-in-alt"></i>
              <span className="nav-text">LOGIN</span>
            </a>
          </div>
        </nav>
      </div>

      <div className="main-content">
        <div className="left-half">
          <div className="slideshow">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={`slide ${index === currentIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
        <div className="right-half">
          <div className="text-container">
            <h1 className="hero-title card-text hidden-text show-text">Let's make your vision come to life</h1>
            <div className="card" id="summary">
              <div className="card-body">
                <h5 className="card-title hidden-text show-text">WHAT DO WE OFFER?</h5>
                <p className="card-text hidden-text show-text">
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
                <a href="/aboutus" className="btn btn-primary hidden-text show-text">
                  ABOUT US
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer
        className="footer bg-primary text-white text-center text-lg-start"
        id="footer"
      >
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <a href="/">
                <h5 className="text-uppercase">PROPERTY PULSE</h5>
                <p>
                  <em>Click your way home.</em>
                </p>
              </a>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="/" className="text-red">HOME</a>
                </li>
                <li>
                  <a href="/aboutus" className="text-red">ABOUT US</a>
                </li>
                <li>
                  <a href="/login" className="text-red">LOG IN</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <a href="/contactus">
                <h5 className="text-uppercase mb-0">CONTACT US</h5>
              </a>
              <section className="mb-4">
                <a
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-google"></i>
                </a>
                <a
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  className="btn btn-outline btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
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
