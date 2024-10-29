const express = require('express');
const blogsRouter = express.Router();

blogsRouter.get("/", (req, res) => {
    res.send("Hello world");
});

module.exports = blogsRouter;