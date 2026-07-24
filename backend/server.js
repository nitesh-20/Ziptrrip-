const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos', require('./routes/todoRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
