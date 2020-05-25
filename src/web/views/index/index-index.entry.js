/**
 * @fileoverview
 * @author liuduan
 * @Date 2020-05-10 17:35:45
 * @LastEditTime 2020-05-25 23:14:06
 */
import modules from '@/components/ioc/module.js';


const banner = modules.use('banner');
console.log('得到的banner', banner);
banner.test();
