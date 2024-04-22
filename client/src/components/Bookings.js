import React, { useState, useEffect } from "react";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings for the current user when the component mounts
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:5000/bookings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings);
      } else {
        console.error("Failed to fetch bookings:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div>
      <caption>BOOKINGS</caption>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Potential Tenant</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">PAYMENT</th>
            <th scope="col">DATE</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{booking.tenant_name}</td>
              <td>{booking.description}</td>
              <td>{booking.payment}</td>
              <td>{booking.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
