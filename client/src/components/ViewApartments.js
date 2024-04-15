import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ViewApartments() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/viewapartments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setApartments(data);
        } else {
          console.error("Failed to fetch apartments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div>
      {apartments.map((apartment, index) => (
        <div className="card" key={index} style={{ width: "18rem", margin: "20px" }}>
          <img className="card-img-top" src={apartment.image_url} alt={apartment.apartment_name} />
          <div className="card-body">
            <h5 className="card-title">{apartment.apartment_name}</h5>
            <p className="card-text">{apartment.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Category: {apartment.category_name}</li>
            <li className="list-group-item">Location: {apartment.location}</li>
            <li className="list-group-item">Status: {apartment.status}</li>
          </ul>
          <div className="card-body">
            <Link to={`/tenantBookings/${apartment.id}`} className="btn btn-primary">VIEW</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewApartments;
