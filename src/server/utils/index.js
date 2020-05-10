/**
 * @fileoverview 小工具库
 * @author liuduan
 */




/**
* @class ApiRespnse api接口响应体类
* @author
*/
class ApiRespnse {
    /**
     * @constructor 
     * @param {number} code 0-成功
     * @param {string} msg
     * @param {object|array|null|undefined} data
     */
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg || '';
        this.data = data || null;
    }
}




/**
 * @description isHtmlRequset 判断是否是页面html请求
 * @param {type} ctx koa执行上下文
 * @return {boolean}
 */
function isHtmlRequset(ctx) {
    const accept = ctx.header.accept;
    return !accept || accept.indexOf('text/html') > -1;
}



/**
 * @description isApiRequset 判断是否是api请求
 * @param {type} ctx koa执行上下文
 * @return {boolean}
 */
function isApiRequset(ctx) {
    const accept = ctx.header.accept;
    return accept && accept.indexOf('application/json') > -1;
}





module.exports = {
    ApiRespnse,
    isHtmlRequset,
    isApiRequset,
}