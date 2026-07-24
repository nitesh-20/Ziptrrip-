const { v4: uuidv4 } = require('uuid');
const { readTodos, writeTodos } = require('../utils/fileHandler');

// @desc    Get all todos
// @route   GET /api/todos
const getTodos = async (req, res, next) => {
    try {
        const todos = await readTodos();
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
const getTodoById = async (req, res, next) => {
    try {
        const todos = await readTodos();
        const todo = todos.find((t) => t.id === req.params.id);

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
        const { title, description, priority, status, dueDate } = req.body;

        const todos = await readTodos();
        
        const newTodo = {
            id: uuidv4(),
            title: title.trim(),
            description: description ? description.trim() : '',
            priority: priority || 'Medium',
            status: status || 'Pending',
            dueDate: dueDate || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
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
        const { title, description, priority, status, dueDate } = req.body;
        const todos = await readTodos();
        
        const todoIndex = todos.findIndex((t) => t.id === req.params.id);

        if (todoIndex === -1) {
            res.status(404);
            throw new Error('Todo not found');
        }

        const updatedTodo = {
            ...todos[todoIndex],
            title: title.trim(),
            description: description !== undefined ? description.trim() : todos[todoIndex].description,
            priority: priority || todos[todoIndex].priority,
            status: status || todos[todoIndex].status,
            dueDate: dueDate !== undefined ? dueDate : todos[todoIndex].dueDate,
            updatedAt: new Date().toISOString()
        };

        todos[todoIndex] = updatedTodo;
        await writeTodos(todos);

        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
const deleteTodo = async (req, res, next) => {
    try {
        const todos = await readTodos();
        const todoIndex = todos.findIndex((t) => t.id === req.params.id);

        if (todoIndex === -1) {
            res.status(404);
            throw new Error('Todo not found');
        }

        todos.splice(todoIndex, 1);
        await writeTodos(todos);

        res.status(200).json({ message: 'Todo removed', id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};
