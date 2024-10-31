const {test, describe} = require('node:test');
const assert = require('node:assert');

const {dummy, totalLikes, favoriteBlog, mostBlogs} = require('../utils/list_helper');

const testBlogs = [
    {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
    },
    {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
    },
    {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
    },
    {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
    },
    {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
    },
    {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
    }  
]

describe('dummy', () => {
    test('dummy returns 1', () => {
            const blogs = testBlogs;
            const result = dummy([]);

            assert.strictEqual(result, 1);
        })
    });

describe('total likes', () => {
    const listWithOneBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
        }
    ];

    test('when list has only one blog, equals the likes of that', () => {
        assert.strictEqual(5, totalLikes(listWithOneBlog));
    });

    test('when list has many blogs, equals the likes of sum of them', () => {
        assert.strictEqual(36, totalLikes(testBlogs));
    });

    test('when list doesn\'t have blogs, equals 0', () => {
        assert.strictEqual(0, totalLikes([]));
    });

});

describe('favorite blog', () => {
    const listWithOneBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
        }
    ];

    test('when list has only one blog, equals to this blog', () => {
        assert.deepStrictEqual({
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 5
            }, favoriteBlog(listWithOneBlog));
    });

    test('when list has many blogs, equals to blog with most likes', () => {
        assert.deepStrictEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }, favoriteBlog(testBlogs));
    });

    test('when list doesn\'t have blogs, equals {}', () => {
        assert.deepStrictEqual({}, favoriteBlog([]));
    });

});

describe('Most Blogs', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ];

    test('when list has only one blog, equals to author with 1 blog', () => {
        assert.deepStrictEqual({
                author: 'Edsger W. Dijkstra',
                blogs: 1,
            }, mostBlogs(listWithOneBlog));
    });

    test('when list has many blogs, equals to author and written blogs', () => {
        assert.deepStrictEqual({
            author: 'Robert C. Martin',
            blogs: 3
        }, mostBlogs(testBlogs));
    });

    test('when list doesn\'t have blogs, equals {}', () => {
        assert.deepStrictEqual({}, mostBlogs([]));
    });

});