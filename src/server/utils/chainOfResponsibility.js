/**
 * @fileoverview ChainOfResponsibility职责链类
 * @author liuduan
 * @Date 2020-04-27 10:36:48
 * @LastEditTime 2020-05-17 00:49:30
 */


export default class ChainOfResponsibility {
    /**
     * @constructor ChainOfResponsibility
     * @param {function} fn 执行者的执行函数
     */
    constructor(fn) {
        this.fn = fn; // 执行函数
        this.nexter = null; // 下一个执行者
    }

    /**
    * @constructor ChainOfResponsibility
    * @description 设置下一个执行者
    * @param {object} nexter 执行者
    */
    setNexter(nexter) {
        return this.nexter = nexter;
    }

    /**
     * @constructor ChainOfResponsibility
     * @description 调度工作执行
     */
    execute(...args) {
        const result = this.fn.apply(this, args);
        // 同步模式
        if (result === 'next') {
            return this.next(...args);
        }
        return result;
    }

    /**
     * @constructor ChainOfResponsibility
     * @description 调度下一个执行人工作
     */
    next(...args) {
        return this.nexter && this.nexter.execute.apply(this.nexter, args);
    }
}