import React from "react";

function Category() {
  return (
    <div>
      <h1>Category</h1>
      <div id="category">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Category"
            />
          </div>
          <div style={{marginTop:"2em"}}>
            <button type="button" class="btn btn-success">
              ADD CATEGORY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Category;
