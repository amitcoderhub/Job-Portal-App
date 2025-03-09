import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // For animations

const CandidateDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserData, setShowUserData] = useState(false);
  const [filterType, setFilterType] = useState(''); // 'Internship' or 'Job'
  const [showFilters, setShowFilters] = useState(false); // Toggle filter section
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    skills: '',
    type: '', // Full-time/Part-time
    duration: '', // For internships
    stipend: '', // For internships
    salary: '', // For jobs
  });
  const navigate = useNavigate();

  // Fetch opportunities from localStorage
  useEffect(() => {
    const opportunities = JSON.parse(localStorage.getItem('opportunities')) || [];
    setOpportunities(opportunities);
  }, []);

  // Get current candidate data from localStorage
  const currentCandidate = JSON.parse(localStorage.getItem('currentCandidate'));

  // Redirect to login if currentCandidate is null
  useEffect(() => {
    if (!currentCandidate) {
      navigate('/candidate/login');
    }
  }, [currentCandidate, navigate]);

  // Disable browser back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentCandidate');
    navigate('/candidate/login'); // Redirect to login page after logout
  };

  // Filter opportunities based on search query and filters
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skills.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType ? opp.type === filterType : true;
    const matchesLocation = filters.location ? opp.city === filters.location : true;
    const matchesCategory = filters.category ? opp.industry === filters.category : true;
    const matchesSkills = filters.skills ? opp.skills.toLowerCase().includes(filters.skills.toLowerCase()) : true;
    const matchesJobType = filters.type ? opp.jobType === filters.type : true;
    const matchesDuration = filters.duration ? opp.duration === filters.duration : true;
    const matchesStipend = filters.stipend ? opp.stipend >= parseInt(filters.stipend) : true;
    const matchesSalary = filters.salary ? opp.salary >= parseInt(filters.salary) : true;

    return matchesSearch && matchesType && matchesLocation && matchesCategory && matchesSkills && matchesJobType &&
      (filterType === 'Internship' ? matchesDuration && matchesStipend : matchesSalary);
  });

  // Handle filter button click (toggle functionality)
  const handleFilterClick = (type) => {
    if (filterType === type) {
      // If the same button is clicked again, close the filter section
      setFilterType('');
      setShowFilters(false);
    } else {
      // Open the filter section for the selected type
      setFilterType(type);
      setShowFilters(true);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      location: '',
      category: '',
      skills: '',
      type: '',
      duration: '',
      stipend: '',
      salary: '',
    });
  };

  // If currentCandidate is null, don't render the dashboard
  if (!currentCandidate) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      {/* Header with Search Bar, User Icon, and Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
      >
        <h1 className="text-3xl font-bold text-gray-800">Available Opportunities</h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by title, company, or skills"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/50 backdrop-blur-sm"
          />
          <div className="flex space-x-4 w-full md:w-auto justify-center">
            <button
              onClick={() => handleFilterClick('Internship')}
              className={`p-2 ${
                filterType === 'Internship' ? 'bg-blue-600' : 'bg-blue-500'
              } text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md w-full md:w-auto`}
            >
              Internship
            </button>
            <button
              onClick={() => handleFilterClick('Job')}
              className={`p-2 ${
                filterType === 'Job' ? 'bg-green-600' : 'bg-green-500'
              } text-white rounded-lg hover:bg-green-600 transition duration-300 shadow-md w-full md:w-auto`}
            >
              Job
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowUserData(!showUserData)}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none transition duration-300 shadow-md"
            >
              👤
            </button>
          </div>
        </div>
      </motion.div>

      {/* User Profile Dropdown */}
      <AnimatePresence>
        {showUserData && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowUserData(false)}
            ></motion.div>

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h3 className="text-lg font-semibold mb-4">User Profile</h3>
                <p><strong>Name:</strong> {currentCandidate.firstName} {currentCandidate.lastName}</p>
                <p><strong>Username:</strong> {currentCandidate.username}</p>
                <p><strong>Email:</strong> {currentCandidate.email}</p>
                <Link
                  to="/my-applications"
                  className="block mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center transition duration-300"
                >
                  My Applications
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 p-6 bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Filter {filterType}s</h2>
            <div className="space-y-4">
              {/* Common Filters */}
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/50 backdrop-blur-sm"
                >
                  <option value="">Select Category</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Skills</label>
                <input
                  type="text"
                  name="skills"
                  placeholder="Enter skills"
                  value={filters.skills}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/50 backdrop-blur-sm"
                >
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>

              {/* Internship-Specific Filters */}
              {filterType === 'Internship' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (Months)</label>
                    <input
                      type="number"
                      name="duration"
                      placeholder="Enter duration"
                      value={filters.duration}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Minimum Stipend</label>
                    <input
                      type="number"
                      name="stipend"
                      placeholder="Enter stipend"
                      value={filters.stipend}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                </>
              )}

              {/* Job-Specific Filters */}
              {filterType === 'Job' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Minimum Salary</label>
                  <input
                    type="number"
                    name="salary"
                    placeholder="Enter salary"
                    value={filters.salary}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/50 backdrop-blur-sm"
                  />
                </div>
              )}

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 shadow-md"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opportunities List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredOpportunities.map((opp, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{opp.title}</h3>
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
            <Link
              to="/apply"
              state={{ opportunity: opp }}
              className="block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center transition duration-300"
            >
              Apply Now
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CandidateDashboard;