/**
 * @fileoverview ChainOfResponsibility职责链类
 * @author liuduan
 */

module.exports = class ChainOfResponsibility {
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