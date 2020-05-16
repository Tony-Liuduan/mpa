/**
 * @fileoverview logger base log4js
 * @author liuduan
 * @Date 2020-04-29 09:45:34
 * @LastEditTime 2020-05-16 17:26:03
 * 详见：https://zhuanlan.zhihu.com/p/22110802
 */
import log4js from 'log4js';


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


export {
    log4js,
    logger,
    httpLogger,
    errorLogger,
    debugLogger
};