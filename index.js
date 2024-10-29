const config = require('./config');
const app = require('./app');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});