# 📡 API Documentation

The backend is built with Node.js and Express, exposing a clean, RESTful API. Responses are standard JSON.

## Base URL
`http://localhost:5000/api`

---

## Endpoints

### 1. Get All Tasks
- **Route:** `GET /todos`
- **Description:** Retrieves all active (non-deleted) tasks.
- **Response (200 OK):**
```json
[
  {
    "id": "uuid-string",
    "title": "Task Title",
    "description": "...",
    "priority": "High",
    "status": "Pending",
    "category": "Work",
    "isArchived": false,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### 2. Get Single Task
- **Route:** `GET /todos/:id`
- **Description:** Retrieves complete metadata for a single specific task.
- **Response (200 OK):** JSON Object of the task.
- **Response (404 Not Found):** `{"message": "Todo not found"}`

### 3. Create Task
- **Route:** `POST /todos`
- **Body:**
```json
{
  "title": "String (Required)",
  "description": "String (Optional)",
  "priority": "High | Medium | Low",
  "status": "Pending | Completed",
  "category": "String",
  "tags": ["Array", "of", "Strings"]
}
```
- **Response (201 Created):** Returns the newly created task object with auto-generated `id` and `createdAt` timestamps.

### 4. Update Task (Partial)
- **Route:** `PUT /todos/:id`
- **Description:** Updates specific fields of a task. Missing fields in the payload will retain their original values in the database.
- **Body:** Any valid task properties.
- **Response (200 OK):** Returns the updated task object.

### 5. Soft Delete Task
- **Route:** `DELETE /todos/:id`
- **Description:** Marks a task as `isDeleted: true` (different from `isArchived`).
- **Response (200 OK):** `{"message": "Todo moved to trash", "id": "uuid-string"}`

### 6. Bulk Update
- **Route:** `POST /todos/bulk/update`
- **Description:** Efficiently applies an update to multiple tasks simultaneously.
- **Body:**
```json
{
  "ids": ["id-1", "id-2"],
  "updates": {
    "status": "Completed",
    "category": "Work"
  }
}
```
- **Response (200 OK):** `{"message": "Updated 2 tasks"}`

### 7. Bulk Delete
- **Route:** `POST /todos/bulk/delete`
- **Description:** Soft-deletes multiple tasks simultaneously.
- **Body:**
```json
{
  "ids": ["id-1", "id-2"]
}
```
- **Response (200 OK):** `{"message": "Moved 2 tasks to trash"}`

---

## Global Error Handling
If an endpoint is hit that does not exist, the API returns a structured JSON 404 response rather than default Express HTML:
```json
{
  "message": "Route not found - /api/invalid-route",
  "stack": "..."
}
```
