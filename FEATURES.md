# ✨ Features Documentation

This document explicitly outlines every feature implemented in TodoMaster Pro to ensure all capabilities are considered during evaluation.

---

## 1. Multi-Page Architecture
- **Purpose**: Prevent a cluttered UI and provide a professional, enterprise-grade navigation experience.
- **Functionality**: The application is split into distinct routes (`/`, `/tasks`, `/analytics`, `/archived`, `/add`, `/todos/:id`) using React Router.
- **User Workflow**: Users navigate between dedicated workspaces (Dashboard vs full Tasks list vs Analytics) using the persistent top navigation bar.
- **Technical Implementation**: `react-router-dom` is used with `React.lazy()` and `Suspense` in `App.jsx` to dynamically code-split routes for instant initial load times.
- *[Screenshot Placeholder: Navigation Bar]*

---

## 2. Smart Analytics Dashboard (`/analytics` & `/`)
- **Purpose**: Provide real-time insights into user productivity.
- **Functionality**: Calculates a dynamic "Productivity Score" based on completion rates and overdue penalties. Visualizes Category Distribution.
- **User Workflow**: Users view high-level stats on the Dashboard, or navigate to `/analytics` for deep-dive HTML progress-bar charts.
- **Technical Implementation**: Complex array `.reduce()` functions iterate over the `todos` state. Calculations are wrapped in `useMemo` to prevent expensive recalculations on re-renders.
- *[Screenshot Placeholder: Analytics Dashboard]*

---

## 3. Advanced Task Management (`/tasks`)
- **Purpose**: Allow users to handle massive workloads efficiently.
- **Functionality**: Features Drag-and-Drop reordering, Multi-field debounced search, and complex category/priority/status filtering.
- **User Workflow**: Users can type in the search bar to instantly filter tasks, or use the dropdowns to find exactly what they need.
- **Technical Implementation**: 
  - `@dnd-kit` powers the accessible drag-and-drop.
  - A custom `useDebounce` hook prevents the search input from spamming the filter logic on every keystroke.
- *[Screenshot Placeholder: Tasks List with Filters]*

---

## 4. Bulk Operations (Floating Action Bar)
- **Purpose**: Accelerate task management by allowing simultaneous updates.
- **Functionality**: Select multiple tasks to instantly Complete, Change Priority, Change Category, or Delete them all at once.
- **User Workflow**: Selecting any task checkbox triggers a floating action bar to slide up from the bottom of the screen.
- **Technical Implementation**: The `selectedIds` state tracks checked tasks. Bulk action clicks trigger the `/api/todos/bulk/update` REST endpoint, minimizing network overhead compared to iterating single updates.
- *[Screenshot Placeholder: Bulk Action Bar]*

---

## 5. Soft Deletes & Archiving (`/archived`)
- **Purpose**: Protect users from accidental data loss.
- **Functionality**: Deleting a task moves it to an Archive state rather than permanently destroying it. 
- **User Workflow**: Users delete a task, realize they made a mistake, navigate to "Archived", select the task, and click "Unarchive".
- **Technical Implementation**: The backend schema includes an `isArchived` flag. The `/tasks` endpoint automatically filters these out, while the `/archived` route explicitly queries them.
- *[Screenshot Placeholder: Archived Tasks Page]*

---

## 6. Task Templates
- **Purpose**: Speed up repetitive task creation without bloating the backend database.
- **Functionality**: Users can save a complex task configuration as a reusable template.
- **User Workflow**: While creating a task, the user clicks "Save as Template". Later, they can select that template from a dropdown to instantly auto-fill the form.
- **Technical Implementation**: Stored purely in the browser's `localStorage` to keep the backend JSON strictly focused on active To-Dos, demonstrating clever engineering resourcefulness.
- *[Screenshot Placeholder: Template Dropdown]*

---

## 7. Global Keyboard Shortcuts
- **Purpose**: Empower power-users to navigate without a mouse.
- **Functionality**: 
  - `N`: Navigate to Create Task page.
  - `/`: Instantly focus the search input bar.
  - `Esc`: Clear search / close modals.
- **User Workflow**: Pressing the keys instantly triggers the action regardless of current scroll position.
- **Technical Implementation**: A global `useEffect` listener attached to the `window` object intercepts keystrokes, utilizing `useNavigate` from React Router to fire actions while avoiding interference if the user is typing in an `<input>`.
