const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const cors = require('cors');
const blogRoute = require('./controllers/blogs')
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);

mongoose.connect(config.DB_CONN_URL)
    .then(_ => {
        logger.info("Connected to MongoDb");
    })
    .catch(e => {
        logger.error('error connecting to MongoDB:', error.message);
    });

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use('/api/blogs', blogRoute);

app.use(middleware.errorHandler);

module.exports = app;