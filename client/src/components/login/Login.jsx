import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { FaCar, FaMotorcycle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  const [action, setAction] = useState('Login');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Login');
    navigate('/home');
  };

  const handleSignUp = () => {
    console.log('Sign Up');
    // Add sign-up logic here
  };

  return (
    <div className='loginpage'>
      <div className='leftContainer'>
        <h1>AutoMate</h1>
        <p>Amra gari bechi ..amra gari dhui</p>
      </div>
      <div className='container'>
        {action === 'Login' ? (
          <>
            {/* Login Form */}
            <div className='inputs'>
              <div className='input'>
                <span className='icon'><FaEnvelope /></span>
                <input type="email" placeholder='Email Id' />
              </div>
              <div className='input'>
                <span className='icon'><FaLock /></span>
                <input type="password" placeholder='Password' />
              </div>
            </div>

            <div className='checkboxInput'>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox" id='rememberMe'>Remember me</label>
            </div>

            <div className='submit-container'>
              <div className='submit' onClick={handleLogin}>
                Login
              </div>
            </div>
            <div className='forgot-password'>
              Forgot Password? <span>Click Here!</span>
            </div>
            <div className='underline'></div>
            <div className='submit-container'>
              <div className='submit' onClick={() => setAction('Sign Up')}>
                Create New Account
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Sign Up Form */}
            <div className='inputs'>
              <div className='input'>
                <span className='icon'><FaUser /></span>
                <input type="text" placeholder='Name' />
              </div>
              <div className='input'>
                <span className='icon'><FaEnvelope /></span>
                <input type="email" placeholder='Email Id' />
              </div>
              <div className='input'>
                <span className='icon'><FaLock /></span>
                <input type="password" placeholder='Password' />
              </div>
            </div>

              {/* Vehicle Options */}
            <div className='vehicleOption'>
              <div className='vehicleTitle'>Choose Your Vehicle:</div>
              <form className='vehicles'>
                <div>
                  <input type="radio" id="Car" name="vehicle" value="Car" />
                  <label htmlFor="Car">Car</label>
                </div>
                <div>
                  <input type="radio" id="Bike" name="vehicle" value="Bike" />
                  <label htmlFor="Bike">Bike</label>
                </div>
                {/* Add more vehicle options if needed */}
              </form>
            </div>


            <div className='input'>
                <span className='icon'><FaCar /></span>
                <input type="text" placeholder='Brand' />
              </div>

            <div className='input'>
                <span className='icon'><FaMotorcycle /></span>
                <input type="text" placeholder='Model' />
              </div>





            <div className='submit-container'>
              <div className='submit' onClick={handleSignUp}>
                Sign Up
              </div>
            </div>
            <div className='existing-account'>
              Already have an account? <span onClick={() => setAction('Login')}>Login</span>
            </div>
          </>
        )}
      </div>

      <div className='footer'>
        <p>&copy; 2024 AutoMate. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
