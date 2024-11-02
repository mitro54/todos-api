const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// 'database'
let todos = [
    { id: 1, title: 'Do laundry', completed: false },
    { id: 2, title: 'Get a job in IT', completed: false },
    { id: 3, title: 'Finish the API', completed: true }
];

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a todo by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Create a new todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
        todo.title = req.body.title !== undefined ? req.body.title : todo.title;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1);
        res.json(deletedTodo[0]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
