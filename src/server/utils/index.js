/**
 * @fileoverview 小工具库
 * @author liuduan
 * @Date 2020-04-27 10:50:45
 * @LastEditTime 2020-05-16 19:04:34
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
    const accept = (ctx && ctx.header) ? ctx.header.accept : false;
    return !accept || accept.indexOf('text/html') > -1;
}



/**
 * @description isApiRequset 判断是否是api请求
 * @param {type} ctx koa执行上下文
 * @return {boolean}
 */
function isApiRequset(ctx) {
    const accept = (ctx && ctx.header) ? ctx.header.accept : false;
    return accept && accept.indexOf('application/json') > -1;
}





export {
    ApiRespnse,
    isHtmlRequset,
    isApiRequset,
}