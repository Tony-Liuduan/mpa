/**
 * @fileoverview webpack config core
 * @author liuduan
 * @Date 2020-05-10 15:56:51
 * @LastEditTime 2020-05-17 00:30:03
 */
const path = require('path');
const glob = require('glob');

const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const merge = require('webpack-merge');
const webpackConfig = require(`./config/webpack/webpack.${_mode}.js`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInjectAssetsPlugin = require('./config/webpack/plugins/HtmlInjectAssetsPlugin.js');

const setTitle = require('node-bash-title');
setTitle(`client-${_mode}🦏🦏`);



const _entry = {};
const _plugins = [];
const entryFiles = glob.sync('./src/web/views/**/*.entry.js');
for (const filepath of entryFiles) {
    if (/.+\/([a-zA-Z]+)-([a-zA-Z]+)\.entry\.js$/.test(filepath)) {
        // console.log(RegExp.$_, RegExp.$1, RegExp.$2)
        const { $1, $2 } = RegExp;
        const entryKey = `${$1}-${$2}`;
        _entry[entryKey] = filepath;
        _plugins.push(new HtmlWebpackPlugin({
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
    entry: _entry,
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
        ]
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
    watch: _mode === 'development' ? true : false,
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
    },
    plugins: [
        ..._plugins,
        new HtmlInjectAssetsPlugin(),
    ],
};


module.exports = merge(baseConfig, webpackConfig);