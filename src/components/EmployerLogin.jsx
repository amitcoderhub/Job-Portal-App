import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EmployerLogin = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if the user is already logged in and not coming from the Landing Page
  useEffect(() => {
    const currentEmployer = JSON.parse(localStorage.getItem('currentEmployer'));
    const fromLandingPage = location.state?.from === '/'; // Check if coming from Landing Page
    if (currentEmployer && !fromLandingPage) {
      navigate('/employer/dashboard', { replace: true }); // Redirect to dashboard if already logged in
    }
  }, [navigate, location.state]);

  // Back button handler
  const handleBack = () => {
    const from = location.state?.from || '/'; // Get the previous page from location state, default to '/'
    navigate(from, { replace: true }); // Go back to the previous page
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const employers = JSON.parse(localStorage.getItem('employers')) || [];
    const employer = employers.find(
      (emp) => emp.email === loginData.email && emp.password === loginData.password
    );
    if (employer) {
      localStorage.setItem('currentEmployer', JSON.stringify(employer));
      navigate('/employer/dashboard', { replace: true }); // Use replace: true to prevent going back to login
    } else {
      alert('Invalid credentials. Please sign up first.');
      navigate('/employer/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 bg-gray-100 border-4 border-blue-400 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300 shadow-md"
      >
        ← Back
      </button>

      {/* Login Card with 3D Effect */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transform transition-transform hover:scale-105 border-4 border-blue-400">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Employer Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
        </form>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/employer/signup')}
          className="text-blue-500 hover:text-blue-600 font-semibold transition duration-300"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default EmployerLogin;