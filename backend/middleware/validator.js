const { PRIORITIES, STATUSES } = require('../utils/constants');

const validateTodo = (req, res, next) => {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        res.status(400);
        return next(new Error('Title is required and must be a valid string'));
    }

    if (title.length > 100) {
        res.status(400);
        return next(new Error('Title cannot exceed 100 characters'));
    }

    if (description && description.length > 500) {
        res.status(400);
        return next(new Error('Description cannot exceed 500 characters'));
    }

    if (priority && !PRIORITIES.includes(priority)) {
        res.status(400);
        return next(new Error(`Priority must be one of: ${PRIORITIES.join(', ')}`));
    }

    if (status && !STATUSES.includes(status)) {
        res.status(400);
        return next(new Error(`Status must be one of: ${STATUSES.join(', ')}`));
    }

    if (dueDate) {
        const parsedDate = new Date(dueDate);
        if (isNaN(parsedDate.getTime())) {
            res.status(400);
            return next(new Error('Due date must be a valid date string'));
        }
    }

    next();
};

module.exports = {
    validateTodo
};
