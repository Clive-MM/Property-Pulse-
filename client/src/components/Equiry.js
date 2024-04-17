import React, { useState, useEffect } from "react";

function Enquiry() {
  const [landlords, setLandlords] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchLandlords();
  }, []);

  const fetchLandlords = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:5000/landlords", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLandlords(data.landlords_info);
      } else {
        console.error("Failed to fetch landlords:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching landlords:", error);
    }
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:5000/send_enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: recipient.split(" ")[0], // Extract first name
          surname: recipient.split(" ")[1], // Extract surname
          message: message,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // Show alert for successful submission
        alert("Enquiry sent successfully!");
        // Clear form fields after successful submission
        setRecipient("");
        setMessage("");
      } else {
        console.error("Failed to send enquiry:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending enquiry:", error);
    }
  };

  return (
    <div className="Notification">
      <div className="card text-center" style={{ width: "18em", marginLeft: "20em", marginTop: "5em" }}>
        <div className="card-body">
          <form>
            <div>
              <label htmlFor="recipient">Recipient</label>
              <select id="recipient" value={recipient} onChange={handleRecipientChange}>
                <option value="">Select Recipient</option>
                {landlords.map((landlord, index) => (
                  <option key={index} value={`${landlord.firstname} ${landlord.surname}`}>
                    {`${landlord.firstname} ${landlord.surname}`}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: "2em" }}>
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Message"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Enquiry;
