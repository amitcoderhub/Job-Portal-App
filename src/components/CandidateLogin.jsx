import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CandidateLogin = () => {
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if the user is already logged in
  useEffect(() => {
    const currentCandidate = JSON.parse(localStorage.getItem('currentCandidate'));
    if (currentCandidate) {
      navigate('/candidate/dashboard', { replace: true }); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  // Back button handler
  const handleBack = () => {
    const from = location.state?.from || '/'; // Get the previous page from location state, default to '/'
    navigate(from, { replace: true }); // Go back to the previous page
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('candidates')) || [];
    const user = users.find(
      (u) => (u.username === loginData.identifier || u.email === loginData.identifier) && u.password === loginData.password
    );
    if (user) {
      // Fetch the candidate's applications from localStorage
      const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
      const candidateApplications = allApplications.filter(
        (app) => app.username === user.username
      );

      // Update the candidate's applications in their profile
      const updatedCandidate = {
        ...user,
        applications: candidateApplications, // Add fetched applications to the candidate's profile
      };

      // Save the updated candidate profile in localStorage
      localStorage.setItem('currentCandidate', JSON.stringify(updatedCandidate));

      // Redirect to the candidate dashboard
      navigate('/candidate/dashboard', { replace: true }); // Use replace: true to prevent going back to login
    } else {
      alert('Invalid credentials or user not found. Please sign up.');
      navigate('/candidate/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 border-4 border-blue-500 left-6 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
      >
        ← Back
      </button>

      {/* Login Card with 3D Effect */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transform transition-transform hover:scale-105 border-4 border-blue-400">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Candidate Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
            <input
              type="text"
              placeholder="Enter your username or email"
              value={loginData.identifier}
              onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="w-full text-blue-500 hover:text-blue-600 text-sm text-center transition duration-300"
          >
            Forgot Password?
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/candidate/signup')}
          className="text-blue-500 hover:text-blue-600 font-semibold transition duration-300"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default CandidateLogin;