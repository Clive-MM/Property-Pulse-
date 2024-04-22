import React, { useState, useEffect } from "react";

function Billing() {
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState("");
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [amenity, setAmenity] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchApartments();
    fetchTenants();
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

  const fetchTenants = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await fetch("http://127.0.0.1:5000/tenants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tenants");
      }

      const data = await response.json();
      setTenants(data.tenants_info.map((tenant) => `${tenant.firstname} ${tenant.middlename} ${tenant.surname}`));
    } catch (error) {
      console.error("Error fetching tenants:", error.message);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await fetch("http://127.0.0.1:5000/create_billing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amenity,
          amount,
          apartment_name: selectedApartment,
          resident_name: selectedTenant,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create billing");
      }

      setErrorMessage("");
      setAmenity("");
      setAmount("");
      setSelectedApartment("");
      setSelectedTenant("");

      alert("Bill sent successfully!");
    } catch (error) {
      console.error("Error creating billing:", error.message);
      setErrorMessage("An error occurred while creating billing. Please try again later.");
    }
  };

  return (
    <div className="billing">
      <h1 className="text-muted">Billing</h1>
      <div className="card text-center" style={{ width: "18em", marginLeft: "20em", marginTop: "1em" }}>
        
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: ".5em" }}>
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

            <div style={{ marginBottom: "1em" }}>
              <label htmlFor="resident">Resident</label>
              <select id="resident" value={selectedTenant} onChange={(e) => setSelectedTenant(e.target.value)}>
                <option value="">Select Tenant</option>
                {tenants.map((tenant, index) => (
                  <option key={index} value={tenant}>
                    {tenant}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: "2em" }}>
              <label htmlFor="amenity">Amenity</label>
              <input type="text" id="amenity" value={amenity} onChange={(e) => setAmenity(e.target.value)} />
            </div>

            <div style={{ marginTop: "2em" }}>
              <label htmlFor="amount">Amount</label>
              <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "2em" }}>
              SEND THE BILL
            </button>
          </form>
        </div>
        {errorMessage && (
          <div className="card-footer text-muted">
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;
