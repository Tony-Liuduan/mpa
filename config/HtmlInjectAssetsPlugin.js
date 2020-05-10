/**
 * @fileoverview html注入静态资源插件，通过html-webpack-plugin插件将access资源inject到html指定位置
 * @author liuduan
 * @Date 2020-05-10 18:17:51
 * @LastEditTime 2020-05-10 19:03:22
 * @source https://www.npmjs.com/package/html-webpack-plugin
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');


const pluginName = 'HtmlInjectAssetsPlugin';


class HtmlInjectAssetsPlugin {
    constructor() {
        this.assets = {};
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
                pluginName,
                (data, cb) => {
                    this.assets = data.assets;
                    cb(null, data);
                }
            );
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                pluginName,
                (data, cb) => {
                    const {
                        js,
                        css,
                    } = this.assets;
                    data.html = data.html
                        .replace('<!--injectjs-->', () => {
                            let jsString = '';
                            for (const path of js) {
                                jsString += `<script src="${path}"></script>`;
                            }
                            return jsString;
                        })
                        .replace('<!--injectcss-->', () => {
                            let cssString = '';
                            for (const path of css) {
                                cssString += `<link rel="stylesheet" href="${path}">`;
                            }
                            return cssString;
                        })
                        .replace(/@components/g, '../../../components')
                        .replace(/@layouts/g, '../../layouts');
                    cb(null, data);
                }
            );
        });
    }
}


module.exports = HtmlInjectAssetsPlugin;