// SadhanaReport.js
import React from 'react';

const SadhanaReport = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sadhana Report</h1>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Sadhana Type</th>
            <th className="px-4 py-2">Duration</th>
          </tr>
        </thead>
        <tbody>
          {/* Add rows for each sadhana entry */}
          <tr>
            <td className="px-4 py-2">2024-12-19</td>
            <td className="px-4 py-2">Meditation</td>
            <td className="px-4 py-2">30 minutes</td>
          </tr>
        </tbody>
      </table>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download Report
      </button>
    </div>
  );
};

export default SadhanaReport;