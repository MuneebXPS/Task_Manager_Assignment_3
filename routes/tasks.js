const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import the Task model

// GET /tasks - Show all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.render('tasks/index', { tasks }); // Render tasks/index.ejs
});

// GET /tasks/new - Show form to create a new task
router.get('/new', (req, res) => {
    res.render('tasks/new'); // Render tasks/new.ejs
});

// POST /tasks - Add a new task
router.post('/', async (req, res) => {
    await Task.create(req.body); // Save task to the database
    res.redirect('/tasks'); // Redirect to the tasks list
});

// GET /tasks/:id/edit - Show form to edit a task
router.get('/:id/edit', async (req, res) => {
    const task = await Task.findById(req.params.id); // Find task by ID
    res.render('tasks/edit', { task }); // Render tasks/edit.ejs
});

// PUT /tasks/:id - Update a task
router.put('/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body); // Update task
    res.redirect('/tasks'); // Redirect to the tasks list
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id); // Delete task by ID
    res.redirect('/tasks'); // Redirect to the tasks list
});

module.exports = router;
