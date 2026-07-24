const express = require('express');
const router = express.Router();
const {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');

const { validateTodo } = require('../middleware/validator');

router.route('/').get(getTodos).post(validateTodo, createTodo);
router.route('/:id').get(getTodoById).put(validateTodo, updateTodo).delete(deleteTodo);

module.exports = router;
