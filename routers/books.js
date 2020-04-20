const Router = require('koa-router');
const {
    actionIndex,
    actionView,
    actionCreate,
    actionUpdate,
    actionDelete,
} = require('../controllers/BooksController');



const router = new Router();



// page-list
router.get('/(index|index.html)?', async (ctx, next) => {
    // todo: get list data from php server
    await ctx.render('books/index', {
        title: '首页',
        user: 'John'
    });
});



// page-create-item
router.get('/create(.html)?', async (ctx, next) => {
    await ctx.render('books/create', {
        title: '新建',
        user: 'John'
    });
});



// page-view-item
router.get('/view(.html)?', async (ctx, next) => {
    await ctx.render('books/view', {
        title: '查看',
        user: 'John'
    });
});



// page-update-item
router.get('/update(.html)?', async (ctx, next) => {
    await ctx.render('books/update', {
        title: '修改',
        user: 'John'
    });
});



module.exports = router;