import React from 'react';
import Login from './Login';
import Logout from './Logout';
import { connect } from 'react-redux';

const App = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
          <Logout />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(App);