/**
 * @fileoverview IOC 实现
 * @author liuduan
 * @Date 2020-05-24 20:59:42
 * @LastEditTime 2020-05-24 21:40:50
 * @使用：App.use('banner');
 */
import banner from '../banner/banner.js';


class App {
    static modules = new Map(); // WeakMap是不能被迭代map的

    static use(moduleId) {
        return App.modules.get(moduleId) || {};
    }

    static delete(moduleId) {
        App.modules.delete(moduleId);
        // moduleId = null;
    }


    constructor(opts) {
        this.options = opts;
        this.init();
    }

    init() {
        this.initModules();
    }

    initModules() {
        for (const [key, value] of Object.entries(this.options)) {
            App.modules.set(key, value.init());
        }
    }
}


new App({
    banner,
});


export default App;


