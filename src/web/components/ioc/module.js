/**
 * @fileoverview IOC 实现 组件包加载
 * @author liuduan
 * @Date 2020-05-24 20:59:42
 * @LastEditTime 2020-05-25 23:06:59
 * @使用：App.use('banner');
 */
import banner from '../banner/banner.js';


class IOCModule {
    static modules = new WeakMap(); // WeakMap是不能被迭代map的

    constructor(opts) {
        this.options = opts;
        this.init();
    }

    init() {
        this.initModules();
    }

    initModules() {
        IOCModule.modules.set(this, this.options);
    }

    use(moduleId) {
        return IOCModule.modules.has(this) ? IOCModule.modules.get(this)[moduleId] : {};
    }

    delete(moduleId) {
        IOCModule.modules.has(this) && IOCModule.modules.delete(this)[moduleId];
    }
}


export default new IOCModule({
    banner: banner.init(),
});


