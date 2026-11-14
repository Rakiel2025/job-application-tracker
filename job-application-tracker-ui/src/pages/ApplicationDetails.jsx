import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch single application details from your C# backend
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://job-application-tracker-api-inhh.onrender.com/api/JobApplications/${id}`);
        if (!response.ok) throw new Error("Failed to fetch application details.");
        const data = await response.json();
        setApplication(data);
      } catch (err) {
        setError("Could not load application details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [id]);

  
  // Handle application deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://job-application-tracker-api-inhh.onrender.com/api/JobApplications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error("Failed to delete application.");
      navigate('/applications');
    } catch (err) {
      alert("Error deleting application.");
      console.error(err);
    }
  };

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && showDeleteModal) {
      setShowDeleteModal(false);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [showDeleteModal]);

  if (loading) return <p>Loading details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!application) return <p>Application not found.</p>;

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="details-header-row">
          <div>
            <h2>Application Details</h2>
            <h3 className="job-title-heading">{application.jobTitle}</h3>
            <p className="company-heading">{application.companyName}</p>
          </div>
          <div className="action-buttons-top">
            <button className="btn-secondary" onClick={() => navigate(`/applications/${id}/edit`)}>Edit</button>
            <button className="btn-danger" onClick={() => setShowDeleteModal(true)}>Delete</button>
          </div>
        </div>

        <div className="status-row">
          <span>Status:</span>
          <span className={`status-badge ${application.status?.toLowerCase()}`}>
            {application.status}
          </span>
        </div>

        {/* Details Card */}
        <div className="details-card">
          <div className="detail-row">
            <span className="detail-label">Company</span>
            <span className="detail-value">{application.companyName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Job Title</span>
            <span className="detail-value">{application.jobTitle}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Location</span>
            <span className="detail-value">{application.location || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date Applied</span>
            <span className="detail-value">{application.dateApplied?.slice(0, 10)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Job URL</span>
            <span className="detail-value">
              <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
                {application.jobUrl || 'N/A'}
              </a>
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Notes</span>
            <span className="detail-value notes-text">{application.notes || 'No notes added.'}</span>
          </div>
        </div>

        {/* Delete Confirmation Modal Overlay */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Delete Application?</h3>
              <p>Are you sure you want to delete this job application? This action cannot be undone.</p>
              
              <div className="modal-job-preview">
                <strong>{application.companyName}</strong>
                <span>{application.jobTitle}</span>
              </div>

              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}