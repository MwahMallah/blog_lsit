const logger = require('./logger');


function errorHandler(err, req, res, next) {
    logger.error(err);

    if (err.name === 'ValidationError') {
        res.status(400).send({error: err.message});
    }
}


module.exports = {errorHandler};