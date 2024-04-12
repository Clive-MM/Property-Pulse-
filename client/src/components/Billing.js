import React from "react";

function Billing() {
  return (
    <div className="billing">
      <div class="card text-center" style={{width:"18em", marginLeft:"33em", marginTop:"8em"}}>
        <div class="card-header">
          <h1>Billing</h1>
        </div>
        <div class="card-body">
          <form>
            <div>
              <label>Resident</label>
              <input type="text" id="resident" />
            </div>

            <div style={{marginTop:"2em"}}>
              <label>Amenity</label>
              <input type="text" id="amenity" />
            </div>

            <div style={{marginTop:"2em"}}>
              <label>Amount</label>
              <input type="number" id="amount" />
            </div>
          </form>
          
        </div>
        <div class="card-footer text-muted">

            <button type="button" className="btn btn-primary">SEND THE BILL</button>
        </div>
      </div>
    </div>
  );
}
export default Billing;
