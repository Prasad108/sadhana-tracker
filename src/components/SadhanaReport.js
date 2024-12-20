import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getReport } from '../api/api';

import ReportDisplay from './ReportDisplay';

const SadhanaReport = () => {
  const [reportType, setReportType] = useState('week');
  const [reportPeriod, setReportPeriod] = useState('');
  const [error, setError] = useState('');
  const [report, setReport] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [viewReport, setViewReport] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    setReportPeriod(''); // Reset reportPeriod when the reportType changes
  };

  const handleReportPeriodChange = (event) => {
    setReportPeriod(event.target.value);
    setReport(null); 
  };

  const isViewReportEnabled = reportPeriod !== '';

  const handleViewReport = async () => {
    const [start, end] = getStartAndEndDates(reportPeriod, reportType);
    setStartDate(start);
    setEndDate(end);

    const payload = {
      uid: user.uid,
      startDate: start,
      endDate: end,
    };

    try {
      setError('');
      setReport(null);
      const response = await getReport(payload);

      if(response.records.length === 0){
        setViewReport(false); 
        setReport(response); 

      }else{
        setReport(response); // Set report data on success
        setViewReport(true); // Show the ReportDisplay component
      }
    } catch (err) {
      setError('Failed to fetch the report. Please try again later.');
      console.error('Error fetching report:', err);
    }
  };

  const handleBack = () => {
    setViewReport(false); // Hide the ReportDisplay component and go back to form
  };

  const getStartAndEndDates = (period, type) => {
    if (type === 'week') {
      const [year, week] = period.split('-W');
      const start = new Date(year, 0, (week - 1) * 7 + 1); // Start of the week
      const end = new Date(year, 0, week * 7); // End of the week
      return [start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)];
    } else if (type === 'month') {
      const [year, month] = period.split('-');
      const start = new Date(year, month - 1, 1); // First day of the month
      const end = new Date(year, month, 0); // Last day of the month
      return [start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)];
    }
    return [null, null];
  };

  return (
    <div >
      {/* <h1 className="text-2xl font-bold mb-4">Sadhana Report</h1> */}
      {!viewReport ? (
        <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Report Type:
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={reportType}
                onChange={handleReportTypeChange}
              >
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Report Period:
              </label>
              {reportType === 'week' ? (
                <input
                  type="week"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reportPeriod}
                  onChange={handleReportPeriodChange}
                />
              ) : (
                <input
                  type="month"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reportPeriod}
                  onChange={handleReportPeriodChange}
                />
              )}
            </div>
          <button
            onClick={handleViewReport}
            className={`py-2 px-4 font-bold rounded focus:outline-none focus:shadow-outline ${
              isViewReportEnabled
                ? 'bg-blue-500 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isViewReportEnabled}
          >
            View Report
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          {report && report.records.length === 0 && (
            <div className="mt-4 p-4 border border-gray-300 rounded">
              <p className="text-gray-500 italic">No Records found for selected time.</p>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={handleBack}
            className="mb-4 py-2 px-4 font-bold rounded bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none"
          >
            Back
          </button>
          <ReportDisplay
            report={report}
            startDate={startDate}
            endDate={endDate}
          />
        </>
      )}
    </div>
  );
};

export default SadhanaReport;
