/**
 * @fileoverview webpack config core
 * @author liuduan
 * @Date 2020-05-10 15:56:51
 * @LastEditTime 2020-06-13 17:35:38
 */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const glob = require('glob');

const argv = require('yargs-parser')(process.argv.slice(2));

const mode = argv.mode || 'development';
const merge = require('webpack-merge');

const webpackConfig = require(`./config/webpack/webpack.${mode}.js`);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const setTitle = require('node-bash-title');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 开启全局缓存
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 显示打包进度
const HtmlInjectAssetsPlugin = require('./config/webpack/plugins/HtmlInjectAssetsPlugin.js');


setTitle(`client-${mode}🦏🦏`);


const entry = {};
const plugins = [];
const entryFiles = glob.sync('./src/web/views/**/*.entry.js');
for (const filepath of entryFiles) {
    if (/.+\/([a-zA-Z]+)-([a-zA-Z]+)\.entry\.js$/.test(filepath)) {
        // console.log(RegExp.$_, RegExp.$1, RegExp.$2)
        const { $1, $2 } = RegExp;
        const entryKey = `${$1}-${$2}`;
        entry[entryKey] = filepath;
        plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${$1}/pages/${$2}.html`,
            template: `./src/web/views/${$1}/pages/${$2}.html`,
            chunks: [entryKey],
            inject: false,
            // inlineSource: '.css$',
            // minify: {
            //     html5: true,
            //     collapseWhitespace: true,
            //     preserveLineBreaks: false,
            //     minifyCSS: true,
            //     minifyJS: true,
            //     removeComments: false,
            // },
        }));
    } else {
        console.log('❎项目配置失败，未找到对应entry文件');
        // 非正常退出
        process.exit(-1);
    }
}


const baseConfig = {
    entry,
    output: {
        path: path.join(__dirname, './dist/web/assets'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                enforce: 'pre',
                include: path.resolve('src/web'),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                        cache: mode === 'development',
                        failOnError: mode !== 'development',
                    },
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve('src/web'),
                use: [
                    {
                        loader: 'thread-loader', // 开启多线程，适用于dist-js 20+多入口项目, 慎用，小项目反而会慢
                    },
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    // {
                    //     loader: 'style-loader',
                    // },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     esModule: true,
                        // },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve('src/web'),
        },
    },
    externals: {
        jquery: 'jQuery',
    },
    watch: false, // mode === 'development',
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/, // 匹配node_modules中的模块
                    chunks: 'initial',
                    name: 'vendor',
                    priority: -10, // 优先级，当模块同时命中多个缓存组的规则时，分配到优先级高的缓存组
                    enforce: true,
                },
                commons: {
                    chunks: 'all', // 加入按需加载后，设为all将所有模块包括在优化范围
                    name: 'commons',
                    minChunks: 2,
                    minSize: 0,
                    priority: -20,
                    maxInitialRequests: 5, // 默认为3，无法满足我们的分包数量，注意这里数量是指除page.js外的chunk包数量，包括vender，runtime
                    reuseExistingChunk: true, // 是否复用已经从原代码块中分割出来的模块
                },
            },
        },
    },
    plugins: [
        // webpack4不需要配置清除路径，默认就是output中配置的path
        new CleanWebpackPlugin(),

        // 开启全局缓存
        new HardSourceWebpackPlugin(),

        new HtmlInjectAssetsPlugin(),

        ...plugins,

        // 显示打包进度
        new ProgressBarPlugin(),
    ],
};


const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap(merge(baseConfig, webpackConfig));
// module.exports = merge(baseConfig, webpackConfig);
