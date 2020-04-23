const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');


const routers = require('./routers');
const app = new Koa();





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
app.use(views(__dirname + '/views', {
    map: {
        html: 'swig',
    },
}));




app.use(bodyParser());
routers.forEach(r => app.use(r.routes(), r.allowedMethods()));




app.listen(8001);