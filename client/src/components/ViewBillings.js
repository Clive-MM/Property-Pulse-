import React, { useState, useEffect } from "react";

function ViewBillings() {
  const [billings, setBillings] = useState([]);

  useEffect(() => {
    // Fetch billings when the component mounts
    fetchBillings();
  }, []);

  const fetchBillings = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:5000/fetch_billings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBillings(data.billings);
      } else {
        console.error("Failed to fetch billings:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching billings:", error);
    }
  };

  return (
    <div>
      <caption>BILLINGS</caption>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Amenity</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {billings.map((billing, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{billing.amenity}</td>
              <td>{billing.amount}</td>
              <td>{billing.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewBillings;
