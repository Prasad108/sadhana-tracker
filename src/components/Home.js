import React from 'react';
import { useSelector } from 'react-redux';

import Logout from './Logout';

const Home = () => {

    const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>
      <Logout />
    </div>
  );
};

export default Home;