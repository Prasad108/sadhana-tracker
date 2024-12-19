import React, { useState } from 'react';

const SadhanaForm = () => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toISOString().slice(11, 16); // Format as "HH:MM"
  };

  const [sadhana, setSadhana] = useState({
    date: new Date().toISOString().slice(0, 10), // Default to today's date
    chantingCompleted: getCurrentTime(), // Default to current time
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sadhana Details Submitted:', sadhana);
    alert('Sadhana details submitted successfully!');
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

        {/* Reading Toggle */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Reading 10 min
          </label>
          <div className="flex items-center">
            <div
              className={`relative inline-block w-12 h-6 cursor-pointer ${
                sadhana.readingCompleted ? 'bg-green-500' : 'bg-gray-300'
              } rounded-full`}
              onClick={() => handleToggle('readingCompleted')}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                  sadhana.readingCompleted ? 'translate-x-6' : ''
                }`}
              ></span>
            </div>
            <span className="ml-4">
              {sadhana.readingCompleted ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {/* Prabhupada Lecture Toggle */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Srila Prabhupada Lecture Hearing
          </label>
          <div className="flex items-center">
            <div
              className={`relative inline-block w-12 h-6 cursor-pointer ${
                sadhana.prabhupadaLecture ? 'bg-green-500' : 'bg-gray-300'
              } rounded-full`}
              onClick={() => handleToggle('prabhupadaLecture')}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                  sadhana.prabhupadaLecture ? 'translate-x-6' : ''
                }`}
              ></span>
            </div>
            <span className="ml-4">
              {sadhana.prabhupadaLecture ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {/* Guru Maharaj Lecture Toggle */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Guru Maharaj Lecture Hearing
          </label>
          <div className="flex items-center">
            <div
              className={`relative inline-block w-12 h-6 cursor-pointer ${
                sadhana.guruMaharajLecture ? 'bg-green-500' : 'bg-gray-300'
              } rounded-full`}
              onClick={() => handleToggle('guruMaharajLecture')}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                  sadhana.guruMaharajLecture ? 'translate-x-6' : ''
                }`}
              ></span>
            </div>
            <span className="ml-4">
              {sadhana.guruMaharajLecture ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {/* Mangal Aarti Attended Toggle */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mangal Aarti Attended
          </label>
          <div className="flex items-center">
            <div
              className={`relative inline-block w-12 h-6 cursor-pointer ${
                sadhana.mangalAartiAttended ? 'bg-green-500' : 'bg-gray-300'
              } rounded-full`}
              onClick={() => handleToggle('mangalAartiAttended')}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                  sadhana.mangalAartiAttended ? 'translate-x-6' : ''
                }`}
              ></span>
            </div>
            <span className="ml-4">
              {sadhana.mangalAartiAttended ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

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
