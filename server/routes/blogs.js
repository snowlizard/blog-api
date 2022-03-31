const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// get all blogs
router.get('/', (req, res) => {
    Blog
        .find()
        .then( blogs => {
            res.status(200).json(blogs);
        });
});

// get featured
router.get('/featured', (req, res) => {
    Blog
        .find()
        .where('feature').equals(true)
        .then( blogs => {
            res.json(blogs);
        })
        .catch(error => {
            console.log(error);
            res.send('No featured blogs')
        })
});

// get a specific blog
router.get('/:id', (req, res) => {
    Blog.find(req.params.id)
        .then( blog => {
            res.send(blog);
        })
        .catch(error => {
            console.log(error);
            res.status(404).send('Error: no blog found')
        });
});

// create a blog associate to a user
router.post('/', (req, res) => {
    let blog = new Blog({

    })
    blog.save()
        .then( () => console.log('blog saved'));
});

// update a blog
router.put('/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body)
        .then( () => {
            console.log('blog has been updated');
            res.send('blog has been update');
        })
        .catch( (error) => {
            console.log(error);
            res.status(404).send('Error updating blog');
        });
});

// delete a blog
router.delete('/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then( () => res.send('blog deleted successfully'))
        .catch( (error) => {
            console.log(error);
            res.status(404).send('Error deleting blog');
        });
});

module.exports = router;