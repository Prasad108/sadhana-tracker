import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { submitSadhanaDetails } from '../api/api';

const SadhanaForm = () => {
  const user = useSelector((state) => state.auth.user);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toISOString().slice(11, 16); // Format as "HH:MM"
  };

  const [sadhana, setSadhana] = useState({
    date: new Date().toISOString().slice(0, 10), // Default to today's date
    chantingCompleted: getCurrentTime(), // Default to current time
    uid: user.uid, // User ID from Redux store
    readingCompleted: false,
    prabhupadaLecture: false,
    guruMaharajLecture: false,
    mangalAartiAttended: false,
  });

  const handleToggle = (field) => {
    setSadhana((prevSadhana) => ({
      ...prevSadhana,
      [field]: !prevSadhana[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitSadhanaDetails(sadhana);
      alert('Sadhana details submitted successfully!');
      console.log('Response from API:', response);
    } catch (error) {
      alert('Failed to submit Sadhana details. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Sadhana Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Date Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            value={sadhana.date}
            onChange={(e) =>
              setSadhana((prevSadhana) => ({
                ...prevSadhana,
                date: e.target.value,
              }))
            }
          />
        </div>

        {/* Chanting Time */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Chanting Completed By Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="time"
            value={sadhana.chantingCompleted}
            onChange={(e) =>
              setSadhana((prevSadhana) => ({
                ...prevSadhana,
                chantingCompleted: e.target.value,
              }))
            }
          />
        </div>

        {/* Toggles for Reading, Lectures, and Mangal Aarti */}
        {[
          { field: 'readingCompleted', label: 'Reading 10 min' },
          { field: 'prabhupadaLecture', label: 'Srila Prabhupada Lecture Hearing' },
          { field: 'guruMaharajLecture', label: 'Guru Maharaj Lecture Hearing' },
          { field: 'mangalAartiAttended', label: 'Mangal Aarti Attended' },
        ].map(({ field, label }) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <div className="flex items-center">
              <div
                className={`relative inline-block w-12 h-6 cursor-pointer ${
                  sadhana[field] ? 'bg-green-500' : 'bg-gray-300'
                } rounded-full`}
                onClick={() => handleToggle(field)}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                    sadhana[field] ? 'translate-x-6' : ''
                  }`}
                ></span>
              </div>
              <span className="ml-4">{sadhana[field] ? 'Yes' : 'No'}</span>
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SadhanaForm;
