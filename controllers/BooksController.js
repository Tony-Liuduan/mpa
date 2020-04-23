const superagent = require('superagent');
const { httpGet, httpPost } = require('../utils/request');
const ROOT_ROUTER_PRFIX = 'books';




// page-list
async function proxyQueryIndexData(ctx, next) {
    try {
        const res = await httpGet({
            host: 'localhost',
            port: '8080',
            path: '/index.php?r=books%2Findex'
        });
        ctx.state.booksIndex = JSON.parse(res);
    } catch (err) {
        console.error(err);
    }
    await next();
}
async function actionIndex(ctx, next) {
    const list = ctx.state.booksIndex;
    ctx.state.booksIndex = null;
    await ctx.render(`${ROOT_ROUTER_PRFIX}/index`, { list });
}




// page-create-item
async function proxyCreateItemData(ctx, next) {
    console.log(ctx.state);
    await next();
}
async function actionCreate(ctx, next) {
    await ctx.render(`${ROOT_ROUTER_PRFIX}/create`, {
        title: '新建',
        user: 'John'
    });
}




// page-delete-item
async function proxyDeleteItemData(ctx, next) {
    const { id } = ctx.params;
    try {
        await httpPost({
            host: 'localhost',
            port: '8080',
            path: `/index.php?r=books%2Fdelete&id=${id}`
        }, {
            _csrf: 'X4RCwkCNp7kx5PNvD7rrdWLI7XR8DsHmh2Iw91CLtsI203qjGPvN70XQo1k_390SFpqnRT9Kt7SqAUW1J9T5lg=='
        });
    } catch (err) {
        console.log('+++++++++++==')
        console.error(err);
    }
    await next();
}
async function actionDelete(ctx, next) {
    ctx.redirect('/books');
}




// page-update-item
async function proxyUpdateItemData(ctx, next) {
    console.log(ctx.state);
    await next();
}
async function actionUpdate(ctx, next) {
    await ctx.render(`${ROOT_ROUTER_PRFIX}/update`, {
        title: '修改',
        user: 'John'
    });
}




// page-view-item
async function proxyQueryItemData(ctx, next) {
    const { id } = ctx.params;
    try {
        const res = await httpGet({
            host: 'localhost',
            port: '8080',
            path: `/index.php?r=books%2Fview&id=${id}`
        });
        ctx.state.booksItem = JSON.parse(res);
    } catch (err) {
        console.error(err);
    }
    await next();
}
async function actionView(ctx, next) {
    const data = ctx.state.booksItem;
    ctx.state.booksItem = null;
    await ctx.render(`${ROOT_ROUTER_PRFIX}/view`, data);
}



module.exports = {
    actionIndex,
    actionCreate,
    actionDelete,
    actionUpdate,
    actionView,

    proxyQueryIndexData,
    proxyCreateItemData,
    proxyDeleteItemData,
    proxyUpdateItemData,
    proxyQueryItemData,
}