/**
 * @fileoverview 实现BooksController
 * @author liuduan
 * @Date 2020-04-19 22:24:47
 * @LastEditTime 2020-05-24 18:58:38
 */
// import cheerio from 'cheerio';
import {
    route,
    GET,
    POST,
    // before,
} from 'awilix-koa';
import bigpipeResponseHtml from '../utils/bigpipe';
import {
    errorLogger,
} from '../utils/logger';


const ROOT_RENDER_PRFIX = 'books/pages';


/**
 * @constructor BooksController
 */
@route('/books')
class BooksController {
    constructor({ booksService }) {
        this.booksService = booksService;
    }


    /**
     * @description actionIndex 渲染books列表页
     */
    @route('/(index)?')
    @GET()
    async actionIndex(ctx) {
        const list = await this.booksService.queryList({});
        const html = await ctx.render(`${ROOT_RENDER_PRFIX}/index`, { list, pagename: '图书列表', title: '图书首页' });
        if (!ctx.header['x-pjax']) {
            try {
                await bigpipeResponseHtml(ctx, html);
            } catch (e) {
                errorLogger.error(e);
                ctx.body = html;
            }
            return;
        }

        // const $ = cheerio.load(html);

        ctx.body = 'cherrio';
    }


    /**
     * @description actionCreate 渲染books新增页
     */
    @route('/create')
    @GET()
    async actionCreate(ctx) {
        ctx.body = await ctx.render(`${ROOT_RENDER_PRFIX}/create`);
    }


    /**
     * @description actionDelete 处理删除操作
     */
    @route('/delete/:id')
    @POST()
    async actionDelete(ctx) {
        ctx.redirect('/books');
    }


    /**
     * @description actionCreate 渲染books修改页
     */
    @route('/update/:id')
    @GET()
    async actionUpdate(ctx) {
        const { id } = ctx.params;
        const item = await this.booksService.queryItem(id);
        ctx.body = await ctx.render(`${ROOT_RENDER_PRFIX}/update`, item);
    }


    /**
     * @description actionCreate 渲染books详情查看页
     */
    @route('/view/:id')
    @GET()
    async actionView(ctx) {
        const { id } = ctx.params;
        const item = await this.booksService.queryItem(id);
        ctx.body = await ctx.render(`${ROOT_RENDER_PRFIX}/view`, item);
    }
}


export default BooksController;
