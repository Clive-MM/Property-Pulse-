import React, { useState, useEffect } from "react";

function Notification() {
  // State to hold the list of tenants
  const [tenants, setTenants] = useState([]);
  const [message, setMessage] = useState("");
  const [recipientName, setRecipientName] = useState(""); // State to hold recipient name
  const [notificationSent, setNotificationSent] = useState(false);

  // Function to fetch tenants' names from backend
  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:5000/tenants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include the JWT token for authentication
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Update state with the list of tenants
        setTenants(data.tenants_info);
      } else {
        console.error("Failed to fetch tenants:", data.message);
      }
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  // Function to handle sending the enquiry
  const handleSendEnquiry = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const [firstname, middlename, surname] = recipientName.split(" ");
      const response = await fetch("http://127.0.0.1:5000/tenant_notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the JWT token for authentication
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          recipient_name: recipientName, // Use the correct field name
          message: message
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Enquiry sent successfully:", data.message);
        setNotificationSent(true);
        // Clear the fields
        setMessage("");
        setRecipientName("");
        // Set timer to hide the notification after 2 seconds
        setTimeout(() => {
          setNotificationSent(false);
        }, 1000);
      } else {
        console.error("Failed to send enquiry:", data.message);
      }
    } catch (error) {
      console.error("Error sending enquiry:", error);
    }
  };

  return (
    <div className="Notification">
      {notificationSent && (
        <div className="alert alert-success" role="alert">
          Notification sent successfully!
        </div>
      )}
      <div className="card text-center" style={{ width: "18em", marginLeft: "33em", marginTop: "8em" }}>
        <div className="card-header">
          <h1>Notification</h1>
        </div>
        <div className="card-body">
          <form>
            <div>
              <label>Recipient</label>
              {/* Dropdown list to select tenant */}
              <select id="recipient" value={recipientName} onChange={(e) => setRecipientName(e.target.value)}>
                <option value="">Select recipient</option>
                {/* Map through the tenants and create an option for each */}
                {tenants.map((tenant) => (
                  <option key={tenant.user_id}>{`${tenant.firstname} ${tenant.middlename} ${tenant.surname}`}</option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: "2em" }}>
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted">
          <button type="button" className="btn btn-primary" onClick={handleSendEnquiry}>
            SEND NOTIFICATION
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
