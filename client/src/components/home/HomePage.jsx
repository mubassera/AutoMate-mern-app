import React from "react";
import {
  AiOutlineTool,
  AiOutlineSafetyCertificate,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import "./HomePage.css";

export const HomePage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  return (
    <div className="homePage">
      {/* NavBar */}
      <div className="navbar">
        <div className="navLogo">
          <h2>LOGO</h2>
          <p>Automate</p>
        </div>

        <ul className="navMenu">
          <li>Home</li>
          <li>Book Now</li>
          <li>Parts</li>
          <li>About Us</li>
          <li>Purchase & Booking History</li>
        </ul>
      </div>

      {/* 1st box */}
      <div className="box1">
        <h1>Vehicle Services</h1>
        <p>Life is too short to spend at a repair shop</p>
        <p>Your place | Your time | Your Vehicle</p>

        <div className="bookNow">
          <h3>BOOK NOW</h3>
        </div>

        <div className="ourQuality">
          <div className="qualityBox">
            <AiOutlineTool className="icon" />
            <p>Experienced Mechanics</p>
          </div>
          <div className="qualityBox">
            <AiOutlineSafetyCertificate className="icon" />
            <p>Quality Service</p>
          </div>
          <div className="qualityBox">
            <AiOutlineDollarCircle className="icon" />
            <p>Affordable Price</p>
          </div>
        </div>
      </div>

      {/* 2nd box
    <div className='box2'>
      <div className='ChooseVehicle'>
        <h1>Choose Vehicle</h1>
        <div className='VehicleList'>
          <ul>
            <li>Car</li>
            <li>Bike</li>
            <li>Cycle</li>
            <li>Truck</li>
          </ul>
        </div>
      </div>
    </div> */}

      {/* 2nd box */}
      <div className="box2">
        <div className="WhatWeDo">
          <h3>What we do?</h3>
          <div className="workList">
            <ul>
              <li>Vehicle Service</li>
              <li>Vehicle Wash</li>
              <li>Parts Sell</li>
              <li>Emergency Service</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3rd box */}
      <div className="box3">
        <div className="WhyChooseUs">
          <h1>Why Choose Us?</h1>
          <div className="whyUsList">
            <ol>
              <li>Car Service at home</li>
              <li>Repairs at home</li>
              <li>Used car inspection</li>
              <li>a/c repair</li>
              <li>battery replacement</li>
            </ol>
          </div>
          <div className="bookNow">
            <h3>BOOK NOW</h3>
          </div>
        </div>
      </div>

      {/* box 4 */}
      <div className="box4">
        {/* <div className='ourService'>
    <h4>Our Services</h4>
    <ul>
      <li>lalala</li>
      <li>lalala</li>
      <li>lalalla</li>
    </ul>
  </div> */}

        <div className="contactUs">
          <h3>Contact Us</h3>
          <p>amar bari ghor nai</p>
        </div>

        <div className="socialHandles">
          <ul>
            <li>instagram</li>
            <li>facebook</li>
          </ul>
        </div>
      </div>

      <div className="Chat">
        <button>Chat with us</button>
      </div>

      {/* div close */}
    </div>
  );
};
