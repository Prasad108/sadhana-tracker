import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../actions/authActions';

const Login = () => {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Sadhana Tracker</h1>
      <p className="text-lg mb-8 text-gray-600 text-center">
        Track your daily spiritual practices and stay committed to your goals.
      </p>
      <ul className="list-disc text-lg mb-8 space-y-2">
        <li>Track chanting, reading, hearing, and morning prayers</li>
        <li>View weekly and monthly reports</li>
        <li>Stay motivated and committed to your spiritual growth</li>
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
        onClick={handleSignIn}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;