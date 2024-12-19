import React from 'react';
import { signOut } from '../actions/authActions';
import { connect } from 'react-redux';

const Logout = ({ signOut }) => {
  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default connect(null, { signOut })(Logout);