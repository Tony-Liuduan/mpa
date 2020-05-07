const path = require('path');
const config = require('config');

const Koa = require('koa');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const render = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');

const {
    responseIndex,
    response5xx,
    response404,
} = require('./middlewares/page');
const routers = require('./routers');
const {
    errorLogger,
} = require('./utils/logger');


const app = new Koa();


const PORT = config.get('port');




// 当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会触发 'uncaughtException' 事件
process.on('uncaughtException', (err, origin) => {
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
app.on('error', (err, ctx) => {
    errorLogger.error(err);
});

// err-5xx handler middleware
app.use(response5xx);

// err-404 handler middleware
app.use(response404);


app.use(favicon(__dirname + '../views/favicon.ico'));
app.use(historyApiFallback({ whiteList: ['/', '/books', '/api'] }));
app.use(serve(__dirname + '../assets'));
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
routers.forEach(r => app.use(r.routes(), r.allowedMethods()));




app.listen(PORT);