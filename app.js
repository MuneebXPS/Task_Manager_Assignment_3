const express = require('express'); //Import Express for building the application.
const mongoose = require('mongoose'); //Import Mongoose for database interaction.
const dotenv = require('dotenv'); //Import dotenv to manage environment variables.
const bodyParser = require('body-parser'); //Import body-parser for parsing request bodies.
const methodOverride = require('method-override'); //Import method-override for supporting HTTP verbs like PUT and DELETE.
const taskRoutes = require('./routes/tasks'); //Import task routes from the routes folder.

dotenv.config(); //Load environment variables from .env file.
const app = express(); //Initialize Express app.

//Middleware
app.use(bodyParser.urlencoded({ extended: true })); //Parse URL bodies.
app.use(methodOverride('_method')); //method-override for form submissions.
app.use(express.static('public')); //static files from the 'public' directory.
app.set('view engine', 'ejs'); //EJS as the template engine.

//Database connection
mongoose.connect(process.env.MONGO_URI, { //Connect MongoDB using environment variable.
    useNewUrlParser: true, //MongoDB connection string parser.
    useUnifiedTopology: true, //server discovery and monitoring engine.
}).then(() => console.log('MongoDB connected')) //Log success message on successful connection.
  .catch(err => console.log(err)); //Log error if connection fails.

//Routes
app.use('/tasks', taskRoutes); //Use task routes under '/tasks'.

//Start server
const PORT = process.env.PORT || 3000; //Define the server's port.
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); //Start the server and log its URL.

app.get('/', (req, res) => { //Define a route for the home page.
    res.render('index'); //Render the index.ejs file.
});