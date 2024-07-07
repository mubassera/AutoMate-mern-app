import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCar,
  FaMotorcycle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { DoLogin,DoSignup } from "../../api";

export const Login = () => {
  const navigate = useNavigate();
  //pre-loggedIn check
  /*const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  
  if (userData) {
    navigate("/home");
  }*/

  const [action, setAction] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    DoLogin({
      name: data.name,
      email: data.email,
      password: data.password,
      vehicleType: data.vehicleType,
      vehicleBrand: data.vehicleBrand,
      vehicleModel: data.vehicleModel
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    DoSignup({
      name: data.name,
      email: data.email,
      password: data.password,
      vehicleType: data.vehicleType,
      vehicleBrand: data.vehicleBrand,
      vehicleModel: data.vehicleModel
    });
  };

  return (
    <div className="loginpage">
      <div className="leftContainer">
        <h1>AutoMate</h1>
        <p>Your Reliable Partner for Vehicle Care</p>
      </div>
      <div className="container">
        {action === "Login" ? (
          <>
            <form onSubmit={handleLogin} className="inputs">
              <div className="input">
                <span className="Icon">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  placeholder="Email Id"
                  name="email"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="input">
                <span className="Icon">
                  <FaLock />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="checkboxInput">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox" id="rememberMe">
                  Remember me
                </label>
              </div>

              <div className="submit-container">
                <button type="submit" className="submit">
                  Login
                </button>
              </div>
            </form>

            <div className="forgot-password">
              Forgot Password? <span>Click Here!</span>
            </div>
            <div className="underline"></div>
            <div className="submit-container">
              <div className="submit" onClick={() => setAction("Sign Up")}>
                Create New Account
              </div>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSignUp}>
              <div className="inputs">
                <div className="input">
                  <span className="Icon">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="input">
                  <span className="Icon">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="Email Id"
                    name="email"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="input">
                  <span className="Icon">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={changeHandler}
                    required
                  />
                </div>
              </div>

              <div className="vehicleOption">
                <div className="vehicleTitle">Choose Your Vehicle:</div>
                <div className="vehicles">
                  <div>
                    <input
                      type="radio"
                      id="Car"
                      name="vehicleType"
                      value="Car"
                      onChange={changeHandler}
                    />
                    <label htmlFor="Car">Car</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Bike"
                      name="vehicleType"
                      value="Bike"
                      onChange={changeHandler}
                    />
                    <label htmlFor="Bike">Bike</label>
                  </div>
                </div>
              </div>

              <div className="input">
                <span className="Icon">
                  <FaCar />
                </span>
                <input
                  type="text"
                  placeholder="Brand"
                  name="vehicleBrand"
                  onChange={changeHandler}
                  required
                />
              </div>

              <br />

              <div className="input">
                <span className="Icon">
                  <FaMotorcycle />
                </span>
                <input
                  type="text"
                  placeholder="Model"
                  name="vehicleModel"
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="submit-container">
                <button
                  type="submit"
                  className="submit"
                  onSubmit={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="existing-account">
              Already have an account?{" "}
              <span onClick={() => setAction("Login")}>Login</span>
            </div>
          </>
        )}
      </div>

      <div className="footer">
        <p>&copy; 2024 AutoMate. All rights reserved.</p>
      </div>

      
    </div>
  );
};

export default Login;

/*
{
    "name": "amiiii",
    "email": "meow1@gmail.com",
    "password": "123456",
    "vehicleType": "bike",
    "vehicleBrand": "yamaha",
    "vehicleModel": "mt15"

}
*/
