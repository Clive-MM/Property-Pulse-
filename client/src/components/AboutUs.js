import React from "react";
import "../styles/styles.css";
import rentalhouses from "../components/images/rentalhouses.jpg";
import rent from "../components/images/rent.jpg";
import rentalhouses2 from "../components/images/rentalhouses2.jpg";

function AboutUs() {
  return (
    <div style={styles.container}>
      <div id="navbar">
        <nav className="navbar navbar-expand-lg navbar-custom">
          <div className="container">
            <a className="navbar-brand" href="/">
              <h1 style={styles.brandTitle}>PROPERTY PULSE</h1>
              <p style={styles.brandSubtitle}>
                <em>Click Your Way Home</em>
              </p>
            </a>
          </div>
          <div className="ml-auto d-flex">
            <a className="nav-link" href="/" style={styles.navLink}>
              <i className="fas fa-home"></i>
              <span className="nav-text">HOME</span>
            </a>
            <a className="nav-link" href="/contactus" style={styles.navLink}>
              <i className="fas fa-phone"></i>
              <span className="nav-text">CONTACTS</span>
            </a>
            <a className="nav-link" href="/login" style={styles.navLink}>
              <i className="fas fa-sign-in-alt"></i>
              <span className="nav-text">LOGIN</span>
            </a>
          </div>
        </nav>
      </div>

      <div style={styles.content}>
        <div className="card mb-4" style={styles.card}>
          <div className="row no-gutters">
            <div className="col-md-4" style={styles.imageContainer}>
              <img
                src={rent}
                className="card-img"
                alt="Mission"
                style={styles.cardImage}
              />
            </div>
            <div className="col-md-8" style={styles.cardTextContainer}>
              <div className="card-body">
                <h5 style={styles.cardTitle}>MISSION</h5>
                <p style={styles.cardText}>
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

        <div className="card mb-4" style={styles.card}>
          <div className="row no-gutters">
            <div className="col-md-8" style={styles.cardTextContainer}>
              <div className="card-body">
                <h5 style={styles.cardTitle}>VISION</h5>
                <p style={styles.cardText}>
                  <em>
                    To become the leading online destination for individuals
                    seeking rental properties, offering a seamless and efficient
                    experience for both tenants and landlords, while fostering a
                    sense of community and trust within the real estate market.
                  </em>
                </p>
              </div>
            </div>
            <div className="col-md-4" style={styles.imageContainer}>
              <img
                src={rentalhouses2}
                className="card-img"
                alt="Vision"
                style={styles.cardImage}
              />
            </div>
          </div>
        </div>

        <div className="card bg-dark text-white" style={styles.featuresCard}>
          <img
            src={rentalhouses}
            className="card-img"
            alt="Rental Houses"
            style={styles.cardImage}
          />
          <div className="card-img-overlay" style={styles.overlay}>
            <h5 style={styles.cardTitle}>FEATURES</h5>
            <p style={styles.cardText}>
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
    </div>
  );
}

const styles = {
  container: {
    background:
      "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", // Updated gradient
    color: "#fff",
    minHeight: "100vh",
    padding: "2em",
  },
  brandTitle: {
    marginLeft: "1em",
    fontSize: "2em",
    fontWeight: "bold",
    fontFamily: "'Roboto', sans-serif",
  },
  brandSubtitle: {
    color: "blue",
    marginLeft: ".5em",
    fontFamily: "'Roboto', sans-serif",
  },
  navLink: {
    color: "#fff",
    margin: "0 1em",
    fontFamily: "'Roboto', sans-serif",
  },
  card: {
    maxWidth: "100%",
    height: "12em",
    marginBottom: "1em",
    background: "transparent",
    border: "none",
    borderRadius: "0",
  },
  imageContainer: {
    padding: "0",
    margin: "0",
  },
  cardImage: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    border: "none",
  },
  cardTitle: {
    fontSize: "1.5em",
    fontWeight: "bold",
    fontFamily: "'Roboto', sans-serif",
  },
  cardText: {
    fontSize: "1.2em",
    fontFamily: "'Roboto', sans-serif",
  },
  cardTextContainer: {
    background:
      "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", // Updated gradient
    padding: "1em",
    borderRadius: "0",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  featuresCard: {
    height: "12em",
    border: "none",
    borderRadius: "0",
    position: "relative",
    overflow: "hidden",
  },
  overlay: {
    background:
      "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", // Updated gradient
    padding: "1em",
    borderRadius: "0",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  content: {
    marginTop: "4em", 
  },
};

export default AboutUs;
