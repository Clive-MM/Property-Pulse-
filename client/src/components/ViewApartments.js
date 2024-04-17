import React, { useState, useEffect } from "react";

function ViewApartments() {
  const [apartments, setApartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [bookingData, setBookingData] = useState({
    description: "",
    payment: "",
  });
  const [selectedApartmentId, setSelectedApartmentId] = useState(null); // State to store the selected apartment ID
  const perPage = 8;

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
        setSelectedApartmentId(data.apartment_id);
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

  const handleBook = () => {
    setBookingData({ description: "", payment: "" });
    setBookingFormVisible(true);
    setSelectedApartment(null); // Hide apartment details when booking form is shown
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          apartment_id: selectedApartmentId, // Use the selected apartment ID
          description: bookingData.description,
          payment: bookingData.payment,
        }),
      });
      if (response.ok) {
        setBookingFormVisible(false);
        alert("Apartment Booked Successfully!");
      } else {
        const data = await response.json();
        alert("Failed to book: " + data.message);
      }
    } catch (error) {
      console.error("Error booking apartment:", error);
      alert("Failed to book: " + error.message);
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
              <button onClick={handleBook} className="btn btn-primary">
                Book
              </button>
              <div style={{ width: "2em" }}></div>
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
        <div>
          {bookingFormVisible && (
            <div style={{ marginTop: "4em" }}>
              <h4 className=" text-muted">Book Apartment</h4>
              <div>
                <div>
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    value={bookingData.description}
                    onChange={handleInputChange}
                    style={ {marginLeft: "2em"}}
                  />
                </div>
                <div>
                  <label>Payment</label>
                  <input
                    type="number"
                    name="payment"
                    value={bookingData.payment}
                    onChange={handleInputChange}
                    style={ {marginLeft: "3.3em"}}
                  />
                </div>
              </div>
            <div style={{marginTop:"1em"}}>
            <button type="button" className="btn btn-success" onClick={handleSubmitBooking} style={{marginLeft:"8em"}}>Submit</button>
            </div>
             
            </div>
          )}
          {!bookingFormVisible && (
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
                    <h6
                      className="card-title"
                      style={{ marginBottom: "0.5rem" }}
                    >
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
                        onClick={() =>
                          handleViewApartment(apartment.apartment_id)
                        }
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
      )}
    </div>
  );
}

export default ViewApartments;
