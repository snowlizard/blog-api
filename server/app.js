const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://mrjack:${process.env.MONGO_PASS}4@sandbox.wqouu.mongodb.net/blogapi?retryWrites=true&w=majority`);
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
    res.send('hello blog');
});


module.exports = app;