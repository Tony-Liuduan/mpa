/**
 * @fileoverview 实现BooksController
 * @author liuduan
 * @Date 2020-04-19 22:24:47
 * @LastEditTime 2020-05-22 20:55:29
 */
import cheerio from 'cheerio';
import Books from '../models/Books';
import { bigpipeResponseHtml } from '../utils/bigpipe';
import {
    errorLogger,
} from '../utils/logger';




const ROOT_ROUTER_PRFIX = 'books/pages';




/** 
 * @constructor BooksController
 */
export default class BooksController {
    /**
     * @description actionIndex 渲染books列表页
     */
    async actionIndex(ctx, next) {
        const books = new Books(ctx);
        const list = await books.queryList({});
        const html = await ctx.render(`${ROOT_ROUTER_PRFIX}/index`, { list, pagename: '图书列表', title: '图书首页' });
        if (!ctx.header['x-pjax']) {
            try {
                await bigpipeResponseHtml(ctx, html);
            } catch (e) {
                errorLogger.error(e);
                ctx.body = html;
            }
            return;
        } 

        const $ = cheerio.load(html);

        ctx.body = 'cherrio';

        

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
