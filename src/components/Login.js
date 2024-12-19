import React from 'react';
import { signInWithGoogle } from '../actions/authActions';
import { connect } from 'react-redux';

const Login = ({ signInWithGoogle }) => {
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default connect(null, { signInWithGoogle })(Login);