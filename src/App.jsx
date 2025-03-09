import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CandidateSignup from './components/CandidateSignup';
import CandidateLogin from './components/CandidateLogin';
import EmployerSignup from './components/EmployerSignup';
import EmployerLogin from './components/EmployerLogin';
import ForgotPassword from './components/ForgotPassword';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import JobPostingForm from './components/JobPostingForm';
import ApplicationForm from './components/ApplicationForm';
import MyApplications from './pages/MyApplications';
import CandidateApplications from './pages/CandidateApplications'; // Add this import

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/candidate/signup" element={<CandidateSignup />} />
      <Route path="/candidate/login" element={<CandidateLogin />} />
      <Route path="/employer/signup" element={<EmployerSignup />} />
      <Route path="/employer/login" element={<EmployerLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      <Route path="/employer/post-job" element={<JobPostingForm />} />
      <Route path="/apply" element={<ApplicationForm />} />
      <Route path="/my-applications" element={<MyApplications />} />
      <Route path="/employer/candidate-applications" element={<CandidateApplications />} /> {/* Add this route */}
    </Routes>
  );
}

export default App;