import React from 'react';

const ReportDisplay = ({ report, startDate, endDate }) => {
  const dates = getDatesBetween(startDate, endDate);
  const records = report.records;

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded">
      <p className="text-md text-gray-700 mb-4">
        From: <span className="font-bold">{startDate}</span> To: <span className="font-bold">{endDate}</span>
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 border border-gray-300">Date</th>
              <th className="px-2 py-2 border border-gray-300 rotate-text">Chanting<br />Completed</th>
              <th className="px-2 py-2 border border-gray-300 rotate-text">Guru<br />Maharaj Lecture</th>
              <th className="px-2 py-2 border border-gray-300 rotate-text">Mangal<br />Aarti Attended</th>
              <th className="px-2 py-2 border border-gray-300 rotate-text">S.P.<br />Lecture</th>
              <th className="px-2 py-2 border border-gray-300 rotate-text">Reading<br />Completed</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => {
              const record = records.find((r) => r.date.startsWith(date));
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-2 py-2 border border-gray-300">{date}</td>
                  <td className="px-2 py-2 border border-gray-300">
                    {record ? record.chantingCompleted : '-'}
                  </td>
                  <td className="px-2 py-2 border border-gray-300">
                    {record ? (record.guruMaharajLecture ? 'Yes' : 'No') : '-'}
                  </td>
                  <td className="px-2 py-2 border border-gray-300">
                    {record ? (record.mangalAartiAttended ? 'Yes' : 'No') : '-'}
                  </td>
                  <td className="px-2 py-2 border border-gray-300">
                    {record ? (record.prabhupadaLecture ? 'Yes' : 'No') : '-'}
                  </td>
                  <td className="px-2 py-2 border border-gray-300">
                    {record ? (record.readingCompleted ? 'Yes' : 'No') : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  while (start <= end) {
    dates.push(start.toISOString().split('T')[0]);
    start.setDate(start.getDate() + 1);
  }

  return dates;
};

export default ReportDisplay;
