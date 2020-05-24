/**
 * @fileoverview app server entry
 * @author liuduan
 * @Date 2020-05-07 16:11:38
 * @LastEditTime 2020-05-24 15:11:04
 */
import path from 'path';
import config from 'config';
import Koa from 'koa';
import favicon from 'koa-favicon';
import serve from 'koa-static';
import render from 'koa-swig';
import co from 'co';
import bodyParser from 'koa-bodyparser';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';

import {
    responseIndex,
    response5xx,
    response404,
} from './middlewares/page';
import * as routers from './routers';
import {
    errorLogger,
} from './utils/logger';


const app = new Koa();


const PORT = config.get('port');


// 当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会触发 'uncaughtException' 事件
process.on('uncaughtException', (err) => {
    errorLogger.error(err);
});

process.on('unhandledRejection', (reason, promise) => {
    errorLogger.error('promise 未处理的拒绝：', promise, '原因：', reason);
});

// 每当 Promise 被拒绝并且错误处理函数附加到它（例如，使用 promise.catch()）晚于一个 Node.js 事件循环时，就会触发 'rejectionHandled' 事件。
process.on('rejectionHandled', (promise) => {
    errorLogger.error(promise);
});

// http.on error:
// only triggered when err handler middleware not triggered
app.on('error', (err) => {
    errorLogger.error(err);
});

// err-5xx handler middleware
app.use(response5xx);

// err-404 handler middleware
app.use(response404);


app.use(favicon(path.join(process.cwd(), 'favicon.ico')));
app.use(historyApiFallback({ whiteList: ['/', '/books', '/api'] }));
app.use(serve(path.join(__dirname, '../web/assets')));
app.context.render = co.wrap(render({
    root: path.join(__dirname, '../web/views'),
    autoescape: true,
    cache: process.env.NODE_ENV === 'development' ? false : 'memory',
    ext: 'html',
    writeBody: false,
    // varControls: ['[[', ']]'], // 如需修改模板标识符时使用
}));


app.use(responseIndex);
app.use(bodyParser());
// eslint-disable-next-line no-restricted-syntax
for (const route of Object.values(routers)) {
    app.use(route.routes(), route.allowedMethods());
}


app.listen(PORT, () => {
    console.log('🍺服务启动成功', PORT);
});
