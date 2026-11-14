import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data to calculate metrics dynamically
  useEffect(() => {
    fetch("https://job-application-tracker-api-inhh.onrender.com/api/JobApplications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data", err);
        setLoading(false);
      });
  }, []);

  // Calculate metrics based on Figma design cards
  const totalJobs = applications.length;
  const interviews = applications.filter(app => 
  app.status === "Interviewing" || app.status === "Interview"
).length;
  const offers = applications.filter(app => app.status === 'Offer').length;
  const rejected = applications.filter(app => app.status === 'Rejected').length;
  const applied = applications.filter(app => app.status === 'Applied').length;

  return (
      <div className="dashboard-container">
      
      

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header">
          <h1>Job Application Tracker</h1>
          <button onClick={() => navigate('/applications/new')}>
            + Add Application
          </button>
        </header>

        <section className="dashboard-view">
          <h2>Dashboard</h2>

          {/* Summary Metric Cards matching Figma */}
          <div className="metrics-grid">
            <div className="card">
              <h3>Total Jobs</h3>
              <p>{totalJobs}</p>
            </div>
            <div className="card">
              <h3>Interviews</h3>
              <p>{interviews}</p>
            </div>
            <div className="card">
              <h3>Offers</h3>
              <p>{offers}</p>
            </div>
            <div className="card">
              <h3>Rejected</h3>
              <p>{rejected}</p>
            </div>
            <div className="card">
              <h3>Applied</h3>
              <p>{applied}</p>
            </div>
          </div>

          {/* Recent Applications Table */}
          <div className="recent-section">
            <h3>Recent Applications</h3>
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 3).map((app) => (
                  <tr key={app.jobApplicationId}>
                    <td>{app.companyName}</td>
                    <td>{app.jobTitle}</td>
                    <td>{app.dateApplied?.slice(0, 10)}</td>
                    <td>
                      <span className={`status-badge ${app.status?.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}