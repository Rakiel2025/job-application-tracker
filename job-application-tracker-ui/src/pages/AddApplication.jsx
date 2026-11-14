import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApplication } from '../services/jobApplicationService';
import '../App.css'


export default function AddApplication() {
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

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  
  

function validateForm() {
  let errors = [];

  if (!formData.companyName.trim()) {
        errors.push("Company name is required.");
        
    }

    if (!formData.jobTitle.trim()) {
        errors.push("Job Title is required.");
       
    }

    if (!formData.dateApplied.trim()) {
        errors.push("Date Applied is required.");
        
    }

    if (errors.length > 0) {
    setError(errors); // Joins all error messages together
    return false;
  }

    setError([]);
    return true;
}

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }
const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Run your frontend validation first
  if (!validateForm()) {
    return;
  }

  setLoading(true);

  try {
    // 2. Send request to your API with the correct /api/ path
    const response = await fetch("https://job-application-tracker-api-inhh.onrender.com/api/JobApplications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // 3. Check whether the request succeeds or fails
    if (!response.ok) {
      // Display a clear error message without crashing on .json()
      setError("Failed to save application. Please check your inputs.");
      return;
    }

    // If successful:
    alert("Application saved successfully!");
    navigate("/applications");

  } catch (err) {
    // 4. Always include a catch block for network errors or server offline issues
    console.error("Submission error:", err);
    setError("Unable to connect to the server.");
  }finally {
    setLoading(false); 
  }
};

  return (
    <div className="app-container">
      <main className="main-content">
        <h2>Add Application</h2>

        {error && <p role="alert" className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="add-form">
          
          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name..."
            />
          </div>

          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter job title..."
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location..."
            />
          </div>

          <div className="form-group">
            <label>Date Applied *</label>
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
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
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any extra notes..."
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/applications')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Application"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}