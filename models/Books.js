const config = require('config');
// const superagent = require('superagent');
const { httpGet, httpPost } = require('../utils/request');


const PROXY_SERVER = config.get('proxyServer');




class Books {
    // page-list
    async proxyQueryIndexData(ctx, next) {
        try {
            const res = await httpGet({
                ...PROXY_SERVER,
                path: '/index.php?r=books%2Findex'
            });
            ctx.state.booksIndex = JSON.parse(res);
        } catch (err) {
            console.error(err);
        }
        await next();
    }


    // page-create-item
    async  proxyCreateItemData(ctx, next) {
        console.log(ctx.state);
        await next();
    }


    // page-delete-item
    async  proxyDeleteItemData(ctx, next) {
        const { id } = ctx.params;
        try {
            await httpPost({
                ...PROXY_SERVER,
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


    // page-update-item
    async proxyUpdateItemData(ctx, next) {
        console.log(ctx.state);
        await next();
    }


    // page-view-item
    async  proxyQueryItemData(ctx, next) {
        const { id } = ctx.params;
        try {
            const res = await httpGet({
                ...PROXY_SERVER,
                path: `/index.php?r=books%2Fview&id=${id}`
            });
            ctx.state.booksItem = JSON.parse(res);
        } catch (err) {
            console.error(err);
        }
        await next();
    }
}



module.exports = Books;