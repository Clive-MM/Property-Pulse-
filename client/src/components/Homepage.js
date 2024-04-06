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
            <a class="navbar-brand" href="/">
              HOME
            </a>
          </div>

          <div class="container">
            <a class="navbar-brand" href="/aboutus">ABOUT US</a>
          </div>

          <div class="container">
            <a class="navbar-brand"href="/contactus" >CONTACTS</a>
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
              <h7><em>At the heart of our mission is the seamless management of the leasing cycle, ensuring both landlords and tenants experience efficiency and effectiveness. Landlords have the power to effortlessly list their apartments for potential tenants, manage periodic billings, and engage with tenants for any inquiries. Meanwhile, tenants can communicate with landlords as needed when booking or reporting any concerns, while both parties uphold integrity through the upload of verification documents and the provision of lease agreements.
              </em></h7></p>
              <a href="/aboutus" class="btn btn-primary">
                ABOUT US
              </a>
            </div>
          </div>
        </div>
        <div class="col-sm-6"  id="products">
          <div class="card"id="summary">
            <div class="card-body">
              <h5 class="card-title">OUR PRODUCTS</h5>
                           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Homepage;
