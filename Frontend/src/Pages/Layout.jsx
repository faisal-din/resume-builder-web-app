import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import LoginPage from './LoginPage';

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {user ? (
        <div className='min-h-screen bg-gray-50'>
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Layout;
