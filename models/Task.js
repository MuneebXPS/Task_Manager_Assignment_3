//models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    status: { type: String, enum: ['To-Do', 'In-Progress', 'Completed'], default: 'To-Do' },
});

module.exports = mongoose.model('Task', taskSchema);
