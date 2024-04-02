import React from "react";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <div
        id="container"
        className="d-flex justify-content-center align-items-center"
      >
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              className="form-control form-control-sm"
            ></input>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="form-control form-control-sm"
            ></input>
          </div>

          <div className="form-group mt-3"> 
            <button type="button" className="btn btn-success">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
