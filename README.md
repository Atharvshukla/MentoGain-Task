# 🚀 MentoGain Task – Cleanup Script
Assignment :-
I  have  to write a Node.js script that deletes data from five MongoDB collections/PostgreSQL tables — User, Projects, Task, Files, and Notification — based on a specific projectId (referred to as jid) and a corresponding org_id. This script will help clean up all related data from the system when a project is deleted.
Multiple documents across different collections are associated with a specific project. These documents also belong to a specific organization, identified by the org_id. When a project is removed, all associated data across different collections must also be removed to ensure data consistency and prevent orphaned records.
org_id: Identifier of the organization.
jid: Identifier of the project (can be treated as projectId).
Node.js script that:
Connects to a  database.
Accepts two inputs: org_id and projectId (jid).
Deletes all records from the five mentioned collections where both org_id and jid match.
## 🧠 My Approach – MentoGain Project Cleanup Script
MentoGain Cleanup Script is a backend utility developed using Node.js, Express.js, and MongoDB to handle structured deletion of project-specific and organization-wide data. This is particularly useful for large SaaS systems or admin-level dashboards where periodic data cleanup or organization offboarding is required.
Centralized Deletion Logic – I created dedicated API routes for:
Deleting all data for a specific project under a given organization (/api/delete-project-data)
Deleting all data for an entire organization across all projects (/api/delete-org-data)
Added Dummy data using seed.js file and properly explained the whole procedure in detail below
---
<h3>📋 Table Schemas</h3>

<table>
  <tr>
    <td><strong>User</strong></td>
    <td><strong>Project</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/63ef60f9-0d7d-443f-94b3-d149458b7011" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/fd2b4d97-6cd7-4714-afaf-4f0a3a6ff9f1" width="250"/></td>
  </tr>
  <tr>
    <td><strong>Task</strong></td>
    <td><strong>File</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/fc51a8c9-751b-4a2c-8603-fa99a8d003e3" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/e030f541-2ecd-49af-baf7-3843009a3f8b" width="250"/></td>
  </tr>
  <tr>
    <td><strong>Notification</strong></td>
    <td></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/93f89ebd-4f69-40e6-9ea9-74f362f74577"
 width="250"/></td>
    <td></td>
  </tr>
</table>


## 🔗 Endpoints Summary

| Endpoint | Method | Description | Input Format | Sample |
|---------|--------|-------------|--------------|--------|
| `/api/delete-project-data` | DELETE | Deletes all data related to a specific `projectId` under an `org_id`. | `{ "org_id": "org789", "projectId": "proj004" }` | ✅ See screenshots below |
| `/api/delete-org-data` | DELETE | Deletes **all data for a given org_id**, across all projects. | `{ "org_id": "org123" }` | ✅ See screenshots below |

---
## Read the NodeScriptPsuedoCode.txt For Better Understanding of api 

## 🧪 Screenshots & Outputs

### 📌 Delete Specific Project Data (`/api/delete-project-data`)
| Step | Screenshot |
|------|------------|
| Input sent: `{ "org_id": "org789", "projectId": "proj004" }` | ![Project Delete](https://github.com/user-attachments/assets/870116c7-460e-4424-a468-5de775dfc74c) |
| Console log confirming data deleted from all collections | ![Console Output](https://github.com/user-attachments/assets/b522b573-1693-423d-9e26-85cff7a2bcb2)
)
) |


---

### 📌 Delete All Data of an Organization (`/api/delete-org-data`)
| Step | Screenshot |
|------|------------|
| Endpoint triggered with input: `{ "org_id": "org123" }` | ![Org Delete](https://github.com/user-attachments/assets/2d75e0fd-dffe-4983-9ad2-2baa3aff0260) |
| Console log confirming data deleted from all collections | ![Console Output](https://github.com/user-attachments/assets/612242ae-c8f4-4b32-95b2-a4dd1383ce44)
---

## 📂 **Project Structure**
```
├── README.md
├── models // schema for all 5 Table
│   ├── File.js
│   ├── Notification.js
│   ├── Project.js
│   ├── Task.js
│   └── User.js
├── package-lock.json
├── package.json
├── routes
│   └── delete.js // made 2 api endpoints
├── seed.js //Adding Dummy data to test api and Script which i have writen
└── server.js //Run's my Server

```
## 🐙💻 Source Control Graph 
![image](https://github.com/user-attachments/assets/3b4ac8a0-f1b0-4549-8222-acbb62bfa220)


