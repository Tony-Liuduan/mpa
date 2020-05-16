/**
 * @fileoverview ChainOfResponsibility职责链类
 * @author liuduan
 * @Date 2020-04-27 10:36:48
 * @LastEditTime 2020-05-16 17:26:58
 */


export default class ChainOfResponsibility {
    /**
     * @constructor
     * @param {function} fn 执行者的执行函数
     */
    constructor(fn) {
        this.fn = fn; // 执行函数
        this.nexter = null; // 下一个执行者
    }

    /**
    * @description 设置下一个执行者
    * @param {object} nexter 执行者
    */
    setNexter(nexter) {
        return this.nexter = nexter;
    }

    /**
     * @description 调度工作执行
     */
    execute(...args) {
        const result = this.fn.apply(this, args);
        // 同步模式
        if (result === 'next') {
            return this.next();
        }
        return result;
    }

    /**
     * @description 调度下一个执行人工作
     */
    next(...args) {
        return this.nexter && this.nexter.execute.apply(this.nexter, ...args);
    }
}