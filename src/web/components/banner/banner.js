/**
 * @fileoverview
 * @author liuduan
 * @Date 2020-05-10 17:19:29
 * @LastEditTime 2020-05-25 23:27:44
 */
import $ from 'jquery';
import './banner.css';


class Banner {
    constructor() {
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
