function dummy(blogs) {
    return 1;
}

function totalLikes(blogs) {
    return blogs.reduce((sum, {likes}) => sum + likes, 0);
}
  
function favoriteBlog(blogs) {
    if (blogs.length === 0) {
        return {};
    }

    let favoriteBlog = blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr, {})
    return {
        author: favoriteBlog.author,
        title: favoriteBlog.title,
        likes: favoriteBlog.likes
    }
}

function mostBlogs(blogs) {
    if (blogs.length === 0) {
        return {};
    }

    let authorWithMostBlogs = "";
    let mostBlogsAmount = 0;
    let authorBlogAmountMap = new Map();

    for (let blog of blogs) {
        let authorBlogsAmount = authorBlogAmountMap.get(blog.author) + 1;
        if (isNaN(authorBlogsAmount))
            authorBlogsAmount = 1;

        authorBlogAmountMap.set(blog.author, authorBlogsAmount);
        if (authorBlogsAmount > mostBlogsAmount) {
            mostBlogsAmount = authorBlogsAmount;
            authorWithMostBlogs = blog.author;
        }
    }

    return {
        author: authorWithMostBlogs,
        blogs: authorBlogAmountMap.get(authorWithMostBlogs)
    }
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs}