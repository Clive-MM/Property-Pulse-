import React, { useState, useEffect } from "react";
import "../styles/styles.css";

function CreateApartment() {
  const [formData, setFormData] = useState({
    apartment_name: "",
    category_id: "",
    description: "",
    location: "",
    address: "",
    amenities: "",
    lease_agreement: null,
    image_url: null,
    status: ""
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const { categories } = await response.json();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData({ ...formData, [id]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Access token not found");
      }
  
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      const response = await fetch("http://127.0.0.1:5000/create_apartment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include the authorization token in the headers
        },
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Failed to create apartment");
      }
      alert("Apartment created successfully!");
    } catch (error) {
      console.error("Error creating apartment:", error.message);
      alert("Failed to create apartment. Please try again.");
    }
  };

  return (
    <div id="apartment">
      <h1>Apartment Creation</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Apartment Name</label>
            <input
              type="text"
              className="form-control"
              id="apartment_name"
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginTop: "1em" }}>
  <label>Category</label>
  <select
    className="form-select"
    id="category_name" // Change id to category_name
    onChange={handleChange}
    required
  >
    <option value="" disabled selected>
      Select Category
    </option>
    {categories.map((category) => (
      <option key={category.category_id} value={category.category_name}> {/* Change value to category_name */}
        {category.category_name}
      </option>
    ))}
  </select>
</div>


          <div style={{ marginTop: "1em" }}>
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginTop: "1em" }}>
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginTop: "1em" }}>
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginTop: "1em" }}>
            <label>Amenities</label>
            <input
              type="text"
              className="form-control"
              id="amenities"
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginTop: "1em" }}>
            <label>Lease Agreement</label>
            <input
              type="file"
              className="form-control"
              id="lease_agreement"
              onChange={handleFileChange}
              accept=".pdf"
              required
            />
          </div>

          <div className="mb-3" style={{ marginTop: "1em" }}>
            <label htmlFor="image" className="form-label">
              Apartment Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image_url"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          <div style={{ marginTop: "1em" }}>
            <select
              className="form-select"
              id="status"
              onChange={handleChange}
              required
            >
              <option value="" selected disabled>
                Select Status
              </option>
              <option value="Vacant">Vacant</option>
              <option value="Fully Occupied">Fully Occupied</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success" style={{ marginTop: "1em" }}>
            Create Apartment
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateApartment;
