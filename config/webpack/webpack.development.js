/**
 * @fileoverview webpack development config
 * @author liuduan
 * @Date 2020-05-10 16:56:56
 * @LastEditTime 2020-06-13 15:42:32
 */
/* eslint-disable import/no-extraneous-dependencies */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier'); // 系统通知工具


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

        // 从js中分离css文件，变为link引用
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css',
            ignoreOrder: false,
        }),

        // 构建完成通知
        new WebpackBuildNotifierPlugin({
            title: 'my-mpa-app',
            // logo: path.resolve('./img/favicon.png'),
            suppressSuccess: true,
        }),

        // 错误友好提示
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:3000'],
                notes: [
                    'Some additionnal notes to be displayed unpon successful compilation',
                ],
            },
            onErrors: (severity, errors) => {
                // if (severity !== 'error') {
                //   return;
                // }
                const error = errors[0];
                notifier.notify({
                    title: 'Webpack error',
                    message: `${severity}: ${error.name}`,
                    subtitle: error.file || '',
                    wait: true,
                    // icon: ICON
                });
            },
            clearConsole: true,
            log: false,
        }),
    ],
};


module.exports = webpackConfig;
