const express = require('express');
const router = express.Router();
const {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    restoreTodo,
    bulkUpdateTodos,
    bulkDeleteTodos
} = require('../controllers/todoController');

const { validateTodo } = require('../middleware/validator');

router.route('/').get(getTodos).post(validateTodo, createTodo);

// Bulk routes must come before /:id routes so "bulk" isn't treated as an ID
router.route('/bulk/update').post(bulkUpdateTodos);
router.route('/bulk/delete').post(bulkDeleteTodos);

router.route('/:id').get(getTodoById).put(validateTodo, updateTodo).delete(deleteTodo);
router.route('/:id/restore').post(restoreTodo);

module.exports = router;
