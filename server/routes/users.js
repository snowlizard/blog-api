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
        .then( user => {
            if(user === null)
                res.status(404).send('no user found');
            else
                res.status(200).json(user)
        })
});

// create a user
router.post('/', (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email    : req.body.email,
        social   :  req.body.social,
        blogs    : []
    });

    user.save()
        .then( () => {
            res.status(201).json(user);
        });
});

// update a user
router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then( () => {
            res.status(204).send('user has been added')
        })
        .catch( (error) => {
            res.status(404).send('Error adding user');
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
            res.status(404).send('Error removing user');
        });
});

module.exports = router;