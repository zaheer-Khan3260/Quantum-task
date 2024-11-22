import React, { useState } from 'react';
import Input from '../helper/Input.jsx';
import UseRegistration from "../../customHooks/UseRegistration.js"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  });
  const [error, setError] = useState('');
  const {registerUser, responseData, responseError, loading } = UseRegistration(formData);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMessage = '';
  
    // Validate form fields
    if (formData.name === '') {
      errorMessage += 'Please enter your name. ';
    }
    if (formData.email === '') {
      errorMessage += 'Please enter your email. ';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errorMessage += 'Please enter a valid email. ';
      }
    }
    if (formData.password === '') {
      errorMessage += 'Please enter your password. ';
    }
    if (formData.dob === '') {
      errorMessage += 'Please enter your date of birth. ';
    }
  
    // Display errors if validation fails
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError('');
      await registerUser(formData);
      if (loading) {
        console.log("Loading...");
      }
      
      if (error) {
        setError(responseError);
      }
  
      if (responseData) {
        console.log("Registration successful:", responseData);
        navigate("/login");
        setFormData({
          name: '',
          email: '',
          password: '',
          dob: ''
        });
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-gradient">
      <div className="bg-[#1D2C4F] rounded-lg shadow-lg max-w-sm w-full relative p-8">
        <div className="flex justify-center mb-4 absolute top-[-10px] left-28 ">
          <div className="bg-[#00F5E1] p-2 px-12  text-gray-500 font-bold text-lg">SIGN UP</div>
        </div>
        <div className="flex justify-center mb-2 mt-14 opacity-75">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-end overflow-hidden justify-center object-contain">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.5-2 4.5-4.5S14.7 3 12 3 7.5 5 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z" />
            </svg>
          </div>
        </div>
        <div className='text-white text-sm text-end mt-5'>Already have an account 
          <Link to='/login'>
          <span className='text-blue-700 ml-2'>Log In</span>
          </Link>
          </div>
        {error && <div className="text-red-500 my-4 block w-full">{error}</div>}
        <form className="space-y-6 p-3" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 bg-[#4D5974] rounded-lg text-gray-300 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              name="name"
              onChange={handleInputChange}
            />
            <Input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-3 bg-[#4D5974] rounded-lg text-gray-300 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              name="email"
              onChange={handleInputChange}
            />
            <Input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#4D5974] rounded-lg text-gray-300 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              name="password"
              onChange={handleInputChange}
            />
          <Input
            type="date"
            placeholder="Date of Birth"
            className="w-full px-4 py-3 bg-[#4D5974] rounded-lg text-gray-300 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            name="dob"
            onChange={handleInputChange}
          />
          <div className="flex items-center justify-between text-sm text-gray-500 ">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-teal-400" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="hover:text-teal-400">Forgot your password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#00F5E1] hover:bg-teal-500 text-gray-600 py-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}