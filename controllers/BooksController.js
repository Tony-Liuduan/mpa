ROOT_ROUTER_PRFIX = 'books';




class BooksController {
    async actionIndex(ctx, next) {
        const list = ctx.state.booksIndex;
        ctx.state.booksIndex = null;
        ctx.body = await ctx.render(`${ROOT_ROUTER_PRFIX}/index`, { list });
    }




    async actionCreate(ctx, next) {
        ctx.body = await ctx.render(`${ROOT_ROUTER_PRFIX}/create`, {
            title: '新建',
            user: 'John'
        });
    }




    async actionDelete(ctx, next) {
        ctx.redirect('/books');
    }




    async actionUpdate(ctx, next) {
        ctx.body = await ctx.render(`${ROOT_ROUTER_PRFIX}/update`, {
            title: '修改',
            user: 'John'
        });
    }




    async actionView(ctx, next) {
        const data = ctx.state.booksItem;
        ctx.state.booksItem = null;
        ctx.body = await ctx.render(`${ROOT_ROUTER_PRFIX}/view`, data);
    }
}




module.exports = BooksController;