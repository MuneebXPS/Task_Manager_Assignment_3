const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('tasks/index', { tasks });
});

// Add a new task
router.get('/new', (req, res) => {
    res.render('tasks/new');
});

router.post('/', async (req, res) => {
    await Task.create(req.body);
    res.redirect('/tasks');
});

// Edit task
router.get('/:id/edit', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('tasks/edit', { task });
});

router.put('/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/tasks');
});

// Delete task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
});

module.exports = router;
