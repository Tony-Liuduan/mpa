/**
 * @fileoverview postcss config
 * @author liuduan
 * @Date 2020-05-25 21:28:17
 * @LastEditTime 2020-05-30 12:47:12
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
        // 'cssnano': {},
        // 'autoprefixer': {},
    },
};
