import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Set new password
  const navigate = useNavigate();

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Handle email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('candidates')) || [];
    const user = users.find((u) => u.email === email);
    if (user) {
      setStep(2); // Move to the next step (set new password)
    } else {
      alert('Email not found');
    }
  };

  // Handle new password submission
  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem('candidates')) || [];
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );
    localStorage.setItem('candidates', JSON.stringify(updatedUsers));

    alert('Password updated successfully!');
    navigate('/candidate/login'); // Redirect to login page
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleNewPasswordSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Set New Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;