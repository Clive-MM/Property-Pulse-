import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ViewApartments() {
  const [apartments, setApartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const perPage = 8; // Number of apartments per page

  useEffect(() => {
    fetchApartments(currentPage);
  }, [currentPage]);

  const fetchApartments = async (page) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/viewapartments?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
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

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewApartment = async (apartmentId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/apartmentdetails/${apartmentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedApartment(data);
      } else {
        console.error(
          "Failed to fetch apartment details:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching apartment details:", error);
    }
  };

  
  return (
    <div>
      {selectedApartment ? (
        <div>
          <div className="card" style={{ height: "15em", marginBottom: "1em" }}>
          <img
  src={selectedApartment.image_url}
  alt={selectedApartment.apartment_name}
  style={{ height: "100%", objectFit: "cover", width: "100%" }}
/>
          </div>
          <div>
            <h2>{selectedApartment.apartment_name}</h2>
            <p>Description: {selectedApartment.description}</p>
            <p>Location: {selectedApartment.location}</p>
            <p>Address: {selectedApartment.address}</p>
            <p>Amenities: {selectedApartment.amenities}</p>
            <p>Lease Agreement: {selectedApartment.lease_agreement}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: ".5rem",
              }}
            >
              <button  className="btn btn-primary">
                Book
              </button>
              <div style={{width:"2em"}}></div>
              <button
                onClick={() => setSelectedApartment(null)}
                className="btn btn-secondary"
              >
                Back to Apartments
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {apartments.map((apartment, index) => (
            <div
              className="card"
              key={index}
              style={{ width: "12rem", margin: "10px", height: "15rem" }}
            >
              <div
                className="card-img-container"
                style={{ height: "7rem", overflow: "hidden" }}
              >
                <img
                  className="card-img-top"
                  src={apartment.image_url}
                  alt={apartment.apartment_name}
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="card-body" style={{ padding: "0.5rem" }}>
                <h6 className="card-title" style={{ marginBottom: "0.5rem" }}>
                  {apartment.apartment_name}
                </h6>
                <ul
                  className="list-group list-group-flush"
                  style={{ marginBottom: "0.5rem" }}
                >
                  <li
                    className="list-group-item"
                    style={{ padding: "0.25rem 0" }}
                  >
                    Category: {apartment.category_name}
                  </li>
                </ul>
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => handleViewApartment(apartment.apartment_id)}
                    className="btn btn-primary"
                    style={{ fontSize: "0.75rem" }}
                  >
                    VIEW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedApartment === null && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: ".5rem",
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNextPage}
            style={{ marginLeft: "0.5rem" }}
            disabled={apartments.length < perPage}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewApartments;