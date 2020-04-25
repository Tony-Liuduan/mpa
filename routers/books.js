const Router = require('koa-router');
const BooksController = require('../controllers/BooksController');


const router = new Router();
const booksController = new BooksController();


router
    .prefix('/books')
    .get('/(index)?',       booksController.actionIndex)
    .get('/create',         booksController.actionCreate)
    .post('/create',        booksController.actionCreate)
    .get('/delete/:id',     booksController.actionDelete)
    .get('/update/:id',     booksController.actionUpdate)
    .post('/update/:id',    booksController.actionUpdate)
    .get('/view/:id',       booksController.actionView)



module.exports = router;