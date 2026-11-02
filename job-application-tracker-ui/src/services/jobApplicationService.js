const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APPLICATIONS_URL = `${API_BASE_URL}/api/JobApplications`;

export async function createApplication(applicationData) {
  const response = await fetch(APPLICATIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Server error: ${response.status}`);
  }

  return response.json();
}

export async function getApplications() {
  const response = await fetch(APPLICATIONS_URL);
  return handleResponse(response);
}

export async function getApplicationById(id) {
  const response = await fetch(`${APPLICATIONS_URL}/${id}`);
  return handleResponse(response);
}

export async function updateApplication(id, application) {
  const response = await fetch(`${APPLICATIONS_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(application),
  });

  return handleResponse(response);
}

export async function deleteApplication(id) {
  const response = await fetch(`${APPLICATIONS_URL}/${id}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
}

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Server error: ${response.status}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}