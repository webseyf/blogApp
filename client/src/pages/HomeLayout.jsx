import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Assuming you want to add a Navbar

const HomeLayout = () => {
  return (
    <div>
      <Navbar /> {/* Include a Navbar if you have one */}
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
}

export default HomeLayout;
