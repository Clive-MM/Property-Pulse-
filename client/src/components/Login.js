import React from "react";

function Login() {
  return (
    <div>
      <h1>Login</h1>

      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" id="email" placeholder="email"></input>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" id="password" placeholder="password"></input>
        </div>

        <div>
        <button type="button" class="btn btn-success">Login</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
