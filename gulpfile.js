/**
 * @fileoverview gulp config for nodejs
 * @author liuduan
 * @Date 2020-05-07 16:11:38
 * @LastEditTime 2020-05-24 16:10:04
 * gulp缺点：不能解决文件依赖
 */
const {
    src,
    dest,
    series,
    parallel,
} = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const plumber = require('gulp-plumber'); // dev环境错误自动重启
const del = require('delete');
const replace = require('@rollup/plugin-replace');


const input = './src/server/**/*.js';
const output = './dist/server/';
const treeshakeEntry = './src/server/treeshake.js';
const babelrc = {
    babelrc: false,
    plugins: ['@babel/plugin-transform-modules-commonjs'],
};


function clean(cb) {
    // 直接使用 `delete` 模块，避免使用 gulp-rimraf 插件
    return del([output], cb);
}


function dev() {
    return watch(input, { ignoreInitial: false })
        .pipe(plumber())
        .pipe(babel(babelrc))
        .pipe(dest(output));
}


function prod() {
    return src(input, { ignore: [treeshakeEntry] })
        .pipe(babel(babelrc))
        .pipe(dest(output));
}


/**
 * @description 线上环境文件清洗
 */
function treeshake() {
    return src(treeshakeEntry)
        .pipe(rollup({
            input: treeshakeEntry,
            output: {
                format: 'cjs',
                treeshake: true,
            },
            plugins: [
                // 替换if判断文件
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production'),
                }),
            ],
        }))
        .pipe(dest(output));
}


exports.default = series(clean, dev);
exports.prod = series(clean, parallel(prod, treeshake));
