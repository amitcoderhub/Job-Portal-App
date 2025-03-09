import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // Fetch applications from localStorage
  useEffect(() => {
    const currentCandidate = JSON.parse(localStorage.getItem('currentCandidate'));
    if (currentCandidate) {
      // Filter applications by the logged-in candidate's username
      const allApplications = JSON.parse(localStorage.getItem('candidateApplications')) || [];
      const candidateApplications = allApplications.filter(
        (app) => app.username === currentCandidate.username
      );
      setApplications(candidateApplications);
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">My Applications</h1>
      {applications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{app.title}</h3>
              <p className="text-gray-600 mb-2">{app.company}</p>
              <div className="flex justify-between mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {app.type}
                </span>
                <span className="text-gray-500">{new Date(app.appliedAt).toLocaleDateString()}</span>
              </div>
              <p className="mb-2"><strong>Skills:</strong> {app.skills}</p>
              <p className="mb-2"><strong>Openings:</strong> {app.openings}</p>
              {app.type === 'Internship' && (
                <>
                  <p className="mb-2"><strong>Duration:</strong> {app.duration} months</p>
                  <p className="mb-2"><strong>Stipend:</strong> ${app.stipend}</p>
                </>
              )}
              {app.type === 'Job' && (
                <p className="mb-2"><strong>Salary:</strong> ${app.salary}</p>
              )}
              <p className="mb-2"><strong>Status:</strong> {app.status || 'Pending'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You haven't applied to any opportunities yet.</p>
      )}
    </div>
  );
};

export default MyApplications;