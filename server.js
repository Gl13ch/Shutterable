//Dependencies
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require('express-session')
const app = express ();
const db = mongoose.connection;
require('dotenv').config()

//Port
const PORT = process.env.PORT || 3003;

//Database
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// )
// app.use(express.json());

//controllers
const storeController = require('./controllers/photos_controller.js')
// const userController = require('./controllers/users_controller.js')
// const sessionsController = require('./controllers/sessions_controller.js')
// app.use('/sessions', sessionsController)
// app.use('/users', userController)
app.use('/photos', storeController)

// Routes
app.get('/', (req, res) => {
    res.redirect('/photos')
})

//Listener
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
