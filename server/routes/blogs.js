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
        .where('featured').equals(true)
        .then( blogs => {
            res.json(blogs);
        })
        .catch(error => {;
            res.send('No featured blogs')
        })
});

// get a specific blog
router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then( blog => {
            if(blog === null){
                res.status(404).send('no blog found')
            }else{
                res.status(200).json(blog);
            }
        });
});

// create a blog associate to a user
router.post('/', (req, res) => {
    let blog = new Blog({
        title: req.body.title,
        article: req.body.article,
        published: req.body.published,
        featured: req.body.featured,
        author : req.body.author
    });

    blog.save()
        .then( () => {
            res.status(201)
                .json(blog)
        });
});

// update a blog
router.put('/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body)
        .then( () => {
            res.status(204).send('blog has been update');
        })
        .catch( (error) => {
            res.status(404).send('Error updating blog');
        });
});

// delete a blog
router.delete('/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then( () => res.status(200).send('blog deleted successfully'))
        .catch( (error) => {
            res.status(404).send('Error deleting blog');
        });
});

module.exports = router;