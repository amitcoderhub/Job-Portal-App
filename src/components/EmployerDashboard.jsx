import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // For animations

const EmployerDashboard = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const navigate = useNavigate();

  // Get the logged-in employer from localStorage
  const currentEmployer = JSON.parse(localStorage.getItem('currentEmployer'));

  // Fetch opportunities for the logged-in employer
  useEffect(() => {
    const allOpportunities = JSON.parse(localStorage.getItem('opportunities')) || [];
    const employerOpportunities = allOpportunities.filter(
      (opp) => opp.employerId === currentEmployer.email
    );
    setOpportunities(employerOpportunities);
  }, [currentEmployer.email]);

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentEmployer');
    navigate('/employer/login'); // Redirect to employer login page
  };

  // Handle removing an opportunity
  const handleRemoveOpportunity = (opportunityId) => {
    const allOpportunities = JSON.parse(localStorage.getItem('opportunities')) || [];
    const updatedOpportunities = allOpportunities.filter(
      (opp) => opp.id !== opportunityId
    );

    // Update localStorage
    localStorage.setItem('opportunities', JSON.stringify(updatedOpportunities));

    // Update state to reflect the change
    setOpportunities(updatedOpportunities.filter((opp) => opp.employerId === currentEmployer.email));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employer Dashboard</h1>
        <button
          onClick={() => setShowUserDetails(!showUserDetails)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none transition duration-300 shadow-md"
        >
          👤
        </button>
      </div>

      {/* User Profile Dropdown */}
      <AnimatePresence>
        {showUserDetails && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowUserDetails(false)}
            ></motion.div>

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h3 className="text-lg font-semibold mb-4">Employer Profile</h3>
                <p><strong>Name:</strong> {currentEmployer.firstName} {currentEmployer.lastName}</p>
                <p><strong>Email:</strong> {currentEmployer.email}</p>
                <p><strong>Company:</strong> {currentEmployer.companyName}</p>

                {/* Link to Candidate Applications Page */}
                <button
                  onClick={() => navigate('/employer/candidate-applications')}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-4"
                >
                  View Candidate Applications
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mt-6"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Post Job or Internship Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/employer/post-job')}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-xl"
        >
          Post Job or Internship
        </button>
      </div>

      {/* Posted Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.length > 0 ? (
          opportunities.map((opp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{opp.title}</h3>
              <p className="text-gray-600 mb-2">{opp.company}</p>
              <div className="flex justify-between mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {opp.type}
                </span>
                <span className="text-gray-500">{new Date(opp.postedAt).toLocaleDateString()}</span>
              </div>
              <p className="mb-2"><strong>Skills:</strong> {opp.skills}</p>
              <p className="mb-2"><strong>Openings:</strong> {opp.openings}</p>
              {opp.type === 'Internship' && (
                <>
                  <p className="mb-2"><strong>Duration:</strong> {opp.duration} months</p>
                  <p className="mb-2"><strong>Stipend:</strong> ${opp.stipend}</p>
                </>
              )}
              {opp.type === 'Job' && (
                <p className="mb-2"><strong>Salary:</strong> ${opp.salary}</p>
              )}
              <p className="mb-2"><strong>Status:</strong> {opp.status || 'Open'}</p>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveOpportunity(opp.id)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md mt-4"
              >
                Remove
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600">No opportunities posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;