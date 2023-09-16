import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // If there is no token, redirect to login page
    if (!token && !user) {
      navigate('/login');
    }
  }, [navigate]); // Empty dependency array ensures this effect runs only once

  return (
    <div className='flex'>
        <Sidebar/>
        <Dashboard/>
    </div>
  );
}
