import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/styles.css";

function ContactUs() {
  return (
    <div style={styles.container}>
      <div id="navbar" style={{ marginTop: "0.25em" }}>
        <nav className="navbar navbar-expand-lg navbar-custom" style={styles.navbar}>
          <div className="container">
            <a className="navbar-brand" href="/" style={styles.brand}>
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
            <a className="nav-link" href="/aboutus" style={styles.navLink}>
              <i className="fas fa-info-circle"></i>
              <span className="nav-text">ABOUTUS</span>
            </a>
            <a className="nav-link" href="/login" style={styles.navLink}>
              <i className="fas fa-sign-in-alt"></i>
              <span className="nav-text">LOGIN</span>
            </a>
          </div>
        </nav>
      </div>
      <div style={styles.content}>
        <div style={styles.subHeading}>
          <h4>Ready to Discover Your Dream Home?</h4>
          <h4>Contact Us Now and Let's Make Your Dreams a Reality!</h4>
        </div>

        <div style={styles.contactInfo}>
          <p>Telephone: 0723176982</p>
          <p>Email: propertypulse@gmail.com</p>
        </div>
        <div style={styles.socialMedia}>
          <a href="#" className="socialLink" aria-disabled="true" style={styles.socialLink}>
            <FontAwesomeIcon icon={faFacebook} style={styles.socialIcon} />
          </a>
          <a href="#" className="socialLink" aria-disabled="true" style={styles.socialLink}>
            <FontAwesomeIcon icon={faInstagram} style={styles.socialIcon} />
          </a>
          <a href="#" className="socialLink" aria-disabled="true" style={styles.socialLink}>
            <FontAwesomeIcon icon={faLinkedin} style={styles.socialIcon} />
          </a>
          <a href="#" className="socialLink" aria-disabled="true" style={styles.socialLink}>
            <FontAwesomeIcon icon={faGithub} style={styles.socialIcon} />
          </a>
          <a href="#" className="socialLink" aria-disabled="true" style={styles.socialLink}>
            <FontAwesomeIcon icon={faGoogle} style={styles.socialIcon} />
          </a>
        </div>

        <div style={styles.formContainer}>
          <h4 style={styles.formHeading}>Get in Touch</h4>
          <div className="mb-3">
            <input
              style={styles.input}
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              placeholder="Message"
              style={styles.textarea}
            ></textarea>
          </div>
          <button className="sendButton" style={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", // Updated gradient
    color: "#fff",
    minHeight: "100vh",
    padding: "2em",
  },
  navbar: {
    background: "linear-gradient(135deg, #4a90e2, #6f42c1, #e94e77)", // Updated gradient
  },
  brand: {
    color: "#fff",
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
  content: {
    textAlign: "center",
    padding: "2em",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "1em",
  },
  subHeading: {
    marginBottom: "2em",
  },
  contactInfo: {
    marginBottom: "2em",
  },
  socialMedia: {
    display: "flex",
    justifyContent: "center",
    gap: "1em",
  },
  socialLink: {
    color: "#ccc", // Grey color to indicate inactive state
    fontSize: "2em",
    pointerEvents: "none", // Disable click events
    transition: "color 0.3s ease",
  },
  socialIcon: {
    margin: "0 0.5em",
  },
  socialLinkHover: {
    color: "red", // Red color on hover
  },
  formContainer: {
    marginTop: "2em",
    textAlign: "center",
  },
  formHeading: {
    fontSize: "1.5em",
    marginBottom: "1em",
  },
  input: {
    width: "20em",
    margin: "0 auto",
    fontFamily: "'Roboto', sans-serif",
  },
  textarea: {
    width: "20em",
    margin: "0 auto",
    resize: "none",
    fontFamily: "'Roboto', sans-serif",
  },
  sendButton: {
    backgroundColor: "#4a90e2",
    color: "#fff",
    padding: "0.5em 2em",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: "'Roboto', sans-serif",
    transition: "background-color 0.3s ease",
  },
  sendButtonHover: {
    backgroundColor: "green", 
  },
};

export default ContactUs;
