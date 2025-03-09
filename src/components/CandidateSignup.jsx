import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const users = JSON.parse(localStorage.getItem('candidates')) || [];
    if (users.find((user) => user.username === formData.username)) {
      alert('Username already exists');
      return;
    }
    users.push(formData);
    localStorage.setItem('candidates', JSON.stringify(users));
    alert('Signup successful! Please login.');
    navigate('/candidate/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 bg-gray-200 border-4 border-blue-500 text-black px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md"
      >
        ← Back
      </button>

      {/* Signup Card with 3D Effect */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transform transition-transform hover:scale-105 border-4 border-blue-400">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Candidate Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/candidate/login')}
          className="text-blue-500 hover:text-blue-600 font-semibold transition duration-300"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default CandidateSignup;