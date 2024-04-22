import React, { useState, useEffect } from "react";

function Notification() {
  const [tenants, setTenants] = useState([]);
  const [message, setMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [notificationSent, setNotificationSent] = useState(false);

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
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTenants(data.tenants_info);
      } else {
        console.error("Failed to fetch tenants:", data.message);
      }
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  const handleSendEnquiry = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const [firstname, middlename, surname] = recipientName.split(" ");
      const response = await fetch("http://127.0.0.1:5000/tenant_notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          recipient_name: recipientName,
          message: message
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Enquiry sent successfully:", data.message);
        setNotificationSent(true);
        setMessage("");
        setRecipientName("");
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
    <div className="Notification" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5em" }}>
      {notificationSent && (
        <div className="alert alert-success" role="alert">
          Notification sent successfully!
        </div>
      )}
      <div className="card text-center" style={{ width: "40em", lineHeight: "2em" }}>
        <div className="card-body">
          <form>
            <div>
              <label>Recipient</label>
              <select id="recipient" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} style={{ marginBottom: "1em", marginLeft: "2em", width: "90%" }}>
                <option value="">Select recipient</option>
                {tenants.map((tenant) => (
                  <option key={tenant.user_id}>{`${tenant.firstname} ${tenant.middlename} ${tenant.surname}`}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ marginTop: "1em" }}>
              <label htmlFor="message">Message</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" rows="3"></textarea>
            </div>
            <div style={ {marginTop:"2em"}}></div>
            <div>
              <button type="button" className="btn btn-primary" onClick={handleSendEnquiry}>SEND NOTIFICATION</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Notification;
