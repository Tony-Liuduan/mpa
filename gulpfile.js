/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-05-07 16:11:38
 * @LastEditTime 2020-05-10 21:40:36
 * gulp缺点：不能解决文件依赖
 */
const {
    src,
    dest,
    // watch,
    lastRun,
    series,
    // parallel,
} = require('gulp');
const watch = require('gulp-watch');
const del = require('delete');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');
const replace = require('@rollup/plugin-replace');

const cleanEntry = './src/server/config/index.js';

// const through2 = require('through2');
// const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
// const rename = require('gulp-rename');
// const concat = require('gulp-concat');


// function images() {
//     // 检索在当前运行进程中成功完成任务的最后一次时间。最有用的后续任务运行时，监视程序正在运行。当监视程序正在运行时，对于后续的任务运行最有用。
//     // 当与 src() 组合时，通过跳过自上次成功完成任务以来没有更 改的文件，使增量构建能够加快执行时间。
//     return src('*.png', { since: lastRun(images) })
//         .pipe(imagemin())
//         .pipe(dest('build/img/'));
// }


function clean(cb) {
    // 直接使用 `delete` 模块，避免使用 gulp-rimraf 插件
    del(['dist'], cb);
}

function isJavaScript(file) {
    // 判断文件的扩展名是否是 '.js'
    return file.extname === '.js';
}

function build() {
    // watch('css/**/*.css', { ignoreInitial: false })
    return src(['src/server/**/*.js'], { since: lastRun(build) })
        .pipe(gulpif(isJavaScript, babel({
            babelrc: false,
            ignore: [cleanEntry],
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        })))
        // todos：线上清洗 分开写 parallel
        // .pipe(rollup({
        //     input: cleanEntry,
        //     output: {
        //         format: 'cjs',
        //     },
        //     plugins: [
        //         // 替换if判断文件
        //         replace({
        //             'process.env.NODE_ENV': JSON.stringify('production'),
        //         }),
        //     ],
        // }))
        // .pipe(rollup({
        //     // any option supported by Rollup can be set here.
        //     input: 'server/app.js',
        //     output: {
        //         format: 'cjs',
        //         treeshake: false,
        //     },
        // }))
        .pipe(dest('dist'));
}

// 'add'、'addDir'、'change'、'unlink'、'unlinkDir'、'ready'、'error'。此外，还有一个 'all' 事件，它表示除 'ready' 和 'error' 之外的所有事件。
// todo: use gulp-watch
// watch(
//     'server/**/*.js',
//     {
//         events: 'all',
//         delay: 500,
//     },
//     series(clean, build),
// );


exports.default = series(clean, build);
