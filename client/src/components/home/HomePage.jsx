import React from "react";
import Navbar from "../navbar/navbar";
import {
  AiOutlineTool,
  AiOutlineSafetyCertificate,
  AiOutlineDollarCircle,
  AiOutlineUser,
} from "react-icons/ai";
import "./HomePage.css";
import { NavLink } from "react-router-dom";
import bikepartsImage from "../Assets/bikeparts.jpeg";
import bikewashImage from "../Assets/bikewash.jpeg";
import carserviceImage from "../Assets/carservice.jpeg";
import carwashImage from "../Assets/carwash.jpeg";

const HomePage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);

  return (
    <div className="homePage">
      <Navbar />

      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "white",
        }}
      >
        <NavLink to="/profile" className="profileIcon">
          <AiOutlineUser size={30} style={{ color: "black", cursor: "pointer" }} />
        </NavLink>
      </div>

      <div className="box1">
        <h1>Vehicle Services</h1>
        <p>Your Reliable Partner for Vehicle Care</p>
        <p>Your Vehicle | Our Expertise | Your Comfort</p>

        <NavLink to="/services" className="bookNow">
          <h3>BOOK NOW</h3>
        </NavLink>

        <div className="ourQuality">
          <div className="qualityBox">
            <AiOutlineTool className="icons" />
            <p>Experienced Mechanics</p>
          </div>
          <div className="qualityBox">
            <AiOutlineSafetyCertificate className="icons" />
            <p>Quality Service</p>
          </div>
          <div className="qualityBox">
            <AiOutlineDollarCircle className="icons" />
            <p>Affordable Price</p>
          </div>
        </div>
      </div>

      <div className="box2">
        <div className="serviceImages">
          <div className="imageContainer">
            <img src={bikepartsImage} alt="Bike Parts" />
            <img src={bikewashImage} alt="Bike Wash" />
            <img src={carserviceImage} alt="Car Service" />
            <img src={carwashImage} alt="Car Wash" />
          </div>
        </div>
        <div className="WhatWeDo">
          <h3>What we do?</h3>
          <div className="workList">
            <ul>
              <NavLink to="/services" style={{ textDecoration: 'none' }}>
                <li>Vehicle Service</li>
              </NavLink>
              <NavLink to="/services" style={{ textDecoration: 'none' }}>
                <li>Vehicle Wash</li>
              </NavLink>
              <NavLink to="/parts" style={{ textDecoration: 'none' }}>
                <li>Parts Sell</li>
              </NavLink>
              <NavLink to="/services" style={{ textDecoration: 'none' }}>
                <li>Emergency Service</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>

      <div className="box3">
        <div className="WhyChooseUs">
          <h1>Why Choose Us?</h1>
          <div className="whyUsList">
            <ul>
              <li>Expert vehicle servicing and wash</li>
              <li>Genuine parts sales</li>
              <li>24/7 emergency services</li>
              <li>Reliable, tailored solutions</li>
              <li>Customer-focused satisfaction</li>
            </ul>
          </div>
          <div className="bookNow2">
            <NavLink to="/services" className="bookNow">
              <h3>BOOK NOW</h3>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="box4">
        <div className="contactUs">
          <h3>Contact Us</h3>
          <p>123, ABC Street, Dhaka-1000, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
