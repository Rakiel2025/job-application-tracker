import { useEffect, useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { getApplications } from '../services/jobApplicationService';
import '../App.css'

export default function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        
        // PASTE THE FETCH CODE HERE
        const response = await fetch(
          "https://localhost:7034/api/JobApplications" // Make sure your port matches your C# backend port!
        );

        if (!response.ok) {
          throw new Error("Unable to load applications.");
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError(
          "Unable to load job applications. Please try again later."
        );
        console.error("Application loading failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Your return statement and table code go here...

  const safeApplications = Array.isArray(applications) ? applications : [];

  const filteredApplications = safeApplications.filter((app) => {
    // Safely check search query using your 'searchTerm' state
    const company = app.companyName || "";
    const title = app.jobTitle || "";
    const query = searchTerm || "";

    const matchesSearch = 
      company.toLowerCase().includes(query.toLowerCase()) ||
      title.toLowerCase().includes(query.toLowerCase());

    // Safely check status filter
    const appStatus = app.status || "";
    const matchesStatus = 
      statusFilter === "All" || statusFilter === "" || appStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });
  




  
  

  if (loading) {
    return <p>Loading applications...</p>;
  }

  if (error) {
    return <p role="alert">Could not load applications: {error}</p>;
  }

  return (
  <div className="app-container">
    {/* Sidebar Navigation on the Left */}
    

    {/* Main Content Area on the Right */}
    <main className="main-content">
      <header className="top-header">
        <h1>Job Application Tracker</h1>
        <button 
          type="button"
          onClick={() => navigate('/applications/new')}
        >
          + Add Application
        </button>
      </header>

      <section className="applications-view">
        <h2>Applications</h2>
        <p>Keep track of your job applications.</p>

        {error && <div className="error-banner">{error}</div>}

        <div className="application-controls">
          <div className="filter-group">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Search company or job title..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search applications"
            />
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select 
        value={statusFilter} 
        onChange={(e) => setStatusFilter(e.target.value)}
      
              aria-label="Filter by status"
            >
              <option value="All">All statuses...</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interview</option>
              <option value="Assessment">Assessment</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>

        <div className="recent-section">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.jobApplicationId}>
                  <td>{application.companyName}</td>
                  <td>{application.jobTitle}</td>
                  <td>{application.dateApplied?.slice(0, 10)}</td>
                  <td>
                    <span className={`status-badge ${application.status?.toLowerCase()}`}>
                      {application.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn-secondary"
                      onClick={() => navigate(`/applications/${application.jobApplicationId}`)}
                      >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan="4">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
);
}