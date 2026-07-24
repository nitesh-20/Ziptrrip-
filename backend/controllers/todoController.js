const { v4: uuidv4 } = require('uuid');
const { readTodos, writeTodos } = require('../utils/fileHandler');

// @desc    Get all todos (active only)
// @route   GET /api/todos
const getTodos = async (req, res, next) => {
    try {
        const todos = await readTodos();
        const activeTodos = todos.filter(t => !t.isDeleted);
        res.status(200).json(activeTodos);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
const getTodoById = async (req, res, next) => {
    try {
        const todos = await readTodos();
        const todo = todos.find((t) => t.id === req.params.id && !t.isDeleted);

        if (!todo) {
            res.status(404);
            throw new Error('Todo not found');
        }

        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a todo
// @route   POST /api/todos
const createTodo = async (req, res, next) => {
    try {
        const { title, description, priority, status, dueDate, category, tags, estimatedTime, isPinned, isFavorite, isArchived } = req.body;

        const todos = await readTodos();
        
        const newTodo = {
            id: uuidv4(),
            title: title.trim(),
            description: description ? description.trim() : '',
            priority: priority || 'Medium',
            status: status || 'Pending',
            category: category || 'Others',
            tags: Array.isArray(tags) ? tags : [],
            estimatedTime: estimatedTime || '',
            dueDate: dueDate || null,
            
            isPinned: !!isPinned,
            isFavorite: !!isFavorite,
            isArchived: !!isArchived,
            isDeleted: false,
            order: todos.length, // simple ordering
            
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completedAt: status === 'Completed' ? new Date().toISOString() : null,
            deletedAt: null
        };

        todos.push(newTodo);
        await writeTodos(todos);

        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
const updateTodo = async (req, res, next) => {
    try {
        const { title, description, priority, status, dueDate, category, tags, estimatedTime, isPinned, isFavorite, isArchived, order } = req.body;
        const todos = await readTodos();
        
        const todoIndex = todos.findIndex((t) => t.id === req.params.id && !t.isDeleted);

        if (todoIndex === -1) {
            res.status(404);
            throw new Error('Todo not found');
        }

        const oldTodo = todos[todoIndex];
        
        let completedAt = oldTodo.completedAt;
        if (status === 'Completed' && oldTodo.status !== 'Completed') {
            completedAt = new Date().toISOString();
        } else if (status !== 'Completed') {
            completedAt = null;
        }

        const updatedTodo = {
            ...oldTodo,
            title: title !== undefined ? title.trim() : oldTodo.title,
            description: description !== undefined ? description.trim() : oldTodo.description,
            priority: priority || oldTodo.priority,
            status: status || oldTodo.status,
            category: category || oldTodo.category,
            tags: tags !== undefined ? tags : oldTodo.tags,
            estimatedTime: estimatedTime !== undefined ? estimatedTime : oldTodo.estimatedTime,
            dueDate: dueDate !== undefined ? dueDate : oldTodo.dueDate,
            
            isPinned: isPinned !== undefined ? isPinned : oldTodo.isPinned,
            isFavorite: isFavorite !== undefined ? isFavorite : oldTodo.isFavorite,
            isArchived: isArchived !== undefined ? isArchived : oldTodo.isArchived,
            order: order !== undefined ? order : oldTodo.order,
            
            updatedAt: new Date().toISOString(),
            completedAt
        };

        todos[todoIndex] = updatedTodo;
        await writeTodos(todos);

        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

// @desc    Soft Delete a todo
// @route   DELETE /api/todos/:id
const deleteTodo = async (req, res, next) => {
    try {
        const todos = await readTodos();
        const todoIndex = todos.findIndex((t) => t.id === req.params.id && !t.isDeleted);

        if (todoIndex === -1) {
            res.status(404);
            throw new Error('Todo not found');
        }

        todos[todoIndex] = {
            ...todos[todoIndex],
            isDeleted: true,
            deletedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        await writeTodos(todos);

        res.status(200).json({ message: 'Todo moved to trash', id: req.params.id });
    } catch (error) {
        next(error);
    }
};

// @desc    Restore a soft-deleted todo
// @route   POST /api/todos/:id/restore
const restoreTodo = async (req, res, next) => {
    try {
        const todos = await readTodos();
        const todoIndex = todos.findIndex((t) => t.id === req.params.id && t.isDeleted);

        if (todoIndex === -1) {
            res.status(404);
            throw new Error('Todo not found or not in trash');
        }

        todos[todoIndex] = {
            ...todos[todoIndex],
            isDeleted: false,
            deletedAt: null,
            updatedAt: new Date().toISOString()
        };

        await writeTodos(todos);

        res.status(200).json(todos[todoIndex]);
    } catch (error) {
        next(error);
    }
};

// @desc    Bulk update todos
// @route   POST /api/todos/bulk/update
const bulkUpdateTodos = async (req, res, next) => {
    try {
        const { ids, updates } = req.body; // updates can contain { status, priority, etc }
        
        if (!Array.isArray(ids) || ids.length === 0) {
            res.status(400);
            throw new Error('Must provide array of ids');
        }

        const todos = await readTodos();
        let updatedCount = 0;

        for (let i = 0; i < todos.length; i++) {
            if (ids.includes(todos[i].id) && !todos[i].isDeleted) {
                // Apply updates
                let completedAt = todos[i].completedAt;
                if (updates.status === 'Completed' && todos[i].status !== 'Completed') {
                    completedAt = new Date().toISOString();
                } else if (updates.status && updates.status !== 'Completed') {
                    completedAt = null;
                }

                todos[i] = {
                    ...todos[i],
                    ...updates,
                    completedAt,
                    updatedAt: new Date().toISOString()
                };
                updatedCount++;
            }
        }

        await writeTodos(todos);
        res.status(200).json({ message: `Updated ${updatedCount} tasks` });
    } catch (error) {
        next(error);
    }
};

// @desc    Bulk delete todos
// @route   POST /api/todos/bulk/delete
const bulkDeleteTodos = async (req, res, next) => {
    try {
        const { ids } = req.body;
        
        if (!Array.isArray(ids) || ids.length === 0) {
            res.status(400);
            throw new Error('Must provide array of ids');
        }

        const todos = await readTodos();
        let deletedCount = 0;

        for (let i = 0; i < todos.length; i++) {
            if (ids.includes(todos[i].id) && !todos[i].isDeleted) {
                todos[i] = {
                    ...todos[i],
                    isDeleted: true,
                    deletedAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                deletedCount++;
            }
        }

        await writeTodos(todos);
        res.status(200).json({ message: `Moved ${deletedCount} tasks to trash` });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    restoreTodo,
    bulkUpdateTodos,
    bulkDeleteTodos
};
