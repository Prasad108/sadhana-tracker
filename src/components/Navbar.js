import React from 'react';
import Login from './Login';
import Home from './Home';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      );
      }

  return (
    <div>
            {user ? (<Home />) : (<Login />)}
    </div>
  );
};

export default Navbar;