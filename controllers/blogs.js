const blogsRouter = require('express').Router();
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
        const blog = await Blog.findById(id);
        if (blog === null) {
            res.status(404).end();
        } else {
            await Blog.findByIdAndDelete(id);
            res.status(204).end();
        }
    } catch(e) {
        next(e);
    }
});

module.exports = blogsRouter;