import React, { useState, useEffect } from "react";

function Message() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications for the current user when the component mounts
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:5000/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
      } else {
        console.error("Failed to fetch notifications:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div>
      <caption>MESSAGES</caption>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">SENDER</th>
            <th scope="col">DETAILS</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{notification.timestamp}</td>
              <td>{notification.sender_username}</td>
              <td>{notification.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Message;
