import React, { useState, useEffect } from "react";

function Billing() {
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      
      const response = await fetch("http://127.0.0.1:5000/myapartments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch apartments");
      }
      
      const data = await response.json();
      setApartments(data.apartments);
    } catch (error) {
      console.error("Error fetching apartments:", error.message);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="billing">
      <div className="card text-center" style={{ width: "18em", marginLeft: "33em", marginTop: "8em" }}>
        <div className="card-header">
          <h1>Billing</h1>
        </div>
        <div className="card-body">
          <form>
            <div style={{ marginBottom: "1em" }}>
              <label htmlFor="apartment">Apartment</label>
              <select id="apartment" value={selectedApartment} onChange={(e) => setSelectedApartment(e.target.value)}>
                <option value="">Select Apartment</option>
                {apartments.map((apartment) => (
                  <option key={apartment} value={apartment}>
                    {apartment}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="resident">Resident</label>
              <input type="text" id="resident" />
            </div>

            <div style={{ marginTop: "2em" }}>
              <label htmlFor="amenity">Amenity</label>
              <input type="text" id="amenity" />
            </div>

            <div style={{ marginTop: "2em" }}>
              <label htmlFor="amount">Amount</label>
              <input type="number" id="amount" />
            </div>
          </form>
        </div>
        <div className="card-footer text-muted">
          <button type="button" className="btn btn-primary">SEND THE BILL</button>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;
