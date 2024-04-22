import React, { useState } from "react";

function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("JWT token not found in local storage");
      }

      const response = await fetch("http://127.0.0.1:5000/create_category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ category_name: categoryName }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create category");
      }

      setMessage(data.message);
      setCategoryName(""); // Clear input field after successful submission
      setError(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error creating category:", error.message);
      setError(error.message || "An error occurred while creating the category.");
      setMessage("");
    }
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  return (
    <div>
      <h1 className="text-muted">Category</h1>
      <div id="category">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Category"
              value={categoryName}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "2em" }}>
            <button type="submit" className="btn btn-success">
             CREATE CATEGORY
            </button>
          </div>
        </form>
        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default Category;
