# TodoMaster

> A premium, production-grade task management dashboard built for modern engineering teams.

![TodoMaster Banner](/frontend/public/vite.svg)

## 📌 Overview

TodoMaster is a high-performance, full-stack Todo application designed to evaluate production-level engineering skills. It completely ditches the "college assignment" aesthetic in favor of a sleek, minimal, and highly polished SaaS interface inspired by industry leaders like Linear, Vercel, and GitHub. 

It delivers uncompromising UI/UX, robust accessibility (a11y), clean architecture, and a resilient Express backend using local JSON persistence as requested.

## ✨ Features

- **Dashboard Analytics**: Real-time statistics on total tasks, completion rates, and daily throughput.
- **Advanced Filtering**: Instantly search, filter by status or priority, and sort tasks with zero lag.
- **Premium UI Primitives**: Custom built, accessible components (Buttons, Inputs, Selects, Badges) instead of generic HTML elements.
- **Form Validation**: Strict client-side validation using `react-hook-form` and robust server-side validation middleware.
- **Micro-interactions**: Subtle hover states, focus rings, skeleton loaders, and toast notifications.
- **Responsive Excellence**: Pixel-perfect layouts across Mobile, Tablet, and Desktop breakpoints.

## 🏗️ Architecture

The project employs a clear separation of concerns in a monorepo-style structure:

### Frontend (React + Vite + Tailwind CSS)
- **`components/common/`**: Reusable UI primitives encapsulating styling and accessibility.
- **`components/dashboard/`**: Specialized components for the analytics and filter views.
- **`components/todos/`**: Components specific to Todo domain logic (Cards, Forms).
- **`hooks/`**: Custom React hooks (e.g., `useTodos`) to separate data fetching from presentation logic.
- **`services/`**: Centralized API clients using Axios.

### Backend (Node.js + Express)
- **`controllers/`**: Pure business logic for CRUD operations.
- **`middleware/`**: Request validation, error handling, and CORS.
- **`routes/`**: API endpoint definitions.
- **`utils/`**: Shared constants and File I/O handlers.

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/nitesh-20/Ziptrrip-.git
cd Ziptrrip-
```

### 2. Start the Backend Server
```bash
cd backend
npm install
npm run dev
```
*The backend runs on `http://localhost:8080` by default to avoid macOS Control Center port conflicts (5000/5001).*

### 3. Start the Frontend Application
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The frontend runs on `http://localhost:5173`.*

## 📖 API Documentation

The backend provides a complete RESTful API mounted at `/api/todos`.

| Method | Endpoint | Description | Body Params |
|--------|---------|-------------|-------------|
| GET | `/api/todos` | Retrieve all tasks | - |
| GET | `/api/todos/:id` | Retrieve a specific task | - |
| POST | `/api/todos` | Create a new task | `title` (req), `description`, `priority`, `status`, `dueDate` |
| PUT | `/api/todos/:id` | Update an existing task | `title` (req), `description`, `priority`, `status`, `dueDate` |
| DELETE | `/api/todos/:id` | Delete a task | - |

## 🎨 Design Decisions

- **Color Palette**: Shifted from default bright Tailwind colors to a sophisticated Zinc/Slate palette to emulate a professional SaaS environment.
- **Typography**: Integrated Google's `Inter` font for optimal legibility and a modern aesthetic.
- **Accessibility**: Implemented custom `focus-visible` rings and ARIA attributes for seamless keyboard navigation.
- **Performance**: Extracted complex state derivations into `useMemo` hooks and segregated API calls into custom hooks to prevent unnecessary re-renders on the main dashboard.

## 🔮 Future Improvements

While this submission meets all assignment requirements, future production phases could include:
1. **Database Integration**: Migrating from JSON persistence to PostgreSQL using Prisma ORM.
2. **Authentication**: Implementing Clerk or NextAuth for secure user sessions.
3. **Drag & Drop**: Adding Kanban board capabilities (e.g., using `dnd-kit`).
4. **Testing**: Comprehensive unit tests using Vitest and E2E tests using Playwright.
