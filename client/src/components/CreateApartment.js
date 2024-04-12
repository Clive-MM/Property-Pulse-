import React from "react";
import "../styles/styles.css";

function CreateApartment() {
  return (
    <div id="apartment">
      <h1>Apartment Creation</h1>
      <div>
        <form>
          <div>
            <label>Apartment Name</label>
            <input type="text" className="form-control" id="apartment_name" />
          </div>

          <div style={{marginTop:"1em"}}>
            <label>Category</label>
            <input type="text" className="form-control" id="category_name" />
          </div>

          <div style={{marginTop:"1em"}}>
            <label>Description</label>
            <input type="text" className="form-control" id="description" />
          </div>

          <div style={{marginTop:"1em"}}>
            <label>Location</label>
            <input type="text" className="form-control" id="location" />
          </div>

          <div style={{marginTop:"1em"}}>
            <label>Address</label>
            <input type="text" className="form-control" id="address" />
          </div>

          <div style={{marginTop:"1em"}}>
            <label>Amenities</label>
            <input type="text" className="form-control" id="amenities" />
          </div>

          <div style={{marginTop:"1em"}}>
            <label>Lease</label>
            <input type="text" className="form-control" id="lease-agreement" />
          </div>

          <div className="mb-3" style={{marginTop:"1em"}}>
            <label htmlFor="image" className="form-label">
              Apartment image
            </label>
            <input type="file" className="form-control" id="imageUrl" />
          </div>

          <div style={{marginTop:"1em"}}>
            <select class="form-select" aria-label="Default select example">
              <option selected>Select status</option>
              <option value="1">Vacant</option>
              <option value="2">Fully Occupied</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateApartment;
