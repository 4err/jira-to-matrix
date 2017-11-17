const Ramda = require('ramda');
const path = require('path');
const validate = require('./validate-config.js');
const logger = require('debug')('config parse');

const env = process.env.NODE_ENV || 'development';

logger(`process.env.NODE_ENV ${env}`);

const configPath = {
    development: './',
    test: './test/fixtures/',
};

const confgigFilepath = path.resolve(configPath[env], 'config.js');

const configData = require(confgigFilepath);

const composeConfig = config => {
    if (!validate(config)) {
        process.exit(1);
    }
    logger('config.matrix', Object.keys(config.matrix));
    const matrix = {
        ...config.matrix,
        baseUrl: `https://${config.matrix.domain}`,
        userId: `@${config.matrix.user}:${config.matrix.domain}`,
    };

    // const matrix = Object.assign(config.matrix, {
    //     baseUrl: `https://${config.matrix.domain}`,
    //     userId: `@${config.matrix.user}:${config.matrix.domain}`,
    // });
    // logger('')
    const version = '2017-06-27';
    logger('matrix', matrix);
    config.features.epicUpdates.on = () => (
        config.features.epicUpdates.newIssuesInEpic === 'on'
        || config.features.epicUpdates.issuesStatusChanged === 'on'
    );
    const result = Ramda.mergeAll([config, {matrix}, {version}]);

    return result;
};

const config = composeConfig(configData);
config.matrix.postfix = `:${config.matrix.domain}`.length;

module.exports = config;
