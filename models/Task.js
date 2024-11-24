//models/Task.js
const mongoose = require('mongoose'); //Import the mongoose library to interact with MongoDB.
const taskSchema = new mongoose.Schema({ //Define a new schema for the Task model using mongoose.
    title: { type: String, required: true }, //Define a "title" field that is a string and is required.
    description: String, //Define an optional "description" field that is a string.
    dueDate: Date, //Define an optional "dueDate" field that is a date.
    priority: { 
        type: String, //Define a "priority" field that is a string.
        enum: ['Low', 'Medium', 'High'], //Restrict the values to 'Low', 'Medium', or 'High'.
        default: 'Low' //Set the default value of "priority" to 'Low' if none is provided.
    },
    status: { 
        type: String, //Define a "status" field that is a string.
        enum: ['To-Do', 'In-Progress', 'Completed'], //Restrict the values to 'To-Do', 'In-Progress', or 'Completed'.
        default: 'To-Do' //Set the default value of "status" to 'To-Do' if none is provided.
    },
});
module.exports = mongoose.model('Task', taskSchema); //Export the "Task" model based on the taskSchema to use it elsewhere in the app.