import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null); // For details modal
  const [isModalOpen, setIsModalOpen] = useState(false); // For details modal
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // For confirmation modal
  const [applicationToReject, setApplicationToReject] = useState(null); // For confirmation modal
  const navigate = useNavigate();

  // Get the logged-in employer from localStorage
  const currentEmployer = JSON.parse(localStorage.getItem('currentEmployer'));

  // Fetch applications for the logged-in employer
  useEffect(() => {
    if (currentEmployer) {
      // Fetch all applications from localStorage
      const allApplications = JSON.parse(localStorage.getItem('candidateApplications')) || [];

      // Filter applications for the logged-in employer
      const employerApplications = allApplications.filter(
        (app) => app.employerId === currentEmployer.email && app.status !== 'Rejected'
      );

      // Set the filtered applications to state
      setApplications(employerApplications);
    }
  }, [currentEmployer]); // Only re-run if currentEmployer changes

  // Handle opening the modal with candidate details
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  // Handle opening the confirmation modal
  const handleOpenConfirmation = (application) => {
    setApplicationToReject(application);
    setIsConfirmationOpen(true);
  };

  // Handle closing the confirmation modal
  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
    setApplicationToReject(null);
  };

  // Handle accepting an application
  const handleAcceptApplication = (applicationId) => {
    if (!currentEmployer) {
      console.error('No logged-in employer found.');
      return;
    }

    const allApplications = JSON.parse(localStorage.getItem('candidateApplications')) || [];
    const updatedApplications = allApplications.map((app) =>
      app.id === applicationId ? { ...app, status: 'Accepted' } : app
    );

    // Update localStorage
    localStorage.setItem('candidateApplications', JSON.stringify(updatedApplications));

    // Update state to reflect the change
    setApplications(updatedApplications.filter((app) => app.employerId === currentEmployer.email && app.status !== 'Rejected'));

    // Close the modal
    handleCloseModal();
  };

  // Handle rejecting an application
  const handleRejectApplication = (applicationId) => {
    if (!currentEmployer) {
      console.error('No logged-in employer found.');
      return;
    }

    const allApplications = JSON.parse(localStorage.getItem('candidateApplications')) || [];
    const updatedApplications = allApplications.map((app) =>
      app.id === applicationId ? { ...app, status: 'Rejected' } : app
    );

    // Update localStorage
    localStorage.setItem('candidateApplications', JSON.stringify(updatedApplications));

    // Update state to reflect the change (remove the rejected application from the UI)
    setApplications((prevApplications) =>
      prevApplications.filter((app) => app.id !== applicationId)
    );

    // Close the confirmation modal
    handleCloseConfirmation();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Candidate Applications</h1>
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
              <p className="mb-2"><strong>Candidate:</strong> {app.candidateName}</p>
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

              {/* View Details Button */}
              <button
                onClick={() => handleViewDetails(app)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-2"
              >
                View Details
              </button>

              {/* Accept and Reject Buttons */}
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleAcceptApplication(app.id)}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleOpenConfirmation(app)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No applications found.</p>
      )}

      {/* Modal for Candidate Details */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Candidate Details</h2>
            <p><strong>Name:</strong> {selectedApplication.candidateName}</p>
            <p><strong>Email:</strong> {selectedApplication.applicationDetails.email}</p>
            <p><strong>Mobile:</strong> {selectedApplication.applicationDetails.mobile}</p>
            <p><strong>Resume:</strong> <a href={selectedApplication.applicationDetails.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Resume</a></p>
            <p><strong>Skills:</strong> {selectedApplication.skills}</p>
            <p><strong>Applied At:</strong> {new Date(selectedApplication.appliedAt).toLocaleDateString()}</p>

            {/* Modal Actions */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => handleAcceptApplication(selectedApplication.id)}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Accept
              </button>
              <button
                onClick={() => handleOpenConfirmation(selectedApplication)}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Reject
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationOpen && applicationToReject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Rejection</h2>
            <p>Are you sure you want to reject this application?</p>
            <p><strong>Candidate:</strong> {applicationToReject.candidateName}</p>
            <p><strong>Job Title:</strong> {applicationToReject.title}</p>

            {/* Confirmation Actions */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => handleRejectApplication(applicationToReject.id)}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Confirm Reject
              </button>
              <button
                onClick={handleCloseConfirmation}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateApplications;