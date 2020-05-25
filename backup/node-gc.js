/**
 * @fileoverview node内存回收
 * @author liuduan
 * @Date 2020-05-24 20:40:35
 * @LastEditTime 2020-05-24 20:56:42
 * @文件执行命令：node --expose-gc demo01.js
 */
global.gc();
console.log('最初的内存占用---', process.memoryUsage());




// let key = new Array(5 * 1024 * 1024);
// key = null; // 这时会回收，有效
// global.gc(); // 手动gc
// console.log('key手动制成null---', process.memoryUsage());




// let map = new Map();
// let key = new Array(5 * 1024 * 1024);
// map.set(key, 1);
// global.gc(); // 手动gc
// console.log('声明强引用内存占用---', process.memoryUsage());




// let map = new Map();
// let key = new Array(5 * 1024 * 1024);
// map.set(key, 1);
// key = null;  // 这时不会回收，强引用还在，无效
// global.gc(); // 手动gc
// console.log('key手动制成null---', process.memoryUsage());




// let map = new Map();
// let key = new Array(5 * 1024 * 1024);
// map.set(key, 1);
// map.delete(key); // 增加这一行后，有效回收内存
// key = null;  
// global.gc(); // 手动gc
// console.log('map手动deletekey & key手动制成null---', process.memoryUsage());




let map = new WeakMap();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
key = null;  // weekmap, 可有效回收内存
global.gc(); // 手动gc
console.log('使用weekmap---', process.memoryUsage());