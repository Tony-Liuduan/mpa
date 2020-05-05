const {
    src,
    dest,
    watch,
    lastRun,
    series,
    // parallel,
} = require('gulp');
const del = require('delete');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
// const rollup = require('gulp-rollup');
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
    del(['build'], cb);
}

function isJavaScript(file) {
    // 判断文件的扩展名是否是 '.js'
    return file.extname === '.js';
}

function build() {
    // 在同一个管道（pipeline）上处理 JavaScript 和 CSS 文件
    return src(['server/**/*.js'], { since: lastRun(build) })
        .pipe(gulpif(isJavaScript, babel()))
        // .pipe(rollup({
        //     // any option supported by Rollup can be set here.
        //     input: 'server/app.js',
        //     output: {
        //         format: 'cjs',
        //         treeshake: false,
        //     },
        // }))
        .pipe(dest('build'));
}

// 'add'、'addDir'、'change'、'unlink'、'unlinkDir'、'ready'、'error'。此外，还有一个 'all' 事件，它表示除 'ready' 和 'error' 之外的所有事件。
watch(
    'server/**/*.js',
    {
        events: 'all',
        delay: 500,
    },
    series(clean, build),
);


exports.default = series(clean, build);
