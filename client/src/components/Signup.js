import React from "react";
import "../styles/styles.css"; 

function showOptions() {
  var dataList = document.getElementById('rolelist');
  dataList.style.display = 'block';
}

function Signup() {
  return (
    <div id="container" className="d-flex justify-content-center align-items-center"> {/* Flexbox container to center content */}
      <div>
        <h1>Register</h1>

        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              className="form-control form-control-sm"  
              id="username"
              placeholder="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control form-control-sm" 
              id="email"
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="role"
              className="form-control form-control-sm" 
              list="rolelist"
              id="role"
              placeholder="Choose your role"
              onClick={showOptions}
            />
            <datalist id="rolelist" style={{ display: 'none' }}>
              <option value="Landlord"></option>
              <option value="Tenant"></option>
            </datalist>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control form-control-sm" 
              id="password"
              placeholder="password"
            />
          </div>
          <div className="form-group">
            <button type="button" className="btn btn-success" style={{ marginTop: '1em' }}>Submit</button>
          </div>
         
        </form>
      </div>
    </div>
  );
}

export default Signup;
