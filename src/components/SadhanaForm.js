import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { submitSadhanaDetails } from '../api/api';

const SadhanaForm = () => {
  const user = useSelector((state) => state.auth.user);

  const getInitialState = () => {
    const now = new Date();
    const ISTOffset = 330; // IST is UTC+5:30
    const istNow = new Date(now.getTime() + ISTOffset * 60 * 1000);
    return {
      date: now.toISOString().slice(0, 10), // Default to today's date
      chantingCompleted: istNow.toISOString().slice(11, 16), // Default to current time
      uid: user.uid, // User ID from Redux store
      readingCompleted: false,
      prabhupadaLecture: false,
      guruMaharajLecture: false,
      mangalAartiAttended: false,
    };
  };

  const [sadhana, setSadhana] = useState(getInitialState());
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: '', text: '' }); // Clear message after 3 seconds
    }, 3000);
  };

  const handleToggle = (field) => {
    setSadhana((prevSadhana) => ({
      ...prevSadhana,
      [field]: !prevSadhana[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitSadhanaDetails(sadhana);
      showMessage('success', 'Details submitted successfully!');
      setSadhana(getInitialState()); // Reset state after successful submission
    } catch (error) {
      showMessage('error', 'Submission failed. Try again.');
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSadhana((prevSadhana) => ({
      ...getInitialState(),
      date: newDate,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Sadhana Form</h2>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mb-4 p-2 rounded text-sm ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700 border border-green-400'
              : 'bg-red-100 text-red-700 border border-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

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
            onChange={handleDateChange}
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
