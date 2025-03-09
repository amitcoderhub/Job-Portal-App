import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobPostingForm = () => {
  const [isInternship, setIsInternship] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Job',
    profile: '',
    skills: '',
    openings: '',
    startDate: '',
    duration: '',
    stipend: '',
    perks: ''
  });
  const navigate = useNavigate();

  // Back button handler
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get current employer from localStorage
    const currentEmployer = JSON.parse(localStorage.getItem('currentEmployer'));

    // Create opportunity object
    const opportunity = {
      ...formData,
      company: currentEmployer.companyName, // Add company name
      employerId: currentEmployer.email, // Add employer ID
      postedAt: new Date().toISOString(), // Add posting timestamp
    };

    // Update opportunities list in localStorage
    const opportunities = JSON.parse(localStorage.getItem('opportunities')) || [];
    opportunities.push(opportunity);
    localStorage.setItem('opportunities', JSON.stringify(opportunities));

    alert('Opportunity posted successfully!');
    navigate('/employer/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Post New Opportunity</h2>
      
      <div className="mb-4">
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={isInternship}
            onChange={(e) => {
              setIsInternship(e.target.checked);
              setFormData({ ...formData, type: e.target.checked ? 'Internship' : 'Job' });
            }}
            className="mr-2"
          />
          Internship Opportunity
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Profile Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Required Skills (comma separated)"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="number"
          placeholder="Number of Openings"
          value={formData.openings}
          onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {isInternship && (
          <>
            <input
              type="text"
              placeholder="Internship Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Stipend"
              value={formData.stipend}
              onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
          </>
        )}

        <input
          type="date"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <textarea
          placeholder="Perks and Benefits"
          value={formData.perks}
          onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          rows="4"
        />

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Post Opportunity
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;