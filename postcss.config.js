/**
 * @fileoverview postcss config
 * @author liuduan
 * @Date 2020-05-25 21:28:17
 * @LastEditTime 2020-06-14 14:36:28
 */
/* eslint-disable quote-props */

module.exports = {
    // parser: 'sugarss',
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
            // 支持语法版本
            'stage': 0,
            // 嵌套
            'features': {
                'nesting-rules': true,
            },
        },
        'cssnano': {},
        'autoprefixer': {
            overrideBrowserslist: [
                '>1%',
                'last 0 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
        },
    },
};
