import React from 'react';
const Login = () => {
  return (
    <div className="wrapper">
      <form>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <i className="fa-solid fa-user icon"></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <i className="fa-solid fa-lock icon"></i>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Don't have an account? <a href="/">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
