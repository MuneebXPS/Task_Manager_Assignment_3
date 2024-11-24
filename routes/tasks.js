const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /tasks - Show all tasks with filtering and sorting
router.get('/', async (req, res) => {
    const filter = {};
    const sort = {};

    // Add filters based on query parameters
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.status) filter.status = req.query.status;

    // Add sorting based on query parameters
    if (req.query.sortBy) {
        sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
    }

    try {
        const tasks = await Task.find(filter).sort(sort);
        res.render('tasks/index', { tasks, query: req.query });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tasks');
    }
});

// GET /tasks/new - Show form to create a new task
router.get('/new', (req, res) => {
    res.render('tasks/new');
});

// POST /tasks - Add a new task
router.post('/', async (req, res) => {
    try {
        await Task.create(req.body);
        res.redirect('/tasks');
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).send('Failed to create task.');
    }
});

// GET /tasks/:id/edit - Show form to edit a task
router.get('/:id/edit', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.render('tasks/edit', { task });
    } catch (err) {
        console.error('Error fetching task for edit:', err);
        res.status(404).send('Task not found.');
    }
});

// PUT /tasks/:id - Update a task
router.put('/:id', async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/tasks');
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).send('Failed to update task.');
    }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/tasks');
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).send('Failed to delete task.');
    }
});

module.exports = router;
