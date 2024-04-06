import React from "react";
import "../styles/styles.css";

function Homepage() {
  return (
    <div className="homepage">
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <a class="navbar-brand" href="/">
              <h1>PROPERTY PULSE</h1>
              <p>
                <em>Click Your Way Home</em>
              </p>
            </a>
          </div>
          <div class="container">
            <a class="navbar-brand"  href="/">HOME</a>
          </div>

          <div class="container">
            <a class="navbar-brand">ABOUT US</a>
          </div>

          <div class="container">
            <a class="navbar-brand">CONTACTS</a>
          </div>

          <div class="container">
            <a class="navbar-brand" href="/login">LOG IN</a>
          </div>
        </nav>
      </div>
    </div>
  );
}
export default Homepage;
