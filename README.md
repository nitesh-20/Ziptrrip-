# TodoMaster - Developer Intern Assignment

A production-quality Todo List application built as a submission for a Developer Intern assignment. The project features a modern, clean, and responsive user interface with a robust and modular backend architecture.

## 🚀 Features

### Frontend (React)
- **Multi-Page Application:** Implemented using React Router for proper navigation.
- **Dashboard:** View all todos as modern cards with vital statistics (Total, Completed, Pending, Progress).
- **Search & Filters:** Real-time search by title, filter by status and priority, and sorting capabilities.
- **CRUD Operations:** Complete flow for Adding, Editing, Viewing Details, and Deleting todos.
- **Form Validation:** Robust validation using React Hook Form.
- **Modern UI:** Built with TailwindCSS emphasizing clean spacing, soft shadows, and subtle micro-animations.
- **Notifications:** Toast notifications for success and error states.
- **Responsive Design:** Optimized for Desktop, Tablet, and Mobile devices.

### Backend (Node.js + Express)
- **RESTful APIs:** Complete CRUD endpoints with proper HTTP status codes.
- **File Storage:** Data persists in a local JSON file (`data/todos.json`).
- **Clean Architecture:** Modular structure separating routes, controllers, utilities, and middleware.
- **Centralized Error Handling:** Global error handling middleware for consistent API responses.
- **UUID Generation:** Unique identifiers for each todo.
- **Timestamps:** Automatic generation of `createdAt` and `updatedAt`.

## 📁 Architecture & Folder Structure

```
intern-todo-app/
├── backend/
│   ├── controllers/      # Route logic and request handling
│   │   └── todoController.js
│   ├── routes/           # API route definitions
│   │   └── todoRoutes.js
│   ├── middleware/       # Custom middleware (e.g., error handler)
│   │   └── errorHandler.js
│   ├── data/             # JSON data storage
│   │   └── todos.json
│   ├── utils/            # Helper functions (e.g., file operations)
│   │   └── fileHandler.js
│   └── server.js         # Entry point for the Express app
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   │   ├── common/   # Badge, Modal, Spinner
    │   │   ├── layout/   # Layout wrapper, Navbar
    │   │   └── todos/    # TodoCard, TodoForm
    │   ├── pages/        # Route components (Home, AddTodo, etc.)
    │   ├── services/     # API integration (Axios)
    │   ├── utils/        # Date formatting and helpers
    │   ├── App.jsx       # Router configuration
    │   └── main.jsx      # React entry point
    └── tailwind.config.js
```

## 🛠️ Tech Stack

**Frontend:**
- React (via Vite)
- React Router (Routing)
- TailwindCSS (Styling)
- Axios (HTTP Client)
- React Hook Form (Forms & Validation)
- React Hot Toast (Notifications)
- Lucide React (Icons)

**Backend:**
- Node.js
- Express
- CORS
- UUID

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone or Download the Repository
Navigate to the root directory `intern-todo-app`.

### 2. Running the Backend
```bash
cd backend
npm install
npm run dev
```
The backend server will start on `http://localhost:5000`.

### 3. Running the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend application will start typically on `http://localhost:5173`.

## 📖 API Documentation

| Method | Endpoint         | Description          | Body required                                |
|--------|------------------|----------------------|----------------------------------------------|
| GET    | `/api/todos`     | Fetch all todos      | None                                         |
| GET    | `/api/todos/:id` | Fetch a single todo  | None                                         |
| POST   | `/api/todos`     | Create a new todo    | `title`, `description`, `priority`, `status`, `dueDate` |
| PUT    | `/api/todos/:id` | Update a todo        | `title`, `description`, `priority`, `status`, `dueDate` |
| DELETE | `/api/todos/:id` | Delete a todo        | None                                         |

## 🔮 Future Improvements
While this project focuses on the core assignment requirements, future iterations could include:
- Unit and Integration Testing (Jest, React Testing Library)
- Pagination for the Todo list
- Authentication (OAuth/JWT)
- Migration to a proper Database (PostgreSQL or MongoDB)
- Dark Mode support
- Drag and Drop reordering

---
*Built with ❤️ focusing on clean code, strong architecture, and excellent user experience.*
