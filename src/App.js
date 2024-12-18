import React, { useState } from "react";
import { signInWithGoogle, logOut, getCurrentUser } from "./Auth";

const App = () => {
  const [user, setUser] = useState(getCurrentUser());

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await logOut();
    setUser(null);
  };

  return (
    <div>
      <h1>Sadhana Tracker</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Sign In with Google</button>
      )}
    </div>
  );
};

export default App;
