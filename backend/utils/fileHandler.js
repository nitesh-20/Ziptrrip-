const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/todos.json');

const readTodos = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, JSON.stringify([]));
            return [];
        }
        throw new Error('Error reading data file');
    }
};

const writeTodos = async (todos) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
    } catch (error) {
        throw new Error('Error writing to data file');
    }
};

module.exports = {
    readTodos,
    writeTodos
};
