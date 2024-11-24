const mongoose = require('mongoose'); //Import the mongoose library to interact with MongoDB.
const taskSchema = new mongoose.Schema({ //Define a new schema for the Task model using mongoose.
    title: { type: String, required: true }, //Define a "title" field that is a string and is required.
    description: String, 
    dueDate: Date,
    priority: { 
        type: String,
        enum: ['Low', 'Medium', 'High'], //Restrict the values to 'Low', 'Medium', or 'High'.
        default: 'Low' //Set the default value of to Low if none is provided.
    },
    status: { 
        type: String,
        enum: ['To-Do', 'In-Progress', 'Completed'], //Restrict the values to 'To-Do', 'In-Progress', or 'Completed'.
        default: 'To-Do' //Set the default value of to 'To-Do' if none is provided.
    },
});
module.exports = mongoose.model('Task', taskSchema); //Export the "Task" model based on the taskSchema