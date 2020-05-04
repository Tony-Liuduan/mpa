/**
 * @fileoverview 实现Books数据模型
 * @author liuduan
 */
const config = require('config');
// const superagent = require('superagent');
const { httpGet, httpPost } = require('../utils/request');


const PROXY_SERVER = config.get('proxyServer');




class Books {
    /**
     * @constructor
     * @param {Object} app koa2 执行上下文 ctx
     */
    constructor(app) {
        this.app = app;
    }


    /**
     * @description queryList 获取全部数据列表
     * @param {Object} filters 查询过滤参数
     * @return {Array}
     */
    async queryList(filters) {
        const res = await httpGet({
            ...PROXY_SERVER,
            path: '/index.php?r=books%2Findex',
        });
        return JSON.parse(res);
    }


    /**
     * @description createItem 创建一条数据
     * @param {object} data 查询过滤参数
     * @return {Object}
     */
    async createItem(data) {
        // todos: requset php server
        return Promise.resolve({});
    }


    /**
     * @description deleteItem 删除一条数据
     * @param {String | Number} id 查询id
     * @return {Object}
     */
    async deleteItem(id) {
        return await httpPost({
            ...PROXY_SERVER,
            path: `/index.php?r=books%2Fdelete&id=${id}`,
        });
    }


    /**
     * @description updateItem 更新一条数据
     * @param {String | Number} id 查询id
     * @return {Object}
     */
    async updateItem(id) {
        // todos: requset php server
        return Promise.resolve({});
    }


    /**
     * @description queryItem 查询一条数据
     * @param {String | Number} id 查询id
     * @return {Object}
     */
    async queryItem(id) {
        const res = await httpGet({
            ...PROXY_SERVER,
            path: `/index.php?r=books%2Fview&id=${id}`,
        });
        return JSON.parse(res);
    }
}



module.exports = Books;