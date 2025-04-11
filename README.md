# 🚀 MentoGain Task – Cleanup Script


This repository provides a **Node.js-based solution** to clean up project-specific or organization-wide data from a MongoDB database across multiple collections:

- `Users`
- `Projects`
- `Tasks`
- `Files`
- `Notifications`

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
    <td><img src="https://github.com/user-attachments/assets/9de2fa4e-91c6-4800-88ed-c58883da4f35
" width="250"/></td>
    <td></td>
  </tr>
</table>


## 🔗 Endpoints Summary

| Endpoint | Method | Description | Input Format | Sample |
|---------|--------|-------------|--------------|--------|
| `/api/delete-project-data` | DELETE | Deletes all data related to a specific `projectId` under an `org_id`. | `{ "org_id": "org789", "projectId": "proj004" }` | ✅ See screenshots below |
| `/api/delete-org-data` | DELETE | Deletes **all data for a given org_id**, across all projects. | `{ "org_id": "org123" }` | ✅ See screenshots below |

---

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

