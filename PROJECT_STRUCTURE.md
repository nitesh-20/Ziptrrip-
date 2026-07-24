# 📂 Project Structure

```text
intern-todo-app/
├── backend/
│   ├── controllers/
│   │   └── todoController.js     # Business logic for API endpoints
│   ├── data/
│   │   └── todos.json            # Flat-file database storage
│   ├── middleware/
│   │   ├── errorHandler.js       # Global JSON error formatter
│   │   └── validator.js          # Request payload validation
│   ├── routes/
│   │   └── todoRoutes.js         # API Route definitions
│   ├── utils/
│   │   └── fileHandler.js        # File I/O operations wrapper
│   └── server.js                 # Express Application Entry Point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Reusable UI elements (Button, Input, Dropdown)
│   │   │   ├── dashboard/        # Dashboard specific metrics (Analytics, FilterBars)
│   │   │   ├── layout/           # Global wrappers (Navbar)
│   │   │   └── todos/            # Domain-specific components (TodoCard, TodoForm)
│   │   ├── hooks/
│   │   │   ├── useDebounce.js    # Custom hook for search optimization
│   │   │   └── useTodos.js       # Custom hook managing API sync state
│   │   ├── pages/
│   │   │   ├── AddTodo.jsx       
│   │   │   ├── AnalyticsPage.jsx 
│   │   │   ├── ArchivedTasks.jsx 
│   │   │   ├── Dashboard.jsx     
│   │   │   ├── EditTodo.jsx      
│   │   │   ├── Tasks.jsx         
│   │   │   └── TodoDetail.jsx    
│   │   ├── services/
│   │   │   └── api.js            # Axios instance with base URL configuration
│   │   ├── utils/
│   │   │   └── dateUtils.js      # Helpers for 'Today', 'Overdue' calculations
│   │   ├── App.jsx               # React Router configuration & Lazy Loading
│   │   ├── index.css             # Tailwind base imports & custom animations
│   │   └── main.jsx              # React DOM mounting
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js            # Vite build tool configuration
└── README.md
```
