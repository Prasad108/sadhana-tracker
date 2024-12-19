import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../actions/authActions';

const Logout = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleSignOut}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign out
      </button>
    </div>
  );
};

export default Logout;