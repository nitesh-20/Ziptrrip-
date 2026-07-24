# TodoMaster Pro 🚀

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)](https://todo-master-app-woad.vercel.app/)
[![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?logo=render&logoColor=white)](https://ziptrrip.onrender.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **A production-ready, enterprise-grade multi-page Todo Management Application built as a Developer Internship Assignment.**

**TodoMaster Pro** is designed and engineered following the product mechanics, UX polish, and architectural patterns of modern productivity apps like **Linear**, **Notion**, and **Microsoft To Do**. Built with React 19, Express 5, and Tailwind CSS, it offers a multi-page dashboard, complete task lifecycle management, analytical metrics, search/filtering, and responsive UI design.

---

## 🌐 Live Demo & Deployment

| Resource | Link |
| :--- | :--- |
| **🚀 Live Web Application** | [https://todo-master-app-woad.vercel.app/](https://todo-master-app-woad.vercel.app/) |
| **⚡ Production REST API** | [https://ziptrrip.onrender.com/](https://ziptrrip.onrender.com/) |
| **📦 GitHub Repository** | [https://github.com/nitesh-20/Ziptrrip-](https://github.com/nitesh-20/Ziptrrip-) |

---

## ✅ Assignment Requirements Checklist

- [x] **Multi-Page React Application**: Built with React Router v7 (`/`, `/tasks`, `/analytics`, `/archived`, `/todos/create`, `/todos/:id`, `/todos/:id/edit`).
- [x] **Full CRUD Operations**: Create, Read, Update, and Delete tasks seamlessly connected via REST API.
- [x] **Dedicated Todo Details Page**: Complete view showcasing metadata, timestamps, priority badges, category tags, and action controls.
- [x] **Node.js & Express Backend**: Lightweight REST API built with Express 5 featuring robust request validation and error middleware.
- [x] **REST API Standards**: Proper HTTP status codes, structured JSON payloads, and clean error handling.
- [x] **GitHub Version Control**: Well-structured commits and clear repository history.
- [x] **Comprehensive Markdown Documentation**: Includes `README.md`, `FEATURES.md`, `API.md`, `ARCHITECTURE.md`, `PROJECT_STRUCTURE.md`, and `DESIGN_DECISIONS.md`.
- [x] **Production Cloud Deployment**: Frontend live on Vercel, Backend live on Render.

---

## 🚀 Key Features

### 📊 Dashboard
- Overview stats (Total, Completed, Pending, Overdue tasks).
- Quick action cards and shortcut entry points.
- Recent 5 tasks section for quick status updates.

### 📝 Task Management
- Full task lifecycle: Create, Edit, View, Complete, Archive, and Delete.
- Task completion directly from cards with smooth visual feedback.
- Bulk actions bar for multi-task operations.

### 🔍 Search & Filtering
- Real-time instant search with debounced typing (`useDebounce`).
- Filtering by Status (*All, Active, Completed, Archived*), Priority (*High, Medium, Low*), and Category.
- Sorting options by Due Date, Priority, and Creation Date.

### 🏷️ Categories & Tags
- Categorize tasks by Work, Personal, Shopping, Health, and custom labels.
- Color-coded badges for instant visual identification.

### ⚡ Priority Management
- Visual priority indicators: **High** (Red), **Medium** (Amber), **Low** (Blue).
- Sort tasks by priority urgency.

### 📌 Pin & Favorite
- Pin important tasks to keep them anchored at the top of lists.
- Star/Favorite critical items for fast filtering.

### 📦 Archive & Restore
- Soft-delete workflow to archive completed or inactive tasks.
- Dedicated `/archived` page to manage, restore, or permanently delete archived items.

### 📈 Analytics & Statistics
- Visual completion rate charts and productivity score metrics.
- Distribution breakdowns by category and priority.
- Weekly overview metrics.

### 📱 Responsive Design
- Optimized layout across mobile, tablet, and desktop viewports.
- Touch-friendly controls and responsive navigation bar.

### ♿ Accessibility & UX Polish
- Skeleton screen loading states during data fetching.
- Custom accessible controls (`Input`, `Select`, `Checkbox`) with explicit labels and `aria` attributes.
- Keyboard navigation support (`N` for New Task, `/` for Search, `Esc` for Modals).

### 🛡️ Robust Error Handling
- Graceful empty states for zero-result searches and empty categories.
- Toast notifications for API errors and action confirmations via `react-hot-toast`.
- Dedicated 404 page for invalid client routes.

---

## 🖼️ Application Screenshots

<details>
<summary><b>Click to expand screenshots</b></summary>

| View | Screenshot Placeholder |
| :--- | :--- |
| **Dashboard** | ![Dashboard Screenshot](https://via.placeholder.com/800x450?text=Dashboard+Overview+View) |
| **Task List** | ![Task List Screenshot](https://via.placeholder.com/800x450?text=Task+Management+Page) |
| **Create Task** | ![Create Task Screenshot](https://via.placeholder.com/800x450?text=Create+Task+Form) |
| **Task Details** | ![Task Details Screenshot](https://via.placeholder.com/800x450?text=Task+Details+View) |
| **Analytics** | ![Analytics Screenshot](https://via.placeholder.com/800x450?text=Analytics+Metrics+Dashboard) |
| **Archive** | ![Archive Screenshot](https://via.placeholder.com/800x450?text=Archived+Tasks+Management) |
| **Mobile View** | ![Mobile View Screenshot](https://via.placeholder.com/400x700?text=Mobile+Responsive+View) |

</details>

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Core** | React 19 | UI Component Library |
| **Build Tool** | Vite 6 | Fast HMR & Bundling |
| **Routing** | React Router v7 | Multi-page Client Routing |
| **Styling** | Tailwind CSS 3 | Utility-first Design System |
| **Icons** | Lucide React | Modern Icon Suite |
| **Notifications** | React Hot Toast | Lightweight Toast Alerts |
| **Backend Core** | Node.js 22 | JavaScript Runtime |
| **Server Framework** | Express 5 | RESTful API Engine |
| **Data Persistence** | JSON File Store | Lightweight `fs.promises` Database |
| **Hosting** | Vercel & Render | Frontend (Vercel) & Backend (Render) Cloud Infrastructure |

---

## 📂 Project Structure

```
intern-todo-app/
├── backend/
│   ├── data/
│   │   └── todos.json          # Persistent JSON storage
│   ├── middleware/
│   │   ├── errorHandler.js     # Centralized error handler
│   │   └── validator.js        # Request payload validation
│   ├── routes/
│   │   └── todoRoutes.js       # REST API endpoints
│   ├── .env.production.example
│   ├── package.json
│   └── server.js               # Express application entry
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI controls & cards
│   │   ├── hooks/              # Custom hooks (useTodos, useDebounce)
│   │   ├── pages/              # Dashboard, Tasks, Analytics, Archive, Details
│   │   ├── services/           # Axios API client layer
│   │   ├── utils/              # Helper utilities
│   │   ├── App.jsx             # Routes & layout provider
│   │   └── main.jsx
│   ├── vercel.json             # Vercel URL rewrite rules
│   ├── .env.production
│   ├── package.json
│   └── vite.config.js
│
├── render.yaml                 # Render Infrastructure-as-Code Blueprint
├── README.md                   # Main Project Overview
├── FEATURES.md                 # Deep-dive Feature Documentation
├── API.md                      # Complete API Specification
├── ARCHITECTURE.md             # System Architecture & Flowcharts
├── PROJECT_STRUCTURE.md        # Comprehensive File Tree Guide
└── DESIGN_DECISIONS.md         # Technical Rationale & Trade-offs
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js `v18.x` or higher
- npm `v9.x` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/nitesh-20/Ziptrrip-.git
cd Ziptrrip-
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```
*Backend runs locally on `http://localhost:8080`*

### 3. Setup Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs locally on `http://localhost:5173`*

### Environment Variables

#### Frontend (`frontend/.env.production`)
```env
VITE_API_URL=https://ziptrrip.onrender.com/api
```

#### Backend (`backend/.env.production`)
```env
PORT=10000
NODE_ENV=production
```

---

## 🔌 API Overview

The backend exposes a REST API under `/api/todos`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/todos` | Fetch all tasks |
| `GET` | `/api/todos/:id` | Fetch single task by ID |
| `POST` | `/api/todos` | Create a new task |
| `PUT` | `/api/todos/:id` | Update an existing task |
| `DELETE` | `/api/todos/:id` | Delete a task |

*For complete request payloads, parameters, and error responses, see [API.md](./API.md).*

---

## 📖 Extended Documentation

To evaluate specific technical aspects of this submission, refer to the individual documentation files:

1. 📋 **[FEATURES.md](./FEATURES.md)** — Detailed breakdowns of all product features, workflows, and technical details.
2. 🔌 **[API.md](./API.md)** — Comprehensive REST API documentation including payload schemas and response codes.
3. 🏗️ **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System architecture diagrams, component breakdown, and data flow.
4. 📁 **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** — Full codebase directory map and file responsibilities.
5. 🧠 **[DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md)** — Engineering rationale behind technology selections and UX choices.

---

## ☁️ Deployment

### Frontend (Vercel)
- Configured with `frontend/vercel.json` rewrite rules (`source: "/(.*)" -> "/index.html"`) to handle client-side routing and prevent 404 errors on page refresh.
- Built using Vite production optimization bundle.

### Backend (Render)
- Configured using `render.yaml` Infrastructure-as-Code blueprint.
- Runs as an Express web service with CORS enabled for the Vercel frontend.

---

## 🧠 Key Design Decisions

- **File System Persistence**: Used a structured JSON file database (`fs.promises`) to fulfill the assignment requirement for file/database storage without introducing complex external database setup steps for reviewers.
- **Debounced Search**: Implemented a custom `useDebounce` hook to minimize unnecessary UI re-renders and filter calculations during user typing.
- **Custom UI Components**: Built clean, accessible controls (`Input`, `Select`, `Dropdown`, `Checkbox`) directly using Tailwind CSS to maintain lightweight bundle sizes instead of heavy external UI libraries.

*For full engineering trade-off analysis, see [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md).*

---

## 🎯 Performance & Best Practices

- **Code Splitting**: Routes are dynamic imports using `React.lazy` and `Suspense` for fast initial page load times.
- **Memoized Calculations**: Heavy filter and statistic calculations are wrapped in `useMemo`.
- **Clean Architecture**: Separation of concerns between API service layer, React custom hooks, and presentational UI components.
- **Robust Validation**: Server-side payload validation middleware ensures dirty or incomplete data is rejected before writing to storage.

---

## 🔮 Future Improvements

While the application is complete and fully satisfies the assignment scope, future production enhancements could include:
- 🔒 **User Authentication**: JWT-based auth with user account isolation.
- 🗄️ **Database Migration**: Upgrading from JSON file storage to PostgreSQL/MongoDB with Prisma ORM.
- 🌙 **Dark Mode**: Native dark theme switcher using Tailwind dark mode classes.
- 🖐️ **Drag & Drop Reordering**: KanBan style drag-and-drop task ordering.
- 🔔 **Notifications**: Browser push notifications for upcoming task deadlines.
- 🔄 **Real-Time Sync**: WebSockets (Socket.io) for multi-device real-time updates.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Nitesh Kumar Sahu**  
*Senior Product Engineer Mindset | Full-Stack Developer*

- 🌐 **Portfolio**: [nitesh-portfolio-88n1.vercel.app](https://nitesh-portfolio-88n1.vercel.app/)
- 💻 **GitHub**: [@nitesh-20](https://github.com/nitesh-20)
- 💼 **LinkedIn**: [Nitesh Kumar Sahu](https://www.linkedin.com/in/niteshsahu20/)

---
*Built with precision and care for the Software Engineering Internship Assignment.*
