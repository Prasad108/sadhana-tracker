import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInWithGoogle, signOut } from './actions/authActions';
import { auth } from './firebase-config'; // Import the auth object from your firebase config file

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

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

  const handleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default App;