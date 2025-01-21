import React from 'react';
const Register = () => {
  return (
    <div className="wrapper">
      <form>
        <h1>Sign Up</h1>
        <div className="input-box">
          <input type="email" placeholder="Email" required />
          <i className="fa-solid fa-user icon"></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <i className="fa-solid fa-lock icon"></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Confirm Password" required />
          <i className="fa-solid fa-lock icon"></i>
        </div>
        <button type="submit">Sign Up</button>
        <div className="register-link">
          <p>
            Already have an account? <a href="#login">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
