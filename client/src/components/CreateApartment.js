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
    status: "",
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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div id="apartment" style={{ marginRight: "2em" }}>
        <h1 className="">Apartment Creation</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-column">
              <div className="form-group col-md-10">
                <label className="text-muted">Apartment Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="apartment_name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-10">
                <label className="text-muted">Category</label>
                <select
                  className="form-select"
                  id="category_name"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_name}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-10">
                <label className="text-muted">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-10">
                <label className="text-muted">Amenities</label>
                <input
                  type="text"
                  className="form-control"
                  id="amenities"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group col-md-10" style={{ marginTop: "1em" }}>
              <label className="text-muted">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ marginTop: "1em" }}>
              <button
                type="submit"
                className="btn btn-success"
              >
                Create Apartment
              </button>
            </div>
          </form>
        </div>
      </div>
      <div style={{ marginTop: "4.5em" }}>
        <div className="form-group col-md-15" style={{ marginTop: "1em" }}>
          <label className="text-muted">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-column">
          <div className="form-group col-md-15">
            <label className="text-muted">Lease Agreement</label>
            <input
              type="file"
              className="form-control"
              id="lease_agreement"
              onChange={handleFileChange}
              accept=".pdf"
              required
            />
          </div>
          <div className="form-group col-md-15">
            <label htmlFor="image" className="form-label text-muted">
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
          <div className="form-group col-md-8" style={{ marginTop: "1.5em" }}>
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
        </div>
      </div>
    </div>
  );
}

export default CreateApartment;
