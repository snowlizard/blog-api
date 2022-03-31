const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my-blog');
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
    res.send('hello blog');
});


module.exports = app;