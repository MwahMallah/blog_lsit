const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {type: String},
    author: {type: String},
    url: {type: String},
    likes: {type: Number}
});

blogSchema.set('toJSON', {
    transform: (document, returnValue) => {
        returnValue.id = document._id;
        delete returnValue._id;
        delete returnValue.__v;
    }
});

module.exports = mongoose.model('Blogs', blogSchema);