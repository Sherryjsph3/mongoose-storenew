//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const dotenv = require('dotenv').config();
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


// const MONGODB_URI = 'mongodb+srv://admin:abc1234@cluster0.z0lhg.mongodb.net/mongoose_store?retryWrites=true&w=majority'
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
});

// Error / success
db.on('error', (error) => console.log(error.message + ' is mongodb not running?'));
db.on('connected', () => console.log('mongodb connected'));
db.on('disconnected', () => console.log('mongodb disconnected'));

//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));