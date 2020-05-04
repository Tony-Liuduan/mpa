// 详见：https://zhuanlan.zhihu.com/p/22110802
const log4js = require('log4js');
log4js.configure({
    appenders: {
        info: {
            type: 'file',
            filename: './logs/info',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
        error: {
            type: 'file',
            filename: './logs/error',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
        debug: {
            type: 'file',
            filename: './logs/debug',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
        request: {
            type: 'file',
            filename: './logs/request',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        }
    },
    categories: {
        default: { appenders: ['info'], level: 'info' },
        error: { appenders: ['error'], level: 'error' },
        request: { appenders: ['request'], level: 'mark' },
        debug: { appenders: ['debug'], level: 'debug' },
    }
});


const logger = log4js.getLogger('Cheese');
const httpLogger = log4js.getLogger('request');
const errorLogger = log4js.getLogger('error');
const debugLogger = log4js.getLogger('debug');


logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
httpLogger.mark('Entering cheese testing');
debugLogger.debug('Got cheese.');
errorLogger.error('Cheese is too ripe!');
errorLogger.fatal('Cheese was breeding ground for listeria.');


module.exports = {
    log4js,
    logger,
    httpLogger,
    errorLogger,
    debugLogger
};