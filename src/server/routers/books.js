/**
 * @fileoverview books routers
 * @author liuduan
 * @Date 2020-04-19 18:23:04
 * @LastEditTime 2020-05-16 17:29:27
 */
import Router from 'koa-router';
import BooksController from '../controllers/BooksController';


export const booksRouter = new Router();
const booksController = new BooksController();


booksRouter
    .prefix('/books')
    .get('/(index)?', booksController.actionIndex)
    .get('/create', booksController.actionCreate)
    .post('/create', booksController.actionCreate)
    .get('/delete/:id', booksController.actionDelete)
    .get('/update/:id', booksController.actionUpdate)
    .post('/update/:id', booksController.actionUpdate)
    .get('/view/:id', booksController.actionView)
