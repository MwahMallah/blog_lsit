const logger = require('./logger');


function errorHandler(err, req, res, next) {
    logger.error(err);

    if (err.name === 'ValidationError') {
        res.status(400).send({error: err.message});
    } if (err.name === 'CastError') {
        res.status(400).send({error: 'ObjectId must be 24 char length hex value'})
    }
}


module.exports = {errorHandler};