import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css';

export const Login = () => {
  const [action, setAction] = useState('Login');

  return (
    <div className='loginpage'>
      <div className='leftContainer'>
        <h1>AutoMate</h1>
        <p>Amra gari bechi ..amra gari dhui</p>
      </div>
      <div className='container'>
        {action === 'Login' ? (
          <>
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
              <div className='submit' onClick={() => console.log('Login')}>
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
            <div className='submit-container'>
              <div className='submit' onClick={() => console.log('Sign Up')}>
                Sign Up
              </div>
            </div>
            <div className='existing-account'>
              Already have an account? <span onClick={() => setAction('Login')}>Login</span>
            </div>
          </>
        )}
      </div>

      {/* <div className='footer'>
        <p>Bla bla bla bla bla bla bla bla bla bla blabla blabla bla</p>
      </div> */}
      
    </div>
  );
};

export default Login;
