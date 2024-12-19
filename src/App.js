import './App.css';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase-config'; // Import the auth object from your firebase config file
import Navbar from './components/Navbar';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' }); // Set initial state to loading

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // User is signed in
        dispatch({ type: 'SIGN_IN_SUCCESS', payload: currentUser });
      } else {
        // No user is signed in
        dispatch({ type: 'SIGN_OUT' });
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default App;