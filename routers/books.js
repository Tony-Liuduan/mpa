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
    .post('/create', proxyCreateItemData, actionCreate)
    .post('/delete/:id', proxyDeleteItemData, actionDelete)
    .post('/update/:id', proxyUpdateItemData, actionUpdate)
    .get('/view/:id', proxyQueryItemData, actionView)



module.exports = router;