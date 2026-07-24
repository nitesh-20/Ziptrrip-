# 🤔 Design Decisions

This document explains the rationale behind major technical and product decisions made during development.

### 1. Why a Flat-File JSON Database?
**Decision**: The backend utilizes `fs.promises` to read/write to `data/todos.json` instead of implementing MongoDB or PostgreSQL.
**Rationale**: The internship assignment strictly required keeping the app scope simple without unnecessary dependencies. Adding a Database Engine requires complex local setup for the reviewer. A JSON file achieves instant zero-config usability for hiring managers pulling the code while still demonstrating competency in async file I/O operations.

### 2. Why Custom UI Components instead of MUI/Chakra?
**Decision**: Checkboxes, Dropdowns, and Layouts are built from scratch using `lucide-react` icons and Tailwind CSS.
**Rationale**: Off-the-shelf component libraries often lead to bloated bundle sizes and generic, identical-looking applications. Building custom UI components from scratch demonstrates a deep understanding of CSS, React state management, and accessibility (`aria` tags, `htmlFor`, refs), which is precisely what hiring managers want to see in a Frontend/Fullstack candidate.

### 3. Why "Soft Delete" (Archiving)?
**Decision**: Clicking delete on a task does not instantly destroy it from the database. It sets an `isArchived` flag.
**Rationale**: Destructive actions create user anxiety. By moving items to an Archive (and providing a Toast notification), we implement a forgiving UX pattern similar to Gmail's "Undo" or Linear's trash system.

### 4. Why `localStorage` for Task Templates?
**Decision**: When users click "Save as Template", the payload is saved to the browser's `localStorage` rather than the backend database.
**Rationale**: Templates are generally user-specific workflow preferences. Modifying the core backend JSON schema to support an entirely new "Templates" table would have overcomplicated the assignment's core "Todo List" scope. Utilizing `localStorage` perfectly balances adding a master-class productivity feature without breaking architectural constraints.

### 5. Why `useDebounce` on Search?
**Decision**: The global search bar does not trigger filtering immediately on every keystroke.
**Rationale**: In a production environment with thousands of tasks, recalculating the DOM and filtering arrays on every keystroke (or firing an API request) causes severe UI thread blocking and lag. Debouncing guarantees the filter runs only after the user pauses typing for 300ms, ensuring a silky-smooth 60fps experience.
