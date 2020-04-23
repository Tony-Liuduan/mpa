const Router = require('koa-router');
const {
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
} = require('../controllers/BooksController');



const router = new Router();



router.prefix('/books')
    .get('/(index)?', proxyQueryIndexData, actionIndex)
    .get('/create', proxyCreateItemData, actionCreate)
    .post('/create', proxyCreateItemData, actionCreate)
    .get('/delete/:id', proxyDeleteItemData, actionDelete)
    .get('/update/:id', proxyUpdateItemData, actionUpdate)
    .post('/update/:id', proxyUpdateItemData, actionUpdate)
    .get('/view/:id', proxyQueryItemData, actionView)



module.exports = router;