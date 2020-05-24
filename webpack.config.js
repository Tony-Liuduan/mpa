/* eslint-disable import/no-dynamic-require */
/**
 * @fileoverview webpack config core
 * @author liuduan
 * @Date 2020-05-10 15:56:51
 * @LastEditTime 2020-05-24 15:25:34
 */
const path = require('path');
const glob = require('glob');

const argv = require('yargs-parser')(process.argv.slice(2));

const mode = argv.mode || 'development';
const merge = require('webpack-merge');

const webpackConfig = require(`./config/webpack/webpack.${mode}.js`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const setTitle = require('node-bash-title');
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
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
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
    // todos : babel config
    watch: mode === 'development',
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
    },
    plugins: [
        ...plugins,
        new HtmlInjectAssetsPlugin(),
    ],
};


module.exports = merge(baseConfig, webpackConfig);
