## API Endpoints

| HTTP Method | Endpoint | Description | Expected Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/jobapplications` | Retrieve all job applications | `200 OK` |
| `GET` | `/api/jobapplications/{id}` | Retrieve a specific application by ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/jobapplications` | Create a new job application | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/jobapplications/{id}` | Update an existing application | `204 No Content` / `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/api/jobapplications/{id}` | Delete an application | `204 No Content` / `404 Not Found` |

**HTTP Status Codes**

Explain the HTTP status codes your endpoints return:

| Status code | Meaning |
| :--- | :--- |
| 200 | Request successful |
| 201 | Application created |
| 204 | Application deleted successfully |
| 400 | Invalid request |
| 404 | Application not found |
| 500 | Internal server error |

## API Endpoints

### POST /api/jobapplications
- **Description:** Creates a new job application.
- **Expected Response:** `201 Created` or `400 Bad Request`

**Example Request Body:**

```json
{
  "companyName": "ABC Technologies",
  "jobTitle": "Junior Software Developer",
  "location": "Durban",
  "dateApplied": "2026-11-02",
  "status": "Applied",
  "jobUrl": "[https://example.com/job](https://example.com/job)",
  "notes": "Applied through the company website."
}



