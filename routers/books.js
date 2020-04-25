const Router = require('koa-router');
const BooksController = require('../controllers/BooksController');
const Books = require('../models/books');


const booksModel = new Books();
const booksController = new BooksController();


const router = new Router();


router.prefix('/books')
    .get('/(index)?', booksModel.proxyQueryIndexData, booksController.actionIndex)
    .get('/create', booksModel.proxyCreateItemData, booksController.actionCreate)
    .post('/create', booksModel.proxyCreateItemData, booksController.actionCreate)
    .get('/delete/:id', booksModel.proxyDeleteItemData, booksController.actionDelete)
    .get('/update/:id', booksModel.proxyUpdateItemData, booksController.actionUpdate)
    .post('/update/:id', booksModel.proxyUpdateItemData, booksController.actionUpdate)
    .get('/view/:id', booksModel.proxyQueryItemData, booksController.actionView)



module.exports = router;