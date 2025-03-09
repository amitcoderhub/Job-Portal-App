import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Welcome to Job Portal</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link to="/candidate/login">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl">
            Candidate Signup/Login
          </button>
        </Link>
        <Link to="/employer/login" state={{ from: '/' }}>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg hover:shadow-xl">
            Employer Signup/Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;