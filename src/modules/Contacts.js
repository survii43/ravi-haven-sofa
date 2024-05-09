import React, { useState } from 'react';
import backgroundImage from '../images/hero1004.jpeg'; 
import firebase from '../firebase/firebase';
import 'firebase/database';

export default function Contacts() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // You can add your form submission logic here
  //   console.log(formData);
  //   // Reset form fields after submission
  //   setFormData({
  //     name: '',
  //     email: '',
  //     mobileNumber: ''
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Get a reference to the database service
    const database = firebase.database();
  
    // Save data to Firebase Realtime Database
    const newContactRef = database.ref('Contacts').push();
    newContactRef.set({
      name: formData.name,
      email: formData.email,
      number: formData.mobileNumber // Change 'number' to 'mobileNumber'
    });
  
    // Clear form data after submission
    setFormData({ name: '', email: '', mobileNumber: '' }); // Clear 'mobileNumber' instead of 'number'
  };
  

  return (
    <div 
      className="bg-cover bg-center bg-opacity-50 h-screen flex justify-center items-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form onSubmit={handleSubmit} className="relative z-10 bg-white bg-opacity-80 p-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Contact Form</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className='border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-full'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className='border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-full'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-gray-700">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            className='border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-full'
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

