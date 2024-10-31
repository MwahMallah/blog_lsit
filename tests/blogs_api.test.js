const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert');
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog');
const {testBlogs, blogsInDb} = require('./test_helper');

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of testBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

const api = supertest(app)

test.only('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
});

test.only('there are five blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 6)
})

test.only('blogs have id and don\'t have _id', async () => {
    const response = await api.get('/api/blogs')
  
    assert.notStrictEqual(response.body[0].id, undefined)
    assert.strictEqual(response.body[0]._id, undefined)
});

test.only('blogs increased by one, when there is post request', async () => {
    const newBlog = {
        title: "new title",
        author: "new author",
        url: "new url",
        likes: 5,
    };

    const response = await api.post('/api/blogs')
                        .send(newBlog)
                        .expect(201);
    
    const { id, ...savedBlogWithoutId } = response.body;
    assert.strictEqual((await blogsInDb()).length, 7);
    assert.deepStrictEqual(savedBlogWithoutId, newBlog);
});

test.only('blog likes are set to 0, when there is no likes in post request', async () => {
    const newBlog = {
        title: "new title",
        author: "new author",
        url: "new url"
    };

    const response = await api.post('/api/blogs')
                        .send(newBlog)
                        .expect(201);
    
    const savedBlog = response.body;
    assert.strictEqual(savedBlog.likes, 0);
});

test.only('posting blog without url results in response code 400', async () => {
    const newBlog = {
        title: "new title",
        author: "new author",
        likes: 5,
    };

    const response = await api.post('/api/blogs')
                        .send(newBlog)
                        .expect(400);
});

test.only('Blog might be deleted', async () => {
    const blogs = await blogsInDb();
    const blogId = blogs[0].id

    await api.delete(`/api/blogs/${blogId}`)
                        .expect(204);

    assert.strictEqual((await blogsInDb()).length, 5);
});

test.only('Deleting blog with wrong id results in 404', async () => {
    const blogId = '64fa12e3d1b223ad9a8b4567';

    await api.delete(`/api/blogs/${blogId}`)
                        .expect(404);
                        
    assert.strictEqual((await blogsInDb()).length, 6);
});
  
after(async () => {
    await mongoose.connection.close();
})