const blogsRouter = require('express').Router();
const logger = require('../utils/logger');
const Blog = require('../models/blog');

blogsRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)
    try {
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch(e) {
        next(e)
    }
});

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await Blog.findByIdAndDelete(id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch(e) {
        next(e);
    }
});

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updated = await Blog.findByIdAndUpdate(id, req.body, {new: true});

        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).end();
        }
    } catch(e) {
        next(e);
    }
});

module.exports = blogsRouter;