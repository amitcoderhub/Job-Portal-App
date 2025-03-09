import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    resume: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { opportunity } = location.state; // Get the opportunity details from the previous page

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email || !formData.mobile || !formData.resume) {
      alert('Please fill all fields');
      return;
    }

    // Get current candidate from localStorage
    const currentCandidate = JSON.parse(localStorage.getItem('currentCandidate'));

    // Create application object
    const application = {
      id: new Date().getTime(), // Unique ID for the application
      ...opportunity, // Include opportunity details
      appliedAt: new Date().toISOString(), // Add application timestamp
      applicationDetails: formData, // Include user's application details
      status: 'Pending', // Default status
      username: currentCandidate.username, // Associate application with the candidate's username
      candidateName: currentCandidate.firstName + ' ' + currentCandidate.lastName, // Add candidate name
      employerId: opportunity.employerId, // Add employer ID for filtering
    };

    // Debugging: Log the application object before saving
    console.log('Application to be saved:', application);

    // Update global applications list in localStorage
    const allApplications = JSON.parse(localStorage.getItem('candidateApplications')) || [];
    allApplications.push(application);
    localStorage.setItem('candidateApplications', JSON.stringify(allApplications));

    // Update candidate's applications in localStorage
    const updatedCandidate = {
      ...currentCandidate,
      applications: [...(currentCandidate.applications || []), application], // Add new application to the list
    };
    localStorage.setItem('currentCandidate', JSON.stringify(updatedCandidate));

    // Redirect to the candidate dashboard
    navigate('/candidate/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Apply for {opportunity.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Resume (URL)</label>
          <input
            type="url"
            placeholder="Enter your resume URL"
            value={formData.resume}
            onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;