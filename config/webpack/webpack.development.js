/**
 * @fileoverview webpack development config
 * @author liuduan
 * @Date 2020-05-10 16:56:56
 * @LastEditTime 2020-05-24 16:06:33
 */
/* eslint-disable import/no-extraneous-dependencies */
const CopyWebpackPlugin = require('copy-webpack-plugin');


const webpackConfig = {
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
            },
        ]),
    ],
};


module.exports = webpackConfig;
