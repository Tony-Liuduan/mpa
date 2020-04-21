const superagent = require('superagent');
const { httpGet } = require('../utils/request');
const ROOT_ROUTER_PRFIX = 'books';




// page-list
async function proxyQueryIndexData(ctx, next) {
    try {
        const res = await httpGet({
            hostname: '127.0.0.1',
            port: '8888',
            path: '/books'
        });
        console.log(res);
    } catch (err) {
        console.error(err);
    }
    await next();
}
async function actionIndex(ctx, next) {
    const data = ctx.state.booksIndex;
    ctx.state.booksIndex = null;
    // todo: get list data from php server
    await ctx.render(`${ROOT_ROUTER_PRFIX}/index`, data);
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
    console.log(ctx.state);
    await next();
}
async function actionDelete(ctx, next) {
    ctx.redirect('/');
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
    console.log(ctx.state);
    await next();
}
async function actionView(ctx, next) {
    const { id } = ctx.params;
    await ctx.render(`${ROOT_ROUTER_PRFIX}/view`, {
        title: '查看',
        user: 'John ' + id,
    });
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