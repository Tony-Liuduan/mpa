const fs = require('fs');
const path = require('path');
const config = require('config');

const Koa = require('koa');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const render = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');
// const { historyApiFallback } = require('koa2-connect-history-api-fallback');

const routers = require('./routers');


const app = new Koa();


const PORT = config.get('port');




// 当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会触发 'uncaughtException' 事件
process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
        process.stderr.fd,
        `捕获的异常: ${err}\n` +
        `异常的来源: ${origin}\n`
    );
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('promise 未处理的拒绝：', promise, '原因：', reason);
    // 记录日志、抛出错误、或其他逻辑。
});

// 每当 Promise 被拒绝并且错误处理函数附加到它（例如，使用 promise.catch()）晚于一个 Node.js 事件循环时，就会触发 'rejectionHandled' 事件。
process.on('rejectionHandled', (promise) => {
    console.log('______________rejectionHandled', promise);
});

// http.on error:
// only triggered when err handler middleware not triggered
app.on('error', (err, ctx) => {
    console.log(err.message);
});

// err handler middleware
app.use(async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        console.log('errHandlerMiddleware', err);
        ctx.body = {
            code: -1000,
            msg: err.message,
            data: null,
        };
    }
});




app.use(favicon(__dirname + '/views/favicon.ico'));
app.use(serve(__dirname + '/assets'));
app.context.render = co.wrap(render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: false
}));



// handle fallback for HTML5 history API
// app.use(historyApiFallback({ whiteList: ['/api'] }));



app.use(bodyParser());
routers.forEach(r => app.use(r.routes(), r.allowedMethods()));




app.listen(PORT);