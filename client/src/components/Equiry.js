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
      const response = await fetch("http://127.0.0.1:5000/landlord_notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipient_name: recipient, // Use the correct field name
          message: message,
        }),
      });
      if (response.ok) {
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
    <div className="Notification" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5em" }}>
      <div className="card text-center" style={{ width: "40em", lineHeight: "5em" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="recipient">Recipient</label>
              <select id="recipient" value={recipient} onChange={handleRecipientChange} style={{ marginBottom: "1em", marginLeft: "2em" }}>
                <option className="text-muted" value="">Select Recipient</option>
                {landlords.map((landlord, index) => (
                  <option key={index} value={`${landlord.firstname} ${landlord.middlename} ${landlord.surname} `}>
                    {`${landlord.firstname} ${landlord.middlename} ${landlord.surname}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" value={message} onChange={handleMessageChange} className="form-control" rows="3"></textarea>
            </div>
            <div>
              <button type="submit" className="btn btn-success">ENQUIRE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Enquiry;
