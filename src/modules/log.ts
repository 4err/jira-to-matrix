import * as path from 'path';
import * as winston from 'winston';
import { config } from '../config';

/**
 * Customize logger timestamp format to locale datetime with milliseconds
 *
 * @returns {string} Formatted datetime string
 */
const timestamp = () => {
    const datetime = new Date();
    const ms = String(datetime.getMilliseconds() % 1000);
    return `${datetime.toLocaleString()},${ms.padEnd(3)}`;
};

const getLabel = mod => {
    if (typeof mod === 'string') {
        return mod;
    }
    const label = mod.filename
        .replace(process.cwd(), '')
        .split(path.sep)
        .slice(-2)
        .join(path.sep);

    return label[0] === path.sep ? label : path.sep + label;
};

const getTransports = data => {
    const baseTransport = { label: getLabel(data), timestamp };

    const fileTransport = new winston.transports.File({
        ...baseTransport,
        filename: config.log.filePath,
        level: config.log.fileLevel,
        format: winston.format.json(),
    });

    const consoleTransport = new winston.transports.Console({
        ...baseTransport,
        level: config.log.consoleLevel,
        silent: Boolean(process.env.TEST_WATCH),
        format: winston.format.combine(
            winston.format.colorize({
                level: true
            }),
            winston.format.prettyPrint(),
        )
    });

    const levels = {
        file: [fileTransport],
        console: [consoleTransport],
        both: [fileTransport, consoleTransport],
    };

    return levels[config.log.type];
};

/**
 * Customized settings for logger module "winston".
 *
 * @module log
 * @param {object} data Current application module.
 * @returns {{error: Function, warn: Function, info: Function, verbose: Function, debug: Function, silly: Function}}
 *     Configured logger object.
 */
export const getLogger = data => {
    const transports = getTransports(data);

    return winston.createLogger({
        exitOnError: false,
        transports,
    });
};
