/**
 * @fileoverview 实现BooksController
 * @author liuduan
 */
const Books = require('../models/Books');




ROOT_ROUTER_PRFIX = 'books';




/** 
 * @constructor 
 */
class BooksController {
    /**
     * @description actionIndex 渲染books列表页
     */
    async actionIndex(ctx, next) {
        const books = new Books(ctx);
        const list = await books.queryList({});
        ctx.body = await ctx.render(`${ROOT_ROUTER_PRFIX}/index`, { list });
    }


    /**
     * @description actionCreate 渲染books新增页
     */
    async actionCreate(ctx, next) {
        ctx.body = await ctx.render(`${ROOT_ROUTER_PRFIX}/create`);
    }


    async actionDelete(ctx, next) {
        ctx.redirect('/books');
    }


    /**
     * @description actionCreate 渲染books修改页
     */
    async actionUpdate(ctx, next) {
        const { id } = ctx.params;
        const books = new Books(ctx);
        const item = await books.queryItem(id);
        ctx.body = await ctx.render(`${ROOT_ROUTER_PRFIX}/update`, item);
    }


    /**
     * @description actionCreate 渲染books详情查看页
     */
    async actionView(ctx, next) {
        const { id } = ctx.params;
        const books = new Books(ctx);
        const item = await books.queryItem(id);
        ctx.body = await ctx.render(`${ROOT_ROUTER_PRFIX}/view`, item);
    }
}




module.exports = BooksController;