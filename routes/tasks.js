const express = require('express'); //Import Express framework
const router = express.Router(); //Create a router for task routes
const Task = require('../models/Task'); //Import the task model for database operations

router.get('/', async (req, res) => { //Show all tasks with filtering and sorting
    const filter = {}; //Initialize filter object
    const sort = {}; //Initialize sort object

    //Add filters based on query parameters
    if (req.query.priority) filter.priority = req.query.priority; //Filter by priority
    if (req.query.status) filter.status = req.query.status; //Filter by status
    if (req.query.sortBy) {
        sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1; //Sort by specified field and order
    }
    try {
        const tasks = await Task.find(filter).sort(sort); //Fetch tasks with filtering and sorting
        res.render('tasks/index', { tasks, query: req.query }); //Render tasks list
    } catch (err) {
        console.error(err); //Log error to console
        res.status(500).send('Error fetching tasks'); //Send error response
    }
});
router.get('/new', (req, res) => { //form to create a new task
    res.render('tasks/new'); //Render the new task form
});
router.post('/', async (req, res) => { //Add a new task
    try {
        await Task.create(req.body); //Create a new task with the request data
        res.redirect('/tasks'); //Redirect to tasks list
    } catch (err) {
        console.error('Error creating task:', err); //Log error to console
        res.status(500).send('Failed to create task.'); //Send error response
    }
});
router.get('/:id/edit', async (req, res) => { //Show form to edit a task
    try {
        const task = await Task.findById(req.params.id); //Find task by ID
        res.render('tasks/edit', { task }); //Render the edit form with the task
    } catch (err) {
        console.error('Error fetching task for edit:', err); //Log error to console
        res.status(404).send('Task not found.'); //Send not found response
    }
});
router.put('/:id', async (req, res) => { //Update a task
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body); //Update task by ID
        res.redirect('/tasks'); //Redirect to tasks list
    } catch (err) {
        console.error('Error updating task:', err); //Log error to console
        res.status(500).send('Failed to update task.'); //Send error response
    }
});
router.delete('/:id', async (req, res) => { //Delete a task
    try {
        await Task.findByIdAndDelete(req.params.id); //Delete task by ID
        res.redirect('/tasks'); //Redirect to tasks list
    } catch (err) {
        console.error('Error deleting task:', err); //Log error to console
        res.status(500).send('Failed to delete task.'); //Send error response
    }
});
router.post('/:id/update', async (req, res) => { //Update a specific field dynamically
    const { field, value } = req.body; //Extract field and value from request body
    try {
        const update = {};
        update[field] = value; //Dynamically set the field to be updated
        await Task.findByIdAndUpdate(req.params.id, update); //Update the specific field
        res.status(200).send({ message: 'Task updated successfully' }); //Send success response
    } catch (err) {
        console.error('Error updating task:', err); //Log error to console
        res.status(500).send({ message: 'Failed to update task.' }); //Send error response
    }
});
module.exports = router; //Export the router for use in the main app