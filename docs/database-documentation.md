# Database Documentation

## Table: JobApplications

| Field | Data type | Description |
| :--- | :--- | :--- |
| Id | int | Unique application identifier |
| CompanyName | nvarchar | Name of the company |
| JobTitle | nvarchar | Position applied for |
| Location | nvarchar | Job location |
| DateApplied | date/datetime | Date of application |
| Status | nvarchar | Current application status |
| JobUrl | nvarchar | Link to the job advert |
| Notes | nvarchar | Additional information |

## Primary Key

- **`Id`**: Serves as the primary key for the `JobApplications` table, ensuring that it uniquely identifies each individual job application record.

## Field Requirements

Explain which fields users must complete and which fields are optional[cite: 9].

| Field | Requirement |
| :--- | :--- |
| CompanyName | Required |
| JobTitle | Required |
| DateApplied | Required |
| Status | Required |
| Location | Optional |
| JobUrl | Optional |
| Notes | Optional |

## Application Statuses

List the statuses supported by your application[cite: 10]:

- Applied
- Interview
- Assessment
- Offer
- Rejected
- Withdrawn