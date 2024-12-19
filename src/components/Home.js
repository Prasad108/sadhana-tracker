import React from 'react';
import { useSelector } from 'react-redux';

import Logout from './Logout';
import SadhanaForm from './SadhanaForm';
import SadhanaReport from './SadhanaReport';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const [showForm, setShowForm] = React.useState(true);
  const [showReport, setShowReport] = React.useState(false);

  const handleShowForm = () => {
    setShowForm(true);
    setShowReport(false);
  };

  const handleShowReport = () => {
    setShowForm(false);
    setShowReport(true);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.displayName}!
      </h1>
      <div className="flex justify-between mb-4">
            <button
                className={`w-1/2 ${
                showForm ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                } py-2 px-4 rounded-md`}
                onClick={handleShowForm}
            >
                Log Sadhana
            </button>
            <button
                className={`w-1/2 ${
                showReport ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                } py-2 px-4 rounded-md`}
                onClick={handleShowReport}
            >
                View Report
            </button>
            </div>
      {showForm && <SadhanaForm />}
      {showReport && <SadhanaReport />}
      <Logout />
    </div>
  );
};

export default Home;