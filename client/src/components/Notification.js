import React from "react";

function Notification(){
    return (
        <div className="Notification">
        <div class="card text-center" style={{width:"18em", marginLeft:"33em", marginTop:"8em"}}>
          <div class="card-header">
            <h1>Notification</h1>
          </div>
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
  
              <button type="button" className="btn btn-primary">SEND NOTIFICATION</button>
          </div>
        </div>
      </div>
    )
}

export default Notification;