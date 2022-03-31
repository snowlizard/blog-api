const express = require('express');
const router  = express.Router();
const User    = require('../models/user');

// get all users
router.get('/', (req, res) => {
    User
        .find()
        .then( users => {
            res.status(200).json(users);
        });
});

// get user by id
router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then( (user) => {
            res.send(user);
        })
        .catch( (error) => {
            res.send('User could not be found');
        });
});

// create a user
router.post('/', (req, res) => {
    const user = new User({
        firstName: req.body.fName,
        lastName : req.body.lName,
        email    : req.body.email,
        // need to figure out social later
    });

    user.save()
        .then( () => {
            res.send('user added')
        })
        .catch(error => {
            console.log(error);
            res.send('Error adding user')
        });
});

// update a user
router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then( () => {
            res.send('user has been added')
        })
        .catch( (error) => {
            console.log(error);
            res.send('Error adding user');
        });
});

// remove a user
router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then( () => {
            res.send('user has been removed');
        })
        .catch(error => {
            console.log(error);
            res.send('Error removing user');
        });
});

module.exports = router;