import React from "react";

function Enquiry(){
    return (
        <div className="Notification">
        <div class="card text-center" style={{width:"18em", marginLeft: "20em",marginTop: "5em"}}>
         
          <div class="card-body">
            <form>
              <div>
                <label>Recipient</label>
                <input type="text" id="resident" />
              </div>
  
              <div style={{marginTop:"2em"}}>
                <textarea placeholder="message">
                    
                </textarea>
              </div>
  
              
            </form>
            
          </div>
          <div class="card-footer text-muted">
  
              <button type="button" className="btn btn-primary">SUBMIT</button>
          </div>
        </div>
      </div>
    )
}

export default Enquiry;