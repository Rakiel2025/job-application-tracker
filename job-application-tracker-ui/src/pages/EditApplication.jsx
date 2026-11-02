import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    location: '',
    dateApplied: '',
    status: 'Applied',
    jobUrl: '',
    notes: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch existing application data when the page opens
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://localhost:7034/api/JobApplications/${id}`);
        if (!response.ok) throw new Error("Failed to fetch application data.");
        
        const data = await response.json();
        
        // Format date string for the date input (YYYY-MM-DD)
        if (data.dateApplied) {
          data.dateApplied = data.dateApplied.slice(0, 10);
        }

        setFormData(data);
      } catch (err) {
        setError("Could not load application data for editing.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. Handle form submission (PUT request to update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure id is included in the payload if your C# model requires it
  const payload = {
    ...formData,
    id: Number(id) // or jobApplicationId: Number(id) matching your C# model
  };

    try {
      const response = await fetch(`https://localhost:7034/api/JobApplications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update application.");

      navigate(`/applications/${id}`);
    } catch (err) {
      setError("Failed to save changes. Please check your inputs.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading edit form...</p>;

  return (
    <div className="app-container">
      <main className="main-content">
        <h2>Edit Job Application</h2>

        {error && <p role="alert" className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date Applied</label>
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interview</option>
              <option value="Assessment">Assessment</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>

          <div className="form-group">
            <label>Job URL</label>
            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate(`/applications/${id}`)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}