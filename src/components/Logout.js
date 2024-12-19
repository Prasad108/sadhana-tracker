import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../actions/authActions';

const Logout = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Logout;