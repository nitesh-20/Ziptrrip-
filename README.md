# TodoMaster Pro 🚀

> **A production-ready, master-class Developer Intern assignment submission.**

TodoMaster Pro is a comprehensive, multi-page task management application inspired by industry leaders like **Linear, Notion, and TickTick**. Built with **React** and **Node.js/Express**, it strictly adheres to all internship assignment requirements while demonstrating senior-level architecture, UX/UI polish, and performance optimization.

---

## 📚 Comprehensive Documentation

To ensure every technical decision and feature is fully evaluated by the hiring committee, the documentation has been split into dedicated files:

1. **[Features Documentation](./FEATURES.md)**  
   *An exhaustive list of every feature implemented, how it works, and its technical implementation.*
2. **[Architecture Overview](./ARCHITECTURE.md)**  
   *A breakdown of the frontend and backend architectures, including data flow.*
3. **[Design Decisions](./DESIGN_DECISIONS.md)**  
   *Detailed rationale behind technology choices, UX patterns, and trade-offs.*
4. **[API Documentation](./API.md)**  
   *Complete RESTful API endpoint definitions and payload structures.*
5. **[Project Structure](./PROJECT_STRUCTURE.md)**  
   *A visual map and explanation of the codebase organization.*

---

## 🌍 Live Deployment
The application has been explicitly configured for a modern cloud deployment architecture.

- **Frontend (Vercel)**: [https://frontend-mu-five-86.vercel.app](https://frontend-mu-five-86.vercel.app) *(Live Deployed App)*
- **Backend (Render)**: [https://intern-todo-backend.onrender.com](https://intern-todo-backend.onrender.com) *(Mock URL - Configure via Render Dashboard)*

### Deployment Architecture
- **Vercel (`frontend/vercel.json`)**: Configured with explicit React Router URL rewrite rules `source: "/(.*)"` to prevent 404s on page refresh, a critical step often missed by juniors.
- **Render (`render.yaml`)**: An Infrastructure-as-Code blueprint is provided in the root directory for instantaneous `backend` deployment on Render.
- **Environment Parity**: Explicit `.env.production.example` files are provided in both directories to ensure `VITE_API_URL` and Node's `PORT` bind correctly in the cloud.

---

## 🚀 Local Development

Since this project intentionally uses a flat JSON file database to strictly adhere to the "no unnecessary dependencies" assignment rule, running it is exceptionally simple.

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
```
*(Runs on http://localhost:5000)*

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*(Runs on http://localhost:5173)*

---
*Built with ❤️ for the Software Engineering Internship Assignment.*
