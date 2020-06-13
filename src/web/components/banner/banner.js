/**
 * @fileoverview
 * @author liuduan
 * @Date 2020-05-10 17:19:29
 * @LastEditTime 2020-06-13 17:02:01
 */
import $ from 'jquery';
import './heart.css';


class Banner {
    constructor() {
        // 测试注释
        // 引入其他service
        // this.service = App.use('service');
    }

    test() {
        console.log('banner 🐻');
        console.log($);
        console.log('banner test');
    }
}


export default {
    init() {
        return new Banner();
    },
}
