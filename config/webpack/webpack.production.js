/**
 * @fileoverview webpack production config
 * @author liuduan
 * @Date 2020-05-10 16:57:13
 * @LastEditTime 2020-06-13 17:01:13
 */
/**
 * @description webpack hash
 * @hash
 *      跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
 * @chunkhash
 *      跟chunk整体文件走，css边js就变，js变css也变，有一个变化chunkhash就跟谁变化
 *      采用chunkhash，所以项目主入口文件Index.js及其对应的依赖文件Index.css由于被打包在同一个模块，
 *      所以共用相同的chunkhash，
 *      但是公共库由于是不同的模块，所以有单独的chunkhash。
 *      这样子就保证了在线上构建的时候只要文件内容没有更改就不会重复构建
 *      缺点：我们可以看到由于index.css被index.js引用了，所以共用相同的chunkhash值。
 *           但是这样子有个问题，如果index.js更改了代码，css文件就算内容没有任何改变，
 *           由于是该模块发生了改变，导致css文件会重复构建。
 * @contenthash
 *      webpack4提供了contenthash
 *      webpack3我们可以使用extra-text-webpack-plugin里的contenthash值，
 *      保证即使css文件所处的模块里就算其他文件内容改变，
 *      只要css文件内容不变，那么不会重复构建。
 */
/**
 * @description 压缩
 * @html html-minifier <https://www.npmjs.com/package/html-minifier> in CopyWebpackPlugin
 * @css  optimize-css-assets-webpack-plugin <https://www.npmjs.com/package/optimize-css-assets-webpack-plugin>
 * @js   optimization.minimizer/terser-webpack-plugin <https://www.npmjs.com/package/terser-webpack-plugin>
 */
/**
 * @description 性能-缓存
 * @测速工具 speed-measure-webpack-plugin <https://www.npmjs.com/package/speed-measure-webpack-plugin>
 * @babel缓存 cache-loader <https://www.npmjs.com/package/cache-loader>
 * @babel多线程(适用于dist-js 20+多入口项目，慎用) thread-loader <https://www.npmjs.com/package/thread-loader>
 * @全局编译缓存 hard-source-webpack-plugin <https://www.npmjs.com/package/hard-source-webpack-plugin>
 */
/**
 * @description 开发-体验
 * @打包进度显示 progress-bar-webpack-plugin <https://www.npmjs.com/package/progress-bar-webpack-plugin>
 * @打包输出内容优化(适用于devserver中)
 *  friendly-errors-webpack-plugin <https://www.npmjs.com/package/friendly-errors-webpack-plugin>
 * @构建错误通知 node-notifier，配合friendly-errors-webpack-plugin使用 <https://www.npmjs.com/package/node-notifier>
 * @构建完成通知 webpack-build-notifier <https://www.npmjs.com/package/webpack-build-notifier>
 */
/* eslint-disable import/no-extraneous-dependencies */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { minify } = require('html-minifier'); // html压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css 分离
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩
const cssnano = require('cssnano'); // 删除无用的css
const TerserPlugin = require('terser-webpack-plugin'); // js 压缩
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


const webpackConfig = {
    output: {
        publicPath: '/',
        filename: 'scripts/[name].[contenthash:5].bundle.js',
    },
    optimization: {
        minimize: true, // 是否开启压缩，production环境默认true
        minimizer: [ // 使用压缩用具
            new TerserPlugin({
                test: /\.js(\?.*)?$/i, // 仅仅压缩js文件
                cache: true, // Default: true
                parallel: true, // 默认：os.cpus().length - 1.
                terserOptions: {
                    // 在删除没有用到的代码时不输出警告
                    warnings: false,
                    compress: {
                        // 删除所有的 `console` 语句
                        // 还可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    },
                    output: {
                        // 删除所有的注释 false-删除，true-保留
                        comments: false,
                        // 最紧凑的输出 false-紧凑，true-不紧凑
                        beautify: false,
                    },
                },

            }),
        ],
    },
    plugins: [
        // 把layouts components复制到dist文件，这些是不需要打包的html模板文件
        new CopyWebpackPlugin([
            {
                from: './src/web/views/layouts/layout.html',
                to: '../views/layouts/layout.html',
            },
            {
                from: './src/web/components',
                to: '../components/',
                copyUnmodified: true,
                ignore: ['*.js', '*.css', '.DS_Stroe'],
                transform(content) {
                    // 压缩html
                    const result = minify(content.toString('utf-8'), {
                        collapseWhitespace: true, // 空格换行去掉
                        removeAttributeQuotes: true, // 属性引号去掉
                        removeEmptyAttributes: true, // 空属性去掉
                        removeComments: true, // 注释去掉
                    });
                    return result;
                },
            },
        ]),

        // css 分离
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'styles/[name].[contenthash:5].css',
            chunkFilename: 'styles/[id].[contenthash:5].css',
            ignoreOrder: false,
        }),

        // css 压缩
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorPluginOptions: {
                preset: ['default', {
                    // 去掉注释
                    discardComments: { removeAll: true },
                }],
            },
            canPrint: true,
        }),

        // new BundleAnalyzerPlugin(),

        // 编译出错退出进程
        function webpackBuildEnd() {
            this.hooks.done.tap('done', (stats) => {
                if (
                    stats.compilation.errors
                    && stats.compilation.errors.length
                    && process.argv.indexOf('--watch') === -1
                ) {
                    console.log(' 👻👻👻👻👻 Webpack编译出错', stats.compilation.errors);
                    process.exit(1); // 错误退出，0是正常退出，jenkins看到1就会邮件通知你了
                }
            });
        },
    ],
};


module.exports = webpackConfig;
